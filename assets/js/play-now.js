/* ============================================================
   PLAY IT RIGHT NOW — clavier jouable dans la page produit
   Joue de vrais presets du plug-in, enregistrés note par note hors
   ligne (outil HumpirePresetRender) : une note tous les 3 demi-tons,
   les notes intermédiaires sont transposées depuis l'échantillon le
   plus proche. Rien n'est chargé avant que le bloc soit visible.

   Usage : <div data-play-now="camel-pilot"></div>
           -> lit assets/audio/play/camel-pilot.json
   Clavier d'ordinateur : touches par position physique (QWERTY comme
   AZERTY) — rangée du milieu = blanches, rangée du dessus = noires,
   Z / X (W / X en AZERTY) = octave - / +.
   ============================================================ */
(function(){
  const BASE = 'assets/audio/play/';
  const NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const noteName = m => NAMES[m % 12] + (Math.floor(m / 12) - 1);
  /* touches physiques -> demi-tons depuis le do de gauche */
  const KEYMAP = { KeyA:0, KeyW:1, KeyS:2, KeyE:3, KeyD:4, KeyF:5, KeyT:6, KeyG:7, KeyY:8, KeyH:9, KeyU:10, KeyJ:11,
                   KeyK:12, KeyO:13, KeyL:14, KeyP:15, Semicolon:16, Quote:17 };
  const MAX_VOICES = 16;

  let ctx = null, master = null, analyser = null;
  const buffers = new Map();           // url -> Promise<AudioBuffer>

  function audio(){
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      /* limiteur doux : les accords ne saturent pas */
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -6; comp.knee.value = 6; comp.ratio.value = 12;
      comp.attack.value = 0.003; comp.release.value = 0.15;
      master = ctx.createGain(); master.gain.value = 0.9;
      analyser = ctx.createAnalyser(); analyser.fftSize = 512;
      master.connect(comp).connect(analyser).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function loadBuffer(url){
    if (!buffers.has(url)) {
      buffers.set(url, fetch(url)
        .then(r => { if (!r.ok) throw new Error(r.status + ' ' + url); return r.arrayBuffer(); })
        .then(data => new Promise((ok, ko) => audio().decodeAudioData(data, ok, ko))));
    }
    return buffers.get(url);
  }

  function el(tag, cls, html){ const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function mount(root){
    const id = root.dataset.playNow;
    root.classList.add('pn');
    root.innerHTML = '<p class="pn-msg">Loading the player…</p>';
    fetch(BASE + id + '.json').then(r => r.json()).then(cfg => build(root, id, cfg))
      .catch(() => { root.innerHTML = ''; root.hidden = true; });
  }

  function build(root, id, cfg){
    let preset = cfg.presets[0], samples = null, octave = preset.octave, hold = false;
    let loadToken = 0;
    const voices = new Map();          // midi -> {src, gain}
    const pointerNote = new Map();     // pointerId -> midi
    const keyNote = new Map();         // code -> midi

    root.innerHTML = '';
    const head = el('div', 'pn-head');
    head.append(el('div', 'pn-title', '<i class="fa-solid fa-music" aria-hidden="true"></i> Play it right now'));
    const tools = el('div', 'pn-tools');
    const meter = el('div', 'pn-meter'); meter.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 12; i++) meter.append(el('span'));
    const holdBtn = el('button', 'pn-btn', 'Hold'); holdBtn.type = 'button'; holdBtn.setAttribute('aria-pressed', 'false');
    const octDown = el('button', 'pn-btn pn-sq', '−'); octDown.type = 'button'; octDown.setAttribute('aria-label', 'Octave down');
    const octLabel = el('div', 'pn-oct');
    const octUp = el('button', 'pn-btn pn-sq', '+'); octUp.type = 'button'; octUp.setAttribute('aria-label', 'Octave up');
    tools.append(meter, holdBtn, octDown, octLabel, octUp);
    head.append(tools);

    const sub = el('p', 'pn-sub', 'Real ' + cfg.title + ' presets, recorded straight from the plugin. Tap the keys or use your computer keyboard.');
    const presetsBar = el('div', 'pn-presets'); presetsBar.setAttribute('role', 'group'); presetsBar.setAttribute('aria-label', 'Presets');
    const presetBtns = cfg.presets.map((p, i) => {
      const b = el('button', 'pn-preset' + (i === 0 ? ' active' : ''), p.name); b.type = 'button';
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.addEventListener('click', () => selectPreset(i));
      presetsBar.append(b);
      return b;
    });

    const kb = el('div', 'pn-kb'); kb.setAttribute('role', 'group'); kb.setAttribute('aria-label', 'Keyboard');
    const status = el('div', 'pn-status');
    const statusL = el('span', '', 'Tap a key to start'), statusR = el('span', '', 'Demo quality · the plugin plays in full resolution');
    status.append(statusL, statusR);
    const foot = el('div', 'pn-foot');
    foot.append(el('p', '', 'You\'re playing <b>' + cfg.presets.length + ' of ' + cfg.total + '</b> presets. The full plugin ships all ' + cfg.total + '.'));
    const cta = el('a', 'pn-cta', cfg.cta || 'Get the plugin');
    cta.href = 'https://djbilboxbeats.gumroad.com/l/' + cfg.buy; cta.target = '_blank'; cta.rel = 'noopener';
    foot.append(cta);
    root.append(head, sub, presetsBar, kb, status, foot);

    /* ---------- clavier ---------- */
    let keys = [];                      // {midi, el}
    function octavesVisible(){ return root.clientWidth < 620 ? 1 : 2; }
    function drawKeyboard(){
      kb.innerHTML = ''; keys = [];
      const span = octavesVisible() * 12 + 1;
      const low = 12 * (octave + 1);    // do de gauche (C3 = 48)
      const whites = [];
      for (let m = low; m < low + span; m++) if (![1,3,6,8,10].includes(m % 12)) whites.push(m);
      const w = 100 / whites.length;
      for (let m = low; m < low + span; m++) {
        const black = [1,3,6,8,10].includes(m % 12);
        const k = el('div', black ? 'pn-key pn-black' : 'pn-key pn-white');
        k.dataset.midi = m;
        k.setAttribute('aria-label', noteName(m));
        if (black) {
          const left = whites.indexOf(m - 1) + 1;
          k.style.left = 'calc(' + (left * w) + '% - ' + (w * 0.31) + '%)';
          k.style.width = (w * 0.62) + '%';
        } else {
          k.style.width = w + '%';
          if (m % 12 === 0) k.append(el('span', 'pn-label', noteName(m)));
        }
        if (voices.has(m)) k.classList.add('down');
        kb.append(k); keys.push({ midi: m, el: k });
      }
      octLabel.innerHTML = 'Oct<b>' + octave + '</b>';
    }
    const keyEl = m => (keys.find(k => k.midi === m) || {}).el;

    /* ---------- son ---------- */
    function nearest(m){
      let best = samples[0];
      for (const s of samples) if (Math.abs(s.midi - m) < Math.abs(best.midi - m)) best = s;
      return best;
    }
    function noteOn(m){
      if (!samples) return;
      audio();
      noteOff(m, true);
      if (voices.size >= MAX_VOICES) noteOff(voices.keys().next().value, true);
      const s = nearest(m);
      const src = ctx.createBufferSource();
      src.buffer = s.buffer;
      src.playbackRate.value = Math.pow(2, (m - s.midi) / 12);
      const g = ctx.createGain();
      src.connect(g).connect(master);
      src.start();
      const v = { src, gain: g };
      src.onended = () => { if (voices.get(m) === v) { voices.delete(m); const k = keyEl(m); if (k) k.classList.remove('down'); } };
      voices.set(m, v);
      const k = keyEl(m); if (k) k.classList.add('down');
      statusL.textContent = noteName(m) + ' · ' + preset.name;
    }
    function noteOff(m, force){
      const v = voices.get(m);
      if (!v || (hold && !force)) return;
      voices.delete(m);
      const t = ctx.currentTime;
      v.gain.gain.setTargetAtTime(0, t, force ? 0.01 : 0.07);
      v.src.stop(t + (force ? 0.06 : 0.5));
      const k = keyEl(m); if (k) k.classList.remove('down');
    }
    function allOff(){ for (const m of [...voices.keys()]) noteOff(m, true); }

    function selectPreset(i){
      allOff();
      preset = cfg.presets[i];
      presetBtns.forEach((b, j) => { b.classList.toggle('active', j === i); b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
      if (octave !== preset.octave) { octave = preset.octave; drawKeyboard(); }
      loadPreset();
    }
    function loadPreset(){
      const token = ++loadToken;
      samples = null;
      root.classList.add('loading');
      statusL.textContent = 'Loading ' + preset.name + '…';
      Promise.all(preset.notes.map(m => loadBuffer(BASE + id + '/' + preset.slug + '/n' + m + '.m4a').then(buffer => ({ midi: m, buffer }))))
        .then(list => {
          if (token !== loadToken) return;
          samples = list;
          root.classList.remove('loading');
          statusL.textContent = 'Tap a key to start';
        })
        .catch(() => { if (token === loadToken) statusL.textContent = 'Could not load ' + preset.name; });
    }

    /* ---------- souris / doigt (glissando) ---------- */
    function midiAt(x, y){
      const t = document.elementFromPoint(x, y);
      const k = t && t.closest && t.closest('.pn-key');
      return k && kb.contains(k) ? +k.dataset.midi : null;
    }
    kb.addEventListener('pointerdown', e => {
      const m = midiAt(e.clientX, e.clientY);
      if (m == null) return;
      e.preventDefault();
      try { kb.setPointerCapture(e.pointerId); } catch(_) {}
      pointerNote.set(e.pointerId, m);
      noteOn(m);
    });
    kb.addEventListener('pointermove', e => {
      if (!pointerNote.has(e.pointerId)) return;
      const m = midiAt(e.clientX, e.clientY), prev = pointerNote.get(e.pointerId);
      if (m == null || m === prev) return;
      noteOff(prev); pointerNote.set(e.pointerId, m); noteOn(m);
    });
    const release = e => { if (pointerNote.has(e.pointerId)) { noteOff(pointerNote.get(e.pointerId)); pointerNote.delete(e.pointerId); } };
    kb.addEventListener('pointerup', release);
    kb.addEventListener('pointercancel', release);

    /* ---------- clavier d'ordinateur ---------- */
    let active = false;                  // seulement après une interaction avec ce bloc ou s'il est visible
    root.addEventListener('pointerdown', () => { active = true; });
    window.addEventListener('keydown', e => {
      if (!active || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
      if (e.code === 'KeyZ') { shiftOctave(-1); e.preventDefault(); return; }
      if (e.code === 'KeyX') { shiftOctave(1); e.preventDefault(); return; }
      if (!(e.code in KEYMAP)) return;
      e.preventDefault();
      const m = 12 * (octave + 1) + KEYMAP[e.code];
      keyNote.set(e.code, m);
      noteOn(m);
    });
    window.addEventListener('keyup', e => {
      if (keyNote.has(e.code)) { noteOff(keyNote.get(e.code)); keyNote.delete(e.code); }
    });

    /* ---------- réglages ---------- */
    function shiftOctave(d){ octave = Math.max(0, Math.min(6, octave + d)); drawKeyboard(); }
    octDown.addEventListener('click', () => shiftOctave(-1));
    octUp.addEventListener('click', () => shiftOctave(1));
    holdBtn.addEventListener('click', () => {
      hold = !hold;
      holdBtn.classList.toggle('active', hold);
      holdBtn.setAttribute('aria-pressed', hold ? 'true' : 'false');
      if (!hold) allOff();
    });

    /* vumètre : 12 barres pilotées par l'analyseur */
    const bars = [...meter.children], data = new Uint8Array(256);
    (function tick(){
      if (analyser && voices.size) {
        analyser.getByteTimeDomainData(data);
        let peak = 0; for (const v of data) peak = Math.max(peak, Math.abs(v - 128) / 128);
        const lit = Math.round(Math.min(1, peak * 1.6) * bars.length);
        bars.forEach((b, i) => b.classList.toggle('on', i < lit));
      } else bars.forEach(b => b.classList.remove('on'));
      requestAnimationFrame(tick);
    })();

    let lastOct = octavesVisible();
    window.addEventListener('resize', () => { if (octavesVisible() !== lastOct) { lastOct = octavesVisible(); drawKeyboard(); } });

    drawKeyboard();
    /* on ne télécharge les sons qu'une fois le bloc à l'écran */
    const io = new IntersectionObserver(es => {
      if (es.some(x => x.isIntersecting)) { io.disconnect(); active = true; loadPreset(); }
    }, { rootMargin: '200px' });
    io.observe(root);
  }

  function init(){ document.querySelectorAll('[data-play-now]').forEach(mount); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.PlayNow = { mount };
})();
