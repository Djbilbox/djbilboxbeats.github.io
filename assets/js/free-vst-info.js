/* ============================================================
   DJBILBOX BEATS — Rich info content for the free VST detail pages
   Keyed by the `id` used in vst-data.js. Rendered by free-vst.html.
   Written in English (site source language) so the language switcher
   (Google Translate) can localise it to FR / AR / JA / RU.
   `long`  : 2-3 sentence description
   `feats` : [{i:fa-icon, t:title, d:description}]  (3-4 items)
   `dev`   : developer / editor name
   ============================================================ */
window.FREE_VST_INFO = {
  /* ---------- Synths & Instruments ---------- */
  vital: {
    dev:"Vital Audio",
    long:"Vital is a modern spectral wavetable synthesizer. Its free version is already extremely complete: wavetable oscillators, real-time visual modulation, wide stereo unison and built-in effects. Perfect for crafting modern basses, leads and pads for trap, drill and electronic music.",
    feats:[
      {i:"fa-wave-square",t:"Wavetable oscillators",d:"Draw and morph your own wavetables for truly unique sounds."},
      {i:"fa-diagram-project",t:"Visual modulation",d:"Drag-and-drop modulation — everything is visible and animated in real time."},
      {i:"fa-layer-group",t:"Unison & stereo",d:"A wide unison engine for massive, immersive sounds."},
      {i:"fa-plug",t:"VST3 · AU",d:"Works in FL Studio and every modern DAW."}
    ]
  },
  zebralette: {
    dev:"u-he",
    long:"Zebralette is a free mini-synth based on a single oscillator from u-he's acclaimed Zebra. Despite its simplicity, it offers powerful spectral synthesis, an LFO, an envelope and built-in effects. Perfect for learning u-he synthesis and creating expressive leads and pads.",
    feats:[
      {i:"fa-wave-square",t:"Zebra oscillator",d:"Zebra's spectral engine in a clean, simple interface."},
      {i:"fa-sliders",t:"Spectral morphing",d:"Reshape the waveform for evolving timbres."},
      {i:"fa-guitar",t:"Leads & pads",d:"Great for warm melodies and rich pads."},
      {i:"fa-plug",t:"Free VST",d:"Made by u-he, a reference in audio software."}
    ]
  },
  mg1: {
    dev:"Cherry Audio",
    long:"The Surrealistic MG-1 Plus is a free emulation of the analog Realistic MG-1 synthesizer (built by Moog). Cherry Audio faithfully recreates its warm oscillators and signature filter. Perfect for fat basses, vintage leads and G-Funk / synthwave tones.",
    feats:[
      {i:"fa-wave-square",t:"Analog oscillators",d:"The warm, thick sound of vintage Moog synths."},
      {i:"fa-filter",t:"Signature filter",d:"A resonant filter ideal for basses and leads."},
      {i:"fa-sun",t:"G-Funk vibe",d:"Perfect for west-coast leads and synthwave."},
      {i:"fa-plug",t:"100% free",d:"Offered by Cherry Audio, pro quality."}
    ]
  },
  drum8: {
    dev:"Audiolatry",
    long:"Drum8 is a free drum rompler by Audiolatry, designed for hip-hop and trap. It ships with many ready-to-use kits plus gain, filter and reverb controls. Load a kit, play the pads and build your patterns in seconds.",
    feats:[
      {i:"fa-drum",t:"Hip-hop & trap kits",d:"Ready-to-use drums for your beats."},
      {i:"fa-sliders",t:"Gain · filter · reverb",d:"Quickly sculpt the sound of each kit."},
      {i:"fa-bolt",t:"Fast workflow",d:"Load, play, export — built for fast production."},
      {i:"fa-plug",t:"Free VST",d:"A perfect complement to your drum kits."}
    ]
  },

  /* ---------- Effects ---------- */
  ott: {
    dev:"Xfer Records",
    long:"OTT is the most widely used free multiband compressor in the world, made by Xfer Records (creators of Serum). It applies aggressive up/down compression across 3 bands for that modern, clear, “pro” sound you hear everywhere in trap, EDM and pop.",
    feats:[
      {i:"fa-layer-group",t:"3-band compression",d:"Processes lows, mids and highs separately."},
      {i:"fa-arrows-up-down",t:"Up / Down compression",d:"Lifts details and tames peaks."},
      {i:"fa-wand-magic-sparkles",t:"Instant modern sound",d:"That “pro” grit on basses, synths and vocals."},
      {i:"fa-plug",t:"Free · Xfer",d:"By the creators of Serum."}
    ]
  },
  camelcrusher: {
    dev:"Camel Audio",
    long:"CamelCrusher is a legendary free distortion and coloring plugin. It combines two types of distortion (tube & mechanical), a “phat” compressor and a filter. Perfect for dirtying up basses, thickening drums or adding character to any track.",
    feats:[
      {i:"fa-fire",t:"Dual distortion",d:"Warm tube + aggressive mechanical distortion."},
      {i:"fa-compress",t:"Phat compressor",d:"Instantly thickens and glues the sound."},
      {i:"fa-filter",t:"Built-in filter",d:"Shape the grit with cutoff and resonance."},
      {i:"fa-plug",t:"Free · legendary",d:"A classic in every studio."}
    ]
  },
  supermassive: {
    dev:"Valhalla DSP",
    long:"ValhallaSupermassive is a free plugin for giant reverbs and massive delays by Valhalla DSP. Its modes create huge spaces, ambient echoes and evolving pads. Ideal for intros, atmospheres and cinematic sound design.",
    feats:[
      {i:"fa-water",t:"Giant reverbs",d:"Huge, ambient spaces."},
      {i:"fa-clock-rotate-left",t:"Massive delays",d:"Evolving, textured echoes."},
      {i:"fa-infinity",t:"Creative modes",d:"Several algorithms named after galaxies."},
      {i:"fa-plug",t:"Free · Valhalla",d:"A world reference in reverb."}
    ]
  },
  freqecho: {
    dev:"Valhalla DSP",
    long:"ValhallaFreqEcho is a free frequency-shifting delay (frequency shifter + echo) by Valhalla DSP. It creates psychedelic effects, metallic risers and out-of-this-world atmospheres. Perfect for sound design and transitions.",
    feats:[
      {i:"fa-clock-rotate-left",t:"Delay + freq shift",d:"Echoes that rise or fall in frequency."},
      {i:"fa-wand-magic-sparkles",t:"Psychedelic effects",d:"Unique, evolving textures."},
      {i:"fa-sliders",t:"Simple & musical",d:"Few controls, instant results."},
      {i:"fa-plug",t:"Free · Valhalla",d:"Ideal for sound design."}
    ]
  },
  spacemodulator: {
    dev:"Valhalla DSP",
    long:"ValhallaSpaceModulator is a free flanger by Valhalla DSP, capable of modulation effects from subtle to extreme. From gentle chorus to spatial “jet” flanger, it adds movement and stereo width to your sounds.",
    feats:[
      {i:"fa-wave-square",t:"Classic flanger",d:"From subtle chorus to extreme flanger."},
      {i:"fa-arrows-left-right",t:"Stereo width",d:"Adds movement and space."},
      {i:"fa-rocket",t:"Spatial effects",d:"“Jet” sounds and deep modulation."},
      {i:"fa-plug",t:"Free · Valhalla",d:"Studio quality, zero cost."}
    ]
  },
  graillon3: {
    dev:"Auburn Sounds",
    long:"Graillon 3 (free version) by Auburn Sounds is a real-time pitch-correction / auto-tune plugin. It offers clean correction, a “robot” effect for modern vocals and an octave shifter. Perfect for trap auto-tune and vocal effects.",
    feats:[
      {i:"fa-microphone",t:"Real-time auto-tune",d:"Instant pitch correction."},
      {i:"fa-robot",t:"Robot effect",d:"The modern trap auto-tune sound."},
      {i:"fa-arrow-up-wide-short",t:"Octave shift",d:"Change the octave of the voice."},
      {i:"fa-plug",t:"Free · Auburn",d:"The free version is already very complete."}
    ]
  },
  mautopitch: {
    dev:"MeldaProduction",
    long:"MAutoPitch is a free, ultra-complete pitch-correction and auto-tune plugin by MeldaProduction. Automatic scale-based correction, formant control, stereo width and a detune effect. An excellent free auto-tune for your vocals.",
    feats:[
      {i:"fa-microphone",t:"Auto correction",d:"Snaps to your chosen scale."},
      {i:"fa-wave-square",t:"Formants & detune",d:"Keep vocals natural or robotic."},
      {i:"fa-arrows-left-right",t:"Stereo width",d:"Widens the voice instantly."},
      {i:"fa-plug",t:"Free · Melda",d:"Pro quality, no limits."}
    ]
  },
  talvocoder: {
    dev:"TAL Software",
    long:"TAL-Vocoder-2 is a free emulation of a vintage 1980s analog vocoder by TAL Software. It turns your voice into classic robotic textures and harmonies. Perfect for hooks, vocal pads and a retro sound.",
    feats:[
      {i:"fa-microphone",t:"Vintage vocoder",d:"The robotic analog sound of the 80s."},
      {i:"fa-music",t:"Harmonized vocals",d:"Turn the voice into a melodic pad."},
      {i:"fa-sliders",t:"Built-in carrier",d:"Includes a carrier synth, ready to play."},
      {i:"fa-plug",t:"Free · TAL",d:"A cult vocoder, offered for free."}
    ]
  },
  tdeesser: {
    dev:"Techivation",
    long:"T-De-Esser 2 by Techivation is a modern, simple and transparent free de-esser. It controls sibilance (harsh “s” sounds) in your vocals with a single control, without altering the rest of the sound. Essential for vocal mixing.",
    feats:[
      {i:"fa-volume-low",t:"Sibilance control",d:"Tames harsh “s” sounds in vocals."},
      {i:"fa-sliders",t:"Single control",d:"Simple and fast to dial in."},
      {i:"fa-wand-magic-sparkles",t:"Transparent",d:"Never dulls the voice."},
      {i:"fa-plug",t:"Free · Techivation",d:"Pro mixing quality."}
    ]
  },
  surgext: {
    dev:"Surge Synth Team",
    long:"Surge XT Effects is the full effects rack extracted from the open-source Surge XT synthesizer. Reverbs, delays, distortions, chorus, EQ, vocoder and much more — dozens of quality effects, 100% free and open-source.",
    feats:[
      {i:"fa-layer-group",t:"Dozens of effects",d:"Reverb, delay, distortion, chorus, EQ…"},
      {i:"fa-code",t:"Open-source",d:"Built by a large community."},
      {i:"fa-sliders",t:"All-in-one",d:"A single plugin for many effects."},
      {i:"fa-plug",t:"Free · open",d:"No limits, no license."}
    ]
  },
  neuralq: {
    dev:"Analog Obsession",
    long:"NeuralQ by Analog Obsession is a free EQ and saturator inspired by a famous tube EQ (Pultec), modeled with a neural network. It brings warmth, air and analog color to your buses, vocals and masters.",
    feats:[
      {i:"fa-sliders",t:"Pultec-style EQ",d:"The grit of a legendary tube EQ."},
      {i:"fa-fire",t:"Analog saturation",d:"Warmth and musical harmonics."},
      {i:"fa-star",t:"Bus & mastering",d:"Ideal on vocals, drums and master."},
      {i:"fa-plug",t:"Free · Analog Obsession",d:"Neural-network modeling."}
    ]
  }
};
