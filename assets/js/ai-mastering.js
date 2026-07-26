/* ============================================================
   DJBILBOX BEATS — AI MASTERING ENGINE
   ------------------------------------------------------------
   Runs 100% in the visitor's browser (Web Audio API). No upload,
   no server, nothing leaves the machine — which is also why it
   works on GitHub Pages.

   Pipeline
     1. decode the dropped file to an AudioBuffer
     2. measure loudness the ITU-R BS.1770-4 way (K-weighting,
        400 ms blocks @ 75% overlap, -70 LUFS absolute gate,
        -10 LU relative gate) + true peak via 4x oversampling
     3. derive the settings from what was measured (that is the
        "auto" part: threshold follows the crest factor, make-up
        gain follows the loudness delta to the chosen target)
     4. render offline: HPF -> glue compressor -> saturation ->
        make-up -> limiter -> ceiling clip
     5. re-measure, correct the make-up once, re-render
     6. hand back an AudioBuffer + a WAV blob
   ============================================================ */

(function (global) {
  'use strict';

  /* ---------- small helpers ---------- */
  const dB   = v => 20 * Math.log10(Math.max(v, 1e-12));
  const lin  = d => Math.pow(10, d / 20);
  const clamp= (v,a,b) => v < a ? a : (v > b ? b : v);

  /* ============================================================
     LOUDNESS — ITU-R BS.1770-4
     K-weighting is applied with real BiquadFilterNodes inside an
     OfflineAudioContext so the coefficients stay correct at any
     sample rate (44.1k, 48k, 96k...).
     ============================================================ */
  async function kWeight(buffer) {
    const ctx = new OfflineAudioContext(
      buffer.numberOfChannels, buffer.length, buffer.sampleRate
    );
    const src = ctx.createBufferSource();
    src.buffer = buffer;

    // Stage 1 — high-frequency shelving boost (head/torso model)
    const shelf = ctx.createBiquadFilter();
    shelf.type = 'highshelf';
    shelf.frequency.value = 1681.97;
    shelf.gain.value = 3.999;
    shelf.Q.value = Math.SQRT1_2;

    // Stage 2 — RLB high-pass
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 38.135;
    hp.Q.value = 0.5;

    src.connect(shelf).connect(hp).connect(ctx.destination);
    src.start();
    return ctx.startRendering();
  }

  /* Gated integrated loudness over an already K-weighted buffer. */
  function gatedLoudness(weighted) {
    const sr    = weighted.sampleRate;
    const chans = [];
    for (let c = 0; c < weighted.numberOfChannels; c++) chans.push(weighted.getChannelData(c));

    const blockLen = Math.round(0.4 * sr);       // 400 ms
    const hop      = Math.round(blockLen / 4);   // 75% overlap
    if (weighted.length < blockLen) return -70;

    // Channel weights: L/R/C = 1.0, surrounds = 1.41 (stereo here)
    const G = chans.map((_, i) => (i < 3 ? 1.0 : 1.41));

    /* Sliding window: each hop only adds the samples entering the
       block and subtracts the ones leaving it, so the whole scan is
       O(n) per channel instead of O(n * blockLen). On a 3-minute
       track that is the difference between snappy and unusable. */
    const running = new Float64Array(chans.length);
    for (let c = 0; c < chans.length; c++) {
      const d = chans[c];
      let s = 0;
      for (let i = 0; i < blockLen; i++) s += d[i] * d[i];
      running[c] = s;
    }

    const blocks = [];
    const pushBlock = () => {
      let sum = 0;
      for (let c = 0; c < chans.length; c++) sum += G[c] * (running[c] / blockLen);
      blocks.push({ power: sum, l: -0.691 + 10 * Math.log10(Math.max(sum, 1e-12)) });
    };
    pushBlock();

    for (let start = hop; start + blockLen <= weighted.length; start += hop) {
      for (let c = 0; c < chans.length; c++) {
        const d = chans[c];
        let s = running[c];
        for (let i = start - hop; i < start; i++)                    s -= d[i] * d[i];
        for (let i = start + blockLen - hop; i < start + blockLen; i++) s += d[i] * d[i];
        running[c] = s > 0 ? s : 0;
      }
      pushBlock();
    }
    if (!blocks.length) return -70;

    // absolute gate
    const kept = blocks.filter(b => b.l > -70);
    if (!kept.length) return -70;

    // relative gate, 10 LU below the ungated mean
    const meanPow = kept.reduce((a, b) => a + b.power, 0) / kept.length;
    const relGate = -0.691 + 10 * Math.log10(Math.max(meanPow, 1e-12)) - 10;

    const kept2 = kept.filter(b => b.l > relGate);
    if (!kept2.length) return -70;

    const finalPow = kept2.reduce((a, b) => a + b.power, 0) / kept2.length;
    return -0.691 + 10 * Math.log10(Math.max(finalPow, 1e-12));
  }

  async function measureLUFS(buffer) {
    return gatedLoudness(await kWeight(buffer));
  }

  /* True peak — render at 4x the sample rate so inter-sample peaks
     that a plain sample-peak reading would miss actually show up. */
  async function measureTruePeak(buffer) {
    const target = Math.min(buffer.sampleRate * 4, 192000);
    const ctx = new OfflineAudioContext(
      buffer.numberOfChannels,
      Math.ceil(buffer.length * (target / buffer.sampleRate)),
      target
    );
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start();
    const up = await ctx.startRendering();

    let peak = 0;
    for (let c = 0; c < up.numberOfChannels; c++) {
      const d = up.getChannelData(c);
      for (let i = 0; i < d.length; i++) {
        const a = Math.abs(d[i]);
        if (a > peak) peak = a;
      }
    }
    return dB(peak);
  }

  /* Sample peak + RMS, used for the crest factor. */
  function peakAndRms(buffer) {
    let peak = 0, sq = 0, n = 0;
    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const d = buffer.getChannelData(c);
      for (let i = 0; i < d.length; i++) {
        const a = Math.abs(d[i]);
        if (a > peak) peak = a;
        sq += d[i] * d[i];
        n++;
      }
    }
    return { peak: dB(peak), rms: dB(Math.sqrt(sq / Math.max(n, 1))) };
  }

  /* ============================================================
     SATURATION CURVE — gentle odd-harmonic soft clip
     ============================================================ */
  function saturationCurve(amount) {
    const n = 8192, curve = new Float32Array(n);
    /* Kept gentle on purpose: at amount=1 this is still musical
       drive, not a fuzz box. */
    const k = amount * 4;
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = k < 0.001 ? x : Math.tanh(x * (1 + k)) / Math.tanh(1 + k);
    }
    return curve;
  }

  /* Hard ceiling — brick wall as the very last stage so nothing
     can ever leave above the requested dBTP. */
  function ceilingCurve(ceilingLin) {
    const n = 8192, curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = clamp(x, -ceilingLin, ceilingLin);
    }
    return curve;
  }

  /* ============================================================
     RENDER — one offline pass of the mastering chain
     ============================================================ */
  async function renderChain(buffer, s) {
    const ctx = new OfflineAudioContext(
      buffer.numberOfChannels, buffer.length, buffer.sampleRate
    );
    const src = ctx.createBufferSource();
    src.buffer = buffer;

    // 1. rumble filter
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = s.hpf;
    hp.Q.value = 0.707;

    // 2. glue compressor
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = s.compThreshold;
    comp.knee.value      = 6;
    comp.ratio.value     = s.compRatio;
    comp.attack.value    = 0.012;
    comp.release.value   = 0.22;

    // 3. harmonics
    const sat = ctx.createWaveShaper();
    sat.curve = saturationCurve(s.harmonics);
    sat.oversample = '4x';

    // 4. make-up gain
    const makeup = ctx.createGain();
    makeup.gain.value = lin(s.makeupDb);

    // 5. limiter
    const lim = ctx.createDynamicsCompressor();
    lim.threshold.value = s.limitThreshold;
    lim.knee.value      = 0;
    lim.ratio.value     = 20;
    lim.attack.value    = 0.002;
    lim.release.value   = 0.06;

    // 6. absolute ceiling
    const ceil = ctx.createWaveShaper();
    ceil.curve = ceilingCurve(lin(s.ceilingDb));
    ceil.oversample = '4x';

    src.connect(hp).connect(comp).connect(sat)
       .connect(makeup).connect(lim).connect(ceil)
       .connect(ctx.destination);

    src.start();
    return ctx.startRendering();
  }

  /* ============================================================
     MASTER — analyse, decide, render, correct, render again
     ============================================================ */
  async function master(buffer, opts, onStep) {
    const step = onStep || function () {};
    const targetLufs = opts.targetLufs;
    const ceilingDb  = opts.ceilingDb;

    step('Analysing loudness…', 0.08);
    const inLufs = await measureLUFS(buffer);

    step('Measuring true peak…', 0.25);
    const inTp = await measureTruePeak(buffer);
    const { peak, rms } = peakAndRms(buffer);

    /* --- the automatic decisions ---
       Crest factor tells us how dynamic the track already is.
       A punchy, open mix (high crest) gets more glue; a mix that
       is already squashed gets left alone.                      */
    const crest = peak - rms;
    const compRatio     = clamp(1.4 + (crest - 10) * 0.09, 1.4, 3.2);
    const compThreshold = clamp(rms + 2 - (crest - 10) * 0.4, -34, -6);

    const settings = {
      hpf: opts.hpf,
      compRatio,
      compThreshold,
      harmonics: opts.harmonics,
      makeupDb: clamp(targetLufs - inLufs, -24, 24),
      limitThreshold: ceilingDb - 1.2,
      ceilingDb
    };

    /* --- solve for the make-up gain ---
       Compressor + saturation + limiter make output loudness a
       non-linear function of the make-up gain: past a point, adding
       6 dB of gain buys far less than 6 LU. A single linear
       correction overshoots badly (measured: 5 LU off target), so
       we run a secant solve on (makeup -> LUFS), which converges in
       two or three renders because the curve is monotonic.        */
    step('Mastering…', 0.42);
    let x0 = settings.makeupDb;
    let out = await renderChain(buffer, settings);
    let y0 = await measureLUFS(out);

    if (Math.abs(targetLufs - y0) > 0.3) {
      // second probe, damped so we stay in a sane region
      let x1 = clamp(x0 + (targetLufs - y0) * 0.5, -24, 24);
      settings.makeupDb = x1;
      step('Fine-tuning the level…', 0.62);
      out = await renderChain(buffer, settings);
      let y1 = await measureLUFS(out);

      for (let i = 0; i < 3 && Math.abs(targetLufs - y1) > 0.3; i++) {
        const slope = (y1 - y0) / (x1 - x0);
        // a flat slope means the limiter is saturated — no point pushing
        if (!isFinite(slope) || Math.abs(slope) < 0.05) break;

        const x2 = clamp(x1 + (targetLufs - y1) / slope, -24, 24);
        if (Math.abs(x2 - x1) < 0.05) break;

        x0 = x1; y0 = y1; x1 = x2;
        settings.makeupDb = x1;
        step('Fine-tuning the level…', 0.68 + i * 0.06);
        out = await renderChain(buffer, settings);
        y1 = await measureLUFS(out);
      }
      y0 = y1;
    }
    const outLufs = y0;

    step('Measuring the master…', 0.93);
    const outTp = await measureTruePeak(out);

    return {
      buffer: out,
      report: {
        inLufs, outLufs, inTp, outTp,
        crest,
        gainApplied: settings.makeupDb,
        compThreshold: settings.compThreshold,
        compRatio: settings.compRatio,
        targetLufs, ceilingDb
      }
    };
  }

  /* ============================================================
     WAV ENCODER — 16 or 24-bit PCM
     ============================================================ */
  function encodeWav(buffer, bits) {
    const chans = buffer.numberOfChannels;
    const len   = buffer.length;
    const bytes = bits / 8;
    const dataSize = len * chans * bytes;
    const ab = new ArrayBuffer(44 + dataSize);
    const view = new DataView(ab);

    const str = (off, s) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };

    str(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    str(8, 'WAVE');
    str(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);                       // PCM
    view.setUint16(22, chans, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * chans * bytes, true);
    view.setUint16(32, chans * bytes, true);
    view.setUint16(34, bits, true);
    str(36, 'data');
    view.setUint32(40, dataSize, true);

    const data = [];
    for (let c = 0; c < chans; c++) data.push(buffer.getChannelData(c));

    let off = 44;
    const max = bits === 24 ? 8388607 : 32767;
    for (let i = 0; i < len; i++) {
      for (let c = 0; c < chans; c++) {
        /* TPDF dither, one LSB peak-to-peak — keeps the truncation
           from turning into distortion on quiet tails. */
        const d = (Math.random() - Math.random()) / max;
        let v = clamp(data[c][i] + d, -1, 1);
        v = Math.round(v * max);
        if (bits === 24) {
          view.setUint8(off,     v & 0xff);
          view.setUint8(off + 1, (v >> 8) & 0xff);
          view.setUint8(off + 2, (v >> 16) & 0xff);
          off += 3;
        } else {
          view.setInt16(off, v, true);
          off += 2;
        }
      }
    }
    return new Blob([ab], { type: 'audio/wav' });
  }

  global.AIMastering = { master, measureLUFS, measureTruePeak, encodeWav, dB, lin };

})(window);
