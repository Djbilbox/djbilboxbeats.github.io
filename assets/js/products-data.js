/* ============================================================
   DJBILBOX BEATS — Full product catalog (detail pages)
   Drives product.html?id=<slug>. One entry per VST / sample kit.
   `video` = YouTube playlist id used as the muted hero background.
   `buy`   = Gumroad slug (append /PROMOCODE to auto-apply a deal).
   ============================================================ */
window.PRODUCTS = {

  /* ===================== NEW RELEASE ===================== */
  "west-side": {
    type:"kit", name:"WEST SIDE DRUM KIT", sub:"2Pac × Snoop Dogg × The Game — West Coast Drum Kit",
    tagline:"The ultimate West Coast drum kit — one-shots, MIDI patterns & full stems from 8 legendary G-Funk records.",
    cover:"img/packs/west-side.jpg", accent:"#e8a33d", accent2:"#2e6fd6",
    price:"8", badge:"🆕 New",
    note:"37 one-shots · 36 MIDI · full stems · royalty-free",
    buy:"west-side-drum-kit",
    video:"nD2CfT4Ortw",
    gallery:["img/packs/west-side-a.jpg","img/packs/west-side-b.jpg"],
    tags:["West Coast","G-Funk","Hip-Hop","MIDI","One-Shots"],
    about:[
      "WEST SIDE DRUM KIT is a full West Coast production toolkit inspired by the golden era of G-Funk and California hip-hop. Every sound is built from 8 legendary records by 2Pac, Snoop Dogg and The Game — recreated one-shot by one-shot, with matching MIDI drum patterns and full WAV stems so you can rebuild these classic grooves or flip them into something new.",
      "Inside you'll find 37 punchy drum one-shots — kicks, snares, claps, hi-hats, cymbals, shakers, triangle and scratch/FX — plus 36 MIDI drum patterns mapped track by track. Drag the MIDI onto your own sounds, load the one-shots in your sampler, or study the stems to hear exactly how these timeless beats were made.",
      "From Hail Mary to How We Do, load up your lowrider and ride down the West Side. Name your price and download it 100% royalty-free."
    ],
    features:[
      {icon:"fa-drum", t:"37 drum one-shots", d:"Kicks, snares, claps, hats, cymbals, shakers, triangle & scratch/FX."},
      {icon:"fa-music", t:"36 MIDI patterns", d:"The exact grooves mapped track by track — drop them on any sound."},
      {icon:"fa-layer-group", t:"Full WAV stems", d:"Stems for all 8 legendary West Coast records."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Name-your-price — use in your own beats with zero clearance."}
    ],
    specs:[
      {k:"Content", v:"West Coast / G-Funk drum kit — one-shots, MIDI & stems"},
      {k:"Format", v:"WAV + MIDI"},
      {k:"One-shots", v:"37 (drums, perc, scratch/FX)"},
      {k:"MIDI", v:"36 drum patterns (8 tracks)"},
      {k:"Tempo range", v:"82–99 BPM"},
      {k:"Price", v:"Name your price (free)"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["37 drum one-shots (WAV)","36 MIDI drum patterns","Full WAV stems — 8 tracks","2Pac · Snoop Dogg · The Game grooves","Works in all DAWs (FL, Ableton, Logic…)"]
  },

  /* ===================== BUNDLE ===================== */
  "free-bundle": {
    type:"bundle", name:"ALL VST PACK", sub:"All 5 VSTs in One Bundle",
    tagline:"Get all 5 DJBILBOX VST plugins in one pack — the complete collection at -80%.",
    cover:"img/vst/all-vst-pack.jpg", accent:"#27ae60", accent2:"#2ecc71",
    price:"34.60", old:"173", badge:"🔥 -80%",
    note:"Code SOLDES80 · All 5 VSTs (total value €173) · Best deal",
    buy:"djbilbox-free-bundle", demo:"",
    video:"", poster:"img/vst/all-vst-pack.jpg",
    /* Listed below the fold so buyers can also grab any single plugin on its own. */
    bundleItems:[
      {name:"MATRIX MODULAR", sub:"Stereo Modulation · Auto-Pan", img:"img/vst/matrix-modular-cover.jpg", buy:"ocpoej"},
      {name:"MACHINA",        sub:"Distortion · Delay · Filter",  img:"img/vst/machina-vst.jpg",          buy:"lbceu"},
      {name:"BIGBASS",        sub:"LA Lowrider 808 / Sub-Bass",   img:"img/vst/bigbass-vst.jpg",          buy:"xaziro"},
      {name:"Vice City",      sub:"Synthwave / Miami Synth",      img:"img/vst/vice-city-vst.jpg",        buy:"ykdzli"},
      {name:"Oriental Instrument", sub:"280+ Oriental Instruments", img:"img/vst/oriental-instrument-box.jpg", buy:"oriental-instrument-djbilbox-beats"}
    ],
    tags:["5 VST Plugins","Effects + Instruments","Complete Pack","Best Deal"],
    about:[
      "Get all 5 DJBILBOX VST plugins in one download — the complete collection at -80% with code SOLDES80. Perfect for producers who want the full DJBILBOX sound in one purchase.",
      "This bundle includes the full MATRIX MODULAR stereo effect, MACHINA audio processor, BIGBASS lowrider bass instrument, Vice City synthwave instrument, plus the Oriental Instrument with 280+ sounds."
    ],
    features:[
      {icon:"fa-gift", t:"5 Complete VSTs", d:"All DJBILBOX VST plugins bundled together for the best price."},
      {icon:"fa-music", t:"Effects & Instruments", d:"Stereo modulation, distortion/delay, bass, synth & 280+ oriental instruments."},
      {icon:"fa-download", t:"One-Click Download", d:"Download everything at once — no separate purchases needed."},
      {icon:"fa-star", t:"Professional Quality", d:"Same quality as individually purchased plugins — nothing watered down."},
      {icon:"fa-percent", t:"-80% Best Deal", d:"All 5 VSTs (total value €173) for €34.60 with code SOLDES80."}
    ],
    specs:[
      {k:"Bundle Contents", v:"5 complete VST plugins + Oriental Demo"},
      {k:"Formats", v:"VST3, Standalone (Windows & macOS)"},
      {k:"Size", v:"Compact download — optimized"},
      {k:"License", v:"Royalty-free for commercial use"},
      {k:"Support", v:"Full documentation + user manuals included"}
    ],
    includes:[
      "MATRIX MODULAR VST3 + Standalone",
      "MACHINA VST3 + Standalone",
      "BIGBASS VST3 + Standalone",
      "Vice City VST3 + Standalone",
      "Oriental Instrument (280+ instruments)",
      "All factory presets",
      "Complete user manuals (PDF)",
      "Royalty-free license for all productions"
    ]
  },

  /* ===================== VST PLUGINS ===================== */
  "matrix-modular": {
    type:"vst", name:"MATRIX MODULAR", sub:"Westcoast Oriental VST Effect",
    tagline:"Stereo modulation & auto-pan effect inspired by analog matrix mixers — lush, dimensional, and endlessly tweakable.",
    cover:"img/vst/matrix-modular-cover.jpg", accent:"#1abc9c", accent2:"#16a085",
    price:"3.60", old:"18", badge:"🔥 -80%",
    note:"Code SOLDES80 · -80% Summer Sale",
    buy:"ocpoej", demo:"",
    video:"", poster:"img/vst/matrix-modular-cover.jpg",
    tags:["Stereo Modulation","Auto-Pan","VST3","Standalone"],
    about:[
      "MATRIX MODULAR is a stereo modulation effect inspired by vintage Buchla and Serge modular synthesizers — specifically the matrix mixer architectures that defined the Westcoast sound. It brings that dimensional, organic character to any source: guitars, drums, synths, vocals — even entire stereo mixes.",
      "The effect uses analog-modelled modulation sources (sine, triangle, saw, noise) to create dynamic stereo panning, width modulation, and cross-channel movement. Perfect for adding life and movement to static tracks, creating psychoacoustic effects, or building evolving ambient textures.",
      "Fully automatable with minimal CPU footprint. Ships as VST3 (Windows & macOS) and Standalone. A modern take on classic analog matrix mixing, now in plugin form."
    ],
    features:[
      {icon:"fa-wave-square", t:"Analog-modelled modulation", d:"Sine, triangle, sawtooth and noise LFO sources with smooth parameters for organic motion."},
      {icon:"fa-arrows-left-right", t:"Stereo auto-pan", d:"Dynamic left-right panning with depth and rate control for dimensional width."},
      {icon:"fa-link", t:"Cross-channel routing", d:"Matrix-style mixing lets you route modulation across stereo channels independently."},
      {icon:"fa-sliders", t:"Full automation", d:"Every parameter automatable in your DAW — draw complex modulation curves in real time."},
      {icon:"fa-feather", t:"Low CPU", d:"Optimized DSP keeps sessions responsive even with many instances."}
    ],
    specs:[
      {k:"Format", v:"VST3 (Windows & macOS) · Standalone"},
      {k:"Type", v:"Stereo Modulation Effect"},
      {k:"LFO Types", v:"Sine, Triangle, Sawtooth, Noise"},
      {k:"Processing", v:"True stereo with independent L/R routing"},
      {k:"Latency", v:"Minimal — optimized for real-time use"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["MATRIX MODULAR VST3 (64-bit)","MATRIX MODULAR Standalone","Factory presets","User manual (PDF)"]
  },

  "machina": {
    type:"vst", name:"MACHINA", sub:"Creative Multi-Effect — Energy Drink for Your Sound",
    tagline:"A VST3 audio effect wrapped in a fully-animated energy-drink vending machine — distortion, delay & filter with six flavour presets.",
    cover:"img/vst/machina-vst.jpg", accent:"#b44dff", accent2:"#FFD700",
    price:"3.60", old:"18", badge:"🔥 -80%",
    note:"Code SOLDES80 · -80% Summer Sale",
    buy:"lbceu", demo:"",
    video:"", poster:"img/vst/machina-vst.jpg",
    tags:["Audio Effect","Distortion","Delay","Filter","VST3","AU","Win · Mac"],
    about:[
      "MACHINA is a VST3 audio effect plugin wrapped in the most playful interface you've ever seen — a fully animated energy-drink vending machine that makes sound design feel like a game. Drop a coin, grab a can, transform your audio.",
      "Under the hood is a three-stage DSP chain that goes places: DISTORTION brings warm saturation with tone shaping and DC blocking, DELAY adds lush stereo echo with damped feedback up to one second, and FILTER delivers resonant low/high/band-pass character. All three work together as one cohesive signal flow, fully automatable in your DAW.",
      "Six flavours, six personalities: FIZZ DRIVE, COLD DELAY, TURBO BRIGHT, SLUSH SPACE, FROST CLEAN and MELTDOWN — each preset a complete effect character ready to inspire. The mascot on the left responds to the machine, and the whole UI resizes fluidly from compact to ultrawide. Ships as VST3 (Windows & macOS) and AU (macOS)."
    ],
    features:[
      {icon:"fa-fire", t:"Distortion stage", d:"Warm saturation with tone shaping and DC blocking for grit that sits right in the mix."},
      {icon:"fa-clock", t:"Stereo delay", d:"Lush stereo echo with damped feedback up to one second — spacious and musical."},
      {icon:"fa-filter", t:"Resonant filter", d:"Low / high / band-pass filtering with character and resonance control."},
      {icon:"fa-wand-magic-sparkles", t:"6 flavour presets", d:"FIZZ DRIVE, COLD DELAY, TURBO BRIGHT, SLUSH SPACE, FROST CLEAN & MELTDOWN."},
      {icon:"fa-expand", t:"Resizable UI", d:"Drag any corner — everything scales fluidly from compact to ultrawide, never breaks."},
      {icon:"fa-user-pen", t:"Custom mascot", d:"Drop your own PNG character on your Desktop and MACHINA loads it instantly."}
    ],
    specs:[
      {k:"Format", v:"VST3 (Windows & macOS) · AU (macOS)"},
      {k:"Type", v:"Creative Multi-Effect"},
      {k:"Parameters", v:"10 fully automatable controls"},
      {k:"Processing", v:"True stereo (independent L/R)"},
      {k:"Latency", v:"Minimal — optimized for live use"},
      {k:"Price", v:"€29"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["MACHINA VST3 (64-bit)","MACHINA AU (macOS)","6 flavour presets","Custom mascot loader","User manual (PDF)"]
  },

  "bigbass": {
    type:"vst", name:"BIGBASS", sub:"LA Lowrider Bass Synthesizer",
    tagline:"West-Coast lowrider bass in one plug-in — 3 real bass engines, 80 presets, VST3 & Standalone for Win & Mac.",
    cover:"img/vst/bigbass-vst.jpg", accent:"#ffcf33", accent2:"#7b2ff7",
    price:"5.80", old:"29", badge:"🔥 -80%", code:"",
    note:"Code SOLDES80 · 808 · 3 bass modes · -80% Summer Sale",
    buy:"xaziro", demo:"",
    video:"media/bigbass-promo.mp4", poster:"img/vst/bigbass-vst.jpg",
    tags:["Lowrider Bass","G-Funk","VST3","Standalone","Win · Mac"],
    about:[
      "BIGBASS is a Los Angeles lowrider bass synthesizer built for trap, G-funk, drill and West-Coast producers. Behind its chrome-and-gold Pioneer-style faceplate sits a serious sound engine: 3 real, pitch-detected bass modes — so every preset hits with its own character instead of the same tired 808.",
      "Eighty factory presets are organised around an LA theme — Los Santos, Lakers and Los Angeles — each one ready to drop into a beat. Shape the sound with glide, a 24 dB filter with envelope, full ADSR, drive and an FX chain (reverb, delay, distortion), all driven by animated chrome lowrider-spinner knobs. Play a note and the candy-purple Cadillac on screen hits the hydraulics.",
      "Ships as a 64-bit VST3 plug-in and a standalone app for both Windows and macOS. Instant download, unlocked with your personal serial key."
    ],
    features:[
      {icon:"fa-wave-square", t:"3 real bass modes", d:"Real pitch-detected bass sources, not one recycled 808 — each mode with its own character."},
      {icon:"fa-list", t:"80 LA presets", d:"Los Santos, Lakers & LA themed presets — instantly playable, sorted by vibe."},
      {icon:"fa-sliders", t:"Full synth control", d:"Glide, 24 dB filter + envelope, ADSR, drive and an FX chain (reverb, delay, distortion)."},
      {icon:"fa-gem", t:"Lowrider interface", d:"Chrome/gold spinner knobs, backlit Pioneer-style screen, animated spectrum and hydraulic car."},
      {icon:"fa-desktop", t:"Win & Mac", d:"64-bit VST3 + Standalone for Windows and macOS (universal Intel + Apple Silicon)."},
      {icon:"fa-bolt", t:"Punchy & clean", d:"Tuned across the keyboard with smooth saturation — big low end without the fizz."}
    ],
    specs:[
      {k:"Formats", v:"VST3 · Standalone"},
      {k:"Platform", v:"Windows 10/11 & macOS (64-bit)"},
      {k:"Polyphony", v:"Up to 8 voices"},
      {k:"Engine", v:"3 sampled bass modes + filter, ADSR, FX chain"},
      {k:"Presets", v:"80 factory presets (Los Santos / Lakers / LA)"},
      {k:"Install", v:"Instant download · serial-key activation"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["BIGBASS VST3 (64-bit)","BIGBASS Standalone app","80 factory presets","Windows installer + macOS DMG","User manual (PDF)"]
  },

  "vice-city": {
    type:"vst", name:"Vice City", sub:"Virtual Polyphonic Synthesizer",
    tagline:"Neon-soaked 80s synthwave in a single plug-in — VST3 & Standalone.",
    cover:"img/vst/vice-city-vst.jpg", accent:"#ff3ca6", accent2:"#37e1ff",
    price:"7.80", old:"39", badge:"🔥 -80%", code:"",
    note:"Code SOLDES80 · 70 presets · -80% Summer Sale",
    buy:"ykdzli", demo:"",
    video:"0dEw1R8ze4I",
    gallery:["assets/products/vice-city/vice-city-poster.jpg",
             "assets/products/vice-city/vice-city-1.jpg",
             "assets/products/vice-city/vice-city-2.jpg"],
    preview:"assets/products/vice-city/vice-city-preview.mp4",
    previewPoster:"assets/products/vice-city/vice-city-poster.jpg",
    tags:["Synthwave","Retrowave","VST3","Standalone"],
    about:[
      "VICE CITY is a polyphonic synthwave engine built for producers chasing that sun-drenched, palm-tree-and-chrome Miami sound. Pads, leads, basses and arps — every patch drips with neon nostalgia and modern punch.",
      "Designed and voiced by DJBILBOX BEATS, it ships as a 64-bit VST3 and a standalone app, so you can sketch ideas without even opening your DAW. Plug in, hit a key, and you're already in 1986."
    ],
    features:[
      {icon:"fa-wave-square", t:"Dual-oscillator engine", d:"Detunable analog-modelled oscillators with sub, PWM and unison spread for those huge retro supersaws."},
      {icon:"fa-sliders", t:"FX Chain built in", d:"Gated reverb, tape chorus, analog delay and drive — the full synthwave FX rack baked right into the plug-in."},
      {icon:"fa-music", t:"Curated presets", d:"Ready-to-play leads, dreamy pads, neon basses and plucks — sorted by category so inspiration is one click away."},
      {icon:"fa-gauge-high", t:"Low CPU", d:"Optimised DSP keeps sessions light even when you stack a dozen instances across a track."}
    ],
    specs:[
      {k:"Formats", v:"VST3 · Standalone"},
      {k:"Platform", v:"Windows 10/11 (64-bit)"},
      {k:"Polyphony", v:"Up to 16 voices"},
      {k:"Engine", v:"Dual oscillator + sub, built-in FX chain"},
      {k:"Install", v:"Instant download · drag & drop VST3"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["Vice City VST3 (64-bit)","Vice City Standalone app","Factory preset library","Quick-start PDF"]
  },

  "oriental-instrument-demo": {
    type:"vst", name:"Oriental Instrument — DEMO", sub:"Free 50+ Instruments Sample",
    tagline:"Try Oriental Instrument FREE. 50+ authentic oriental instruments, oud, qanun, ney & saz samples.",
    cover:"img/vst/oriental-instrument-box.jpg", accent:"#e8a33d", accent2:"#c0392b",
    price:"1.99", old:"", badge:"🔥 Deal", code:"",
    note:"50+ instruments sample · Full 280+ version available",
    buy:"oriental-instrument-demo-free-Download", demo:"",
    video:"", poster:"img/vst/oriental-instrument-box.jpg",
    gallery:["assets/products/oriental-instrument/oriental-instrument-poster.jpg",
             "assets/products/oriental-instrument/oriental-instrument-1.jpg",
             "assets/products/oriental-instrument/oriental-instrument-2.jpg"],
    tags:["Oriental","Demo","Free","Win · Mac","Rompler"],
    about:[
      "Get a taste of ORIENTAL INSTRUMENT completely free. This demo includes 50+ authentic oriental instruments including oud, qanun, ney, and saz sounds.",
      "Perfect for testing compatibility, learning the interface, and hearing the quality of our instrument library before purchasing the full version.",
      "No restrictions, no limitations — just pure oriental sound design. Download and start creating with authentic Middle Eastern instruments today."
    ],
    features:[
      {icon:"fa-layer-group", t:"50+ instruments included", d:"A generous selection of authentic oud, qanun, ney, saz, strings and percussion samples to explore."},
      {icon:"fa-wand-magic-sparkles", t:"Real articulations", d:"Slides, ornaments and quarter-tone bends captured from real players for authentic phrasing."},
      {icon:"fa-desktop", t:"Win & Mac", d:"Cross-platform demo — install on your Windows or macOS studio and go."},
      {icon:"fa-tag", t:"No strings attached", d:"Completely free. Try it risk-free before deciding to upgrade to the full 280+ instrument version."}
    ],
    specs:[
      {k:"Formats", v:"VST3 · AU · Standalone"},
      {k:"Platform", v:"Windows 10/11 & macOS (64-bit)"},
      {k:"Content", v:"50+ oriental instruments & sounds (demo)"},
      {k:"Articulations", v:"Slides, ornaments, quarter-tone bends"},
      {k:"Install", v:"Instant download · no registration needed"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["Oriental Instrument Demo (Win + Mac bundle)","50+ instrument samples","Melodic phrase browser (limited)","User manual (PDF)"]
  },

  "oriental-instrument": {
    type:"vst", name:"Oriental Instrument — Full Version", sub:"Arabic & Oriental Rompler — 280+ Instruments",
    tagline:"280+ authentic oriental instruments & sounds in one pro plug-in — oud, qanun, ney, saz, strings & percussion. Full library.",
    cover:"img/vst/oriental-instrument-box.jpg", accent:"#e8a33d", accent2:"#c0392b",
    price:"24.50", old:"49", badge:"🔥 -50%", code:"ORIENTAL50",
    note:"Code ORIENTAL50 · Full 280+ instruments · -50% launch offer",
    buy:"oriental-instrument-djbilbox-beats/ORIENTAL50",
    demo:"oriental-instrument-demo-free-Download",
    video:"media/oriental-demo.mp4", poster:"media/oriental-poster.jpg",
    gallery:["assets/products/oriental-instrument/oriental-instrument-poster.jpg",
             "assets/products/oriental-instrument/oriental-instrument-1.jpg",
             "assets/products/oriental-instrument/oriental-instrument-2.jpg"],
    tags:["Oriental","Arabic","280+ Instruments","Win · Mac","Rompler"],
    about:[
      "ORIENTAL INSTRUMENT puts 280+ authentic oriental instruments and sounds under your fingertips — oud, qanun, ney, saz, oriental strings, brass and live percussion, all multi-sampled and tuned for trap, afro, raï'n'b and cinematic productions. One plug-in, one window, the whole colour of the Middle East.",
      "Browse instruments and phrases from a clean, organised interface, drop a melody in seconds, and bend notes with built-in quarter-tone-friendly articulations for that genuine oriental feel.",
      "Built by DJBILBOX BEATS to be genuinely accessible — a complete 280+ instrument library at a fair price, because a pro oriental sound shouldn't be locked behind a pro budget. Free demo available: try it before you buy."
    ],
    features:[
      {icon:"fa-layer-group", t:"280+ instruments & sounds", d:"A complete oriental library — oud, qanun, ney, saz, strings, brass and percussion — all in a single plug-in window."},
      {icon:"fa-wand-magic-sparkles", t:"Real articulations", d:"Slides, ornaments and quarter-tone bends captured from real players for authentic phrasing."},
      {icon:"fa-folder-open", t:"Loop & melody browser", d:"Hundreds of ready melodic phrases you can audition and drag straight into your beat."},
      {icon:"fa-desktop", t:"Win & Mac", d:"Cross-platform bundle — install on your Windows or macOS studio and go."}
    ],
    specs:[
      {k:"Formats", v:"VST3 · AU · Standalone"},
      {k:"Platform", v:"Windows 10/11 & macOS (64-bit)"},
      {k:"Content", v:"280+ oriental instruments & sounds"},
      {k:"Articulations", v:"Slides, ornaments, quarter-tone bends"},
      {k:"Install", v:"Instant download after purchase"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["Oriental Instrument (Win + Mac bundle) — 280+ instruments & sounds","Multi-sampled instrument library","Melodic phrase browser","Free demo available"]
  },

  /* ===================== SAMPLE KITS ===================== */
  "oriental-vol1": {
    type:"kit", name:"Oriental — Loop Melody Vol.1", sub:"Oriental Melody Loops",
    tagline:"23+ authentic oriental melody loops — oud, qanun, strings ready to flip.",
    cover:"img/packs/oriental-vol1.jpg", accent:"#e8a33d", accent2:"#c0392b",
    price:"5", badge:"🆕 New", buy:"oceljx",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Oriental","Melody Loops","Free"],
    about:[
      "Vol.1 of the Oriental series — 23+ ready-to-flip melody loops featuring authentic oud, qanun, saz and oriental strings. Every loop is professionally performed, recorded and tuned for modern trap, drill, afro and world-music productions.",
      "Drop a loop, layer it with drums, and you've got the foundation of a hit. Free for profit means you can release commercially with zero royalty hassles."
    ],
    features:[
      {icon:"fa-music", t:"Authentic instruments", d:"Real oud, qanun, ney, saz samples performed by professional musicians."},
      {icon:"fa-tag", t:"Labeled & ready", d:"Every loop tagged with key + BPM — drag & drop into your DAW."},
      {icon:"fa-sliders", t:"24-bit hi-fi", d:"44.1kHz / 24-bit WAV for pristine sound in any production."},
      {icon:"fa-unlock", t:"Free for profit", d:"Use in commercial releases, YouTube, Spotify, anywhere."}
    ],
    specs:[
      {k:"Content", v:"23+ oriental melody loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Labeling", v:"Key + BPM in filename"},
      {k:"Tempo range", v:"90–140 BPM"},
      {k:"Price", v:"Free (name-your-price)"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["23+ oriental WAV melody loops","All keys & tempos included","BPM/Key documentation","Works in FL Studio, Ableton, Logic, all DAWs"]
  },

  "vice-city-vol4": {
    type:"kit", name:"Vice City — Drum Loop Vol.4", sub:"Drill · Afrotrap · Synthwave Drums",
    tagline:"Hard-hitting drum loops — neon synthwave bounce meets trap aggression.",
    cover:"img/packs/vice-city-vol4.jpg", accent:"#ff3ca6", accent2:"#37e1ff",
    price:"5", badge:"🆕 New", buy:"pkesp",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Drill","Afrotrap","Synthwave","Free"],
    about:[
      "Vice City Vol.4 delivers full, mix-ready drum loops that blend drill pocket, afrotrap swagger and 80s synthwave spice. Every loop is programmed to lock tight and sound huge with minimal tweaking — just add your 808s and you're halfway to a hit.",
      "No more building drums from scratch. These loops are production-ready, professionally mixed and tuned for modern trap, drill and trap-afro beats."
    ],
    features:[
      {icon:"fa-drum", t:"Full drum patterns", d:"Kicks, snares, hats, percs — complete grooves ready to use."},
      {icon:"fa-bolt", t:"Studio-mixed", d:"Professional EQ and compression baked in — drop & play."},
      {icon:"fa-fire", t:"Trap + Afro energy", d:"Drill bounce meets afrotrap swing with synthwave attitude."},
      {icon:"fa-unlock", t:"Free for profit", d:"Zero royalties — use in any commercial release."}
    ],
    specs:[
      {k:"Content", v:"Full drum loops (drill/afro/synthwave)"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Tempo range", v:"120–160 BPM"},
      {k:"Included", v:"Kicks, snares, hats, percussion"},
      {k:"Price", v:"Free (name-your-price)"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Vice City drum loop collection","Full-mix WAV loops","Professional EQ'd & compressed","Tempo-tagged for quick matching"]
  },

  "futur-melody": {
    type:"kit", name:"Futur — 23 New Melody", sub:"Future Melody Loops",
    tagline:"23 forward-thinking melody loops — synths, plucks, pads for modern trap.",
    cover:"img/packs/futur-melody.jpg", accent:"#7b5cff", accent2:"#37e1ff",
    price:"5", badge:"🆕 New", buy:"fhzxyv",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Future","Melody Loops","Free"],
    about:[
      "The Futur series — 23 brand-new melody loops with a modern, forward-thinking vibe. Bright synth plucks, evolving pads, emotive string leads and experimental textures. Perfect for trap, afro, SoundCloud rap, lofi and pop productions.",
      "Each loop is a complete melodic idea — drop it over drums and you've got the sonic DNA of a track. No need to hunt for chords or spend hours composing."
    ],
    features:[
      {icon:"fa-wand-magic-sparkles", t:"23 unique ideas", d:"Fresh synth plucks, pads, leads and experimental textures."},
      {icon:"fa-sliders", t:"Modern & polished", d:"Professional sound design with depth and character."},
      {icon:"fa-tag", t:"Tempo-matched", d:"All loops labeled with key + BPM for instant drag-and-drop."},
      {icon:"fa-unlock", t:"Free for profit", d:"No royalties, no limits — release everywhere."}
    ],
    specs:[
      {k:"Content", v:"23 future-forward melody loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Instruments", v:"Synths, plucks, pads, strings, textures"},
      {k:"Tempo range", v:"90–140 BPM"},
      {k:"Price", v:"Free (name-your-price)"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["23 Futur melody WAV loops","All synth presets included","Key/BPM/Tempo documentation","Multi-DAW compatibility"]
  },

  "drums-loop-vol1": {
    type:"kit", name:"Drums Loop Vol.1", sub:"Drum Loops Collection",
    tagline:"The essential starter pack — trap, hip-hop, afro grooves ready to layer.",
    cover:"img/packs/drums-loop-vol1.jpg", accent:"#ff2d2d", accent2:"#ff8a3d",
    price:"5", badge:"🆕 New", buy:"czpvfx",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Drums","Loops","Free"],
    about:[
      "Drums Loop Vol.1 — the essential beat-making starter pack. A curated collection of punchy, professional drum grooves covering trap, hip-hop and afro tempos. No boring filler, just solid grooves you'll actually use.",
      "Drop a loop, layer with your one-shots or favorite 808, and you've got a tight rhythm in seconds. Clean mixing means everything fits into a track without extra EQ."
    ],
    features:[
      {icon:"fa-drum", t:"Multi-genre grooves", d:"Trap, hip-hop, afro — all the essentials in one pack."},
      {icon:"fa-bolt", t:"Mix-ready drums", d:"Professional EQ and compression, ready to drop."},
      {icon:"fa-layer-group", t:"Layer-friendly", d:"Clean loops designed to sit under 808s and samples."},
      {icon:"fa-unlock", t:"Free for profit", d:"Use in any commercial release, no royalties."}
    ],
    specs:[
      {k:"Content", v:"Full drum loop collection"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Genres", v:"Trap, hip-hop, afro"},
      {k:"Tempo range", v:"85–150 BPM"},
      {k:"Price", v:"Free (name-your-price)"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Drums Loop Vol.1 WAV pack","15+ versatile grooves","Professional mix & EQ'd","Tempo and genre labeled"]
  },

  "break-ya-neck-vol2": {
    type:"kit", name:"Break Ya Neck — Hip-Hop Vol.2", sub:"Hip-Hop Drum Loops",
    tagline:"Gritty boom-bap grooves — swung, dusty, head-nod factor.",
    cover:"img/packs/break-ya-neck-vol2.jpg", accent:"#d4a017", accent2:"#8a5a00",
    price:"5", badge:"🆕 New", buy:"ntscu",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Hip-Hop","Drum Loops","Free"],
    about:[
      "Break Ya Neck Vol.2 — the boom-bap sequel. Gritty, swung hip-hop and dusty funk drum loops with the kind of groove that makes heads nod involuntarily. Sampled grooves, analog swing and character throughout.",
      "These loops were made for chops, vinyl crackle, Rhodes piano, strings and soulful samples. Perfect for underground hip-hop, boom-bap and instrumental beat tapes."
    ],
    features:[
      {icon:"fa-drum", t:"Authentic boom-bap", d:"Swung, dusty loops with real hip-hop DNA."},
      {icon:"fa-record-vinyl", t:"Sample-friendly", d:"Designed to sit under jazz chops, vinyl textures and soul samples."},
      {icon:"fa-music", t:"Analog character", d:"Tape-colored, warm and characterful sound."},
      {icon:"fa-unlock", t:"Free for profit", d:"No royalties — use in any hip-hop release."}
    ],
    specs:[
      {k:"Content", v:"Hip-hop / boom-bap drum loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Vibe", v:"Dusty, swung, vintage hip-hop"},
      {k:"Tempo range", v:"85–110 BPM"},
      {k:"Price", v:"Free (name-your-price)"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Break Ya Neck Vol.2 WAV loops","All boom-bap grooves","Vinyl and chop-ready","Works in all DAWs"]
  },

  "ziploc-vol3": {
    type:"kit", name:"Ziploc — Blue Pack Vol.3", sub:"Afrotrap · Hip-Hop · Trap",
    tagline:"The Blue Pack — versatile afrotrap & trap sounds, ready to layer.",
    cover:"img/packs/ziploc-vol3.jpg", accent:"#2e86de", accent2:"#37e1ff",
    price:"6", badge:"🆕 New", buy:"ghruf",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Afrotrap","Hip-Hop","Trap","Free"],
    about:[
      "Ziploc Vol.3 — the Blue Pack. A curated grab-bag of afrotrap percussion loops, trap drum hits and hip-hop one-shots. Everything's sealed tight and ready to flip. Mix and match loops from different genres, or pull one-shots to layer under your own drums.",
      "This is the pack for when inspiration is running dry and you need fresh sonic ingredients to spark an idea. All essentials, zero filler."
    ],
    features:[
      {icon:"fa-box-open", t:"Genre-mixed collection", d:"Afrotrap, hip-hop and trap sounds in one pack."},
      {icon:"fa-bolt", t:"Drop & flip instantly", d:"Finished loops or one-shots — choose your path."},
      {icon:"fa-layer-group", t:"Flexible layering", d:"Combine loops from different genres for fresh hybrids."},
      {icon:"fa-unlock", t:"Free for profit", d:"Zero royalties — release on all platforms."}
    ],
    specs:[
      {k:"Content", v:"Afrotrap loops + trap hits + hip-hop one-shots"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Genres", v:"Afrotrap, trap, hip-hop"},
      {k:"Tempo range", v:"95–160 BPM"},
      {k:"Price", v:"Free (name-your-price)"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Ziploc Blue Pack WAV collection","Mixed genre loops","Layerable one-shots","Full genre documentation"]
  },

  /* ===================== PREMIUM KITS (2026) ===================== */
  "tone-vault": {
    type:"kit", name:"TONE VAULT", sub:"Ultimate Instrument One-Shot Kit",
    tagline:"A vault of pro instrument one-shots — keys, plucks, bells, brass, strings & synths, ready to compose.",
    cover:"img/packs/tone-vault.jpg", accent:"#d4a017", accent2:"#7b2ff7",
    price:"15", badge:"🆕 New",
    note:"Instant download · royalty-free",
    buy:"yrkzl",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["One-Shots","Instruments","Melody","WAV"],
    about:[
      "TONE VAULT is the instrument one-shot library every melody-maker needs on their shelf. Instead of loops that box you into someone else's progression, you get clean, individually-tuned single hits — keys, plucks, bells, mallets, brass, strings, guitars and signature synths — so every melody you write is 100% your own.",
      "Each sample is key-labeled, trimmed and mixed to sit in a modern beat with zero cleanup. Load them into your sampler, chop them, layer them and build harmonies that cut through the mix — from emotional trap and R&B to drill, afro and pop.",
      "One purchase, unlimited melodies. Fully royalty-free for your commercial releases."
    ],
    features:[
      {icon:"fa-piano-keyboard", t:"Multi-instrument vault", d:"Keys, plucks, bells, brass, strings, guitars and synth one-shots in one kit."},
      {icon:"fa-key", t:"Key-labeled & tuned", d:"Every hit tagged with its note so you build chords and melodies instantly."},
      {icon:"fa-layer-group", t:"Layer & chop ready", d:"Clean transients and tails — perfect for sampler chopping and stacking."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Use in commercial releases on every platform, no clearance needed."}
    ],
    specs:[
      {k:"Content", v:"Instrument one-shots (multi-category)"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Labeling", v:"Key-tagged filenames"},
      {k:"Use", v:"Melodies, chords, layering, sound design"},
      {k:"Price", v:"$15"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["TONE VAULT one-shot library","Key-labeled WAV samples","Multi-instrument categories","Works in all DAWs & samplers"]
  },

  "void-signals": {
    type:"kit", name:"VOID SIGNALS", sub:"19GB SFX & Cinematic Sound Design Suite",
    tagline:"A massive 19GB cinematic arsenal — risers, impacts, drones, textures & FX (feat. Boom Library).",
    cover:"img/packs/void-signals.jpg", accent:"#37e1ff", accent2:"#7b5cff",
    price:"30", badge:"🔊 19GB",
    note:"19GB · feat. Boom Library · royalty-free",
    buy:"mkijdn",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["SFX","Cinematic","Sound Design","19GB"],
    about:[
      "VOID SIGNALS is a professional-grade, 19GB sound design suite built for producers, film composers, trailer editors and beatmakers who want cinematic weight. Featuring content from the industry-standard Boom Library, it delivers risers, downshifters, braams, impacts, whooshes, drones, atmospheres, glitches and organic textures — the exact toolkit used on modern trailers and games.",
      "Whether you're scoring a short film, designing transitions for a beat, or adding tension to a drop, VOID SIGNALS gives you broadcast-quality sources that instantly raise your production value. Everything is recorded and mastered at high resolution for maximum flexibility.",
      "A serious library at an unbeatable price — 19GB of cinematic power, royalty-free."
    ],
    features:[
      {icon:"fa-clapperboard", t:"Cinematic arsenal", d:"Risers, impacts, braams, whooshes, drones, atmospheres and textures."},
      {icon:"fa-industry", t:"Feat. Boom Library", d:"Content from the industry-standard sound-design house used on films & games."},
      {icon:"fa-database", t:"19GB of content", d:"A massive collection covering trailers, transitions, tension and ambience."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Cleared for commercial music, film, video and game projects."}
    ],
    specs:[
      {k:"Content", v:"Cinematic SFX & sound-design suite"},
      {k:"Size", v:"19 GB"},
      {k:"Format", v:"High-resolution WAV"},
      {k:"Sources", v:"Featuring Boom Library"},
      {k:"Price", v:"$30"},
      {k:"License", v:"Royalty-free for music, film & games"}
    ],
    includes:["19GB cinematic SFX suite","Risers, impacts, drones & textures","Boom Library-sourced content","Trailer & game-ready sound design"]
  },

  "ghost-voice": {
    type:"kit", name:"GHOST VOICE", sub:"Premium Vocal Hooks, Chops & Acapellas",
    tagline:"Studio-recorded vocal hooks, chops, adlibs & acapellas — drop them in and instantly humanize your beats.",
    cover:"img/packs/ghost-voice.jpg", accent:"#ff3ca6", accent2:"#7b5cff",
    price:"20", badge:"🆕 New",
    note:"Dry & wet · key & BPM labeled · royalty-free",
    buy:"fnpdxf",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Vocals","Acapellas","Hooks","Chops"],
    about:[
      "GHOST VOICE is a premium vocal toolkit that instantly adds a human, radio-ready top line to your instrumentals. Inside you'll find full hooks, catchy phrases, chopped syllables, adlibs and clean acapellas — professionally recorded, tuned and mixed to sit on top of any beat.",
      "Perfect for trap, R&B, afro, drill, house and pop, the vocals are labeled by key and BPM so they lock to your project in seconds. Chop them, pitch them, reverse them or run them through your FX chain to create hooks and vocal textures nobody else has.",
      "Turn instrumentals into finished songs — royalty-free, no features to clear."
    ],
    features:[
      {icon:"fa-microphone-lines", t:"Hooks, chops & adlibs", d:"Full phrases, syllable chops and adlibs to build catchy top lines."},
      {icon:"fa-key", t:"Key & BPM labeled", d:"Every vocal tagged so it snaps to your project instantly."},
      {icon:"fa-wand-magic-sparkles", t:"Dry & processed", d:"Clean takes ready for your own tuning, FX and creative chopping."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Release commercially with no features or samples to clear."}
    ],
    specs:[
      {k:"Content", v:"Vocal hooks, chops, adlibs & acapellas"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Labeling", v:"Key + BPM in filename"},
      {k:"Styles", v:"Trap, R&B, afro, drill, house, pop"},
      {k:"Price", v:"$20"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["Vocal hooks & full phrases","Chopped syllables & adlibs","Clean acapellas","Key/BPM documentation"]
  },

  "raw-elements": {
    type:"kit", name:"RAW ELEMENTS", sub:"Ultimate One-Shot Drum Kit",
    tagline:"Hard, clean drum one-shots — punchy kicks, cracking snares, crisp hats & knocking 808s.",
    cover:"img/packs/raw-elements.jpg", accent:"#ff2d2d", accent2:"#ff8a3d",
    price:"10", badge:"🆕 New",
    note:"Punchy · mix-ready · royalty-free",
    buy:"pohwt",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Drums","One-Shots","808","Trap"],
    about:[
      "RAW ELEMENTS is the only one-shot drum kit you need to build hard-knocking beats from scratch. Punchy kicks, cracking snares, tight rimshots, crisp hats, percussion and deep, tuned 808s — every hit is processed, transient-shaped and mixed to hit hard in a modern trap, drill or hip-hop production.",
      "No more digging through cluttered folders of unusable samples. Every drum here is a keeper, organized by type and ready to drag straight onto your pattern. Layer the kicks with the 808s and you've got a low end that translates on every system.",
      "Build your own drum patterns, keep your sound original, and release royalty-free."
    ],
    features:[
      {icon:"fa-drum", t:"Complete drum arsenal", d:"Kicks, snares, claps, rims, hats, percussion and tuned 808s."},
      {icon:"fa-bolt", t:"Punchy & mix-ready", d:"Transient-shaped and EQ'd to hit hard with no extra processing."},
      {icon:"fa-layer-group", t:"Layer-friendly", d:"Designed to stack — pair kicks with 808s for a translating low end."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Use in commercial releases with zero clearance."}
    ],
    specs:[
      {k:"Content", v:"One-shot drums + 808s"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Included", v:"Kicks, snares, claps, hats, perc, 808s"},
      {k:"Styles", v:"Trap, drill, hip-hop"},
      {k:"Price", v:"$10"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["One-shot drum library","Tuned 808 collection","Kicks, snares, hats & percussion","Organized & mix-ready"]
  },

  "vinyl-breaker": {
    type:"kit", name:"VINYL BREAKER", sub:"Scratch & Hip-Hop Vinyl Sample Kit",
    tagline:"Dusty vinyl scratches, crackle, chops & textures — authentic boom-bap character in one kit.",
    cover:"img/packs/vinyl-breaker.jpg", accent:"#d4a017", accent2:"#8a5a00",
    price:"5", badge:"🆕 New",
    note:"Authentic vinyl character · royalty-free",
    buy:"yecrn",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Vinyl","Hip-Hop","Scratch","Boom-Bap"],
    about:[
      "VINYL BREAKER bottles the sound of the crate. Real turntable scratches, vinyl crackle, dusty chops, tape hiss and analog textures give your beats that unmistakable boom-bap and lo-fi character that plug-ins can never quite fake.",
      "Sprinkle crackle under a melody, drop a scratch on the hook, or chop the vinyl stabs into your own flip. Every sample is recorded from real records and hardware for genuine warmth and grit — the secret weapon behind classic hip-hop and lo-fi.",
      "An incredible value at $5 — instant vintage soul, royalty-free."
    ],
    features:[
      {icon:"fa-record-vinyl", t:"Real turntable scratches", d:"DJ-performed scratches and cuts recorded straight from wax."},
      {icon:"fa-compact-disc", t:"Crackle & texture", d:"Vinyl crackle, tape hiss and analog noise for instant vintage warmth."},
      {icon:"fa-scissors", t:"Dusty chops & stabs", d:"Sampled vinyl hits ready to flip into your own progressions."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Release commercially with no samples to clear."}
    ],
    specs:[
      {k:"Content", v:"Scratches, crackle, chops & textures"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Vibe", v:"Boom-bap, lo-fi, vintage hip-hop"},
      {k:"Source", v:"Recorded from real vinyl & hardware"},
      {k:"Price", v:"$5"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["Turntable scratch library","Vinyl crackle & texture loops","Dusty vinyl chops & stabs","Boom-bap & lo-fi ready"]
  },

  "neon-pulse": {
    type:"kit", name:"NEON PULSE", sub:"House, Techno & Progressive Pro Drum Loops",
    tagline:"Club-ready drum loops for House, Techno & Progressive — locked, punchy and mix-ready.",
    cover:"img/packs/neon-pulse.jpg", accent:"#1DB954", accent2:"#37e1ff",
    price:"10", badge:"🆕 New",
    note:"Club-ready · tempo-labeled · royalty-free",
    buy:"argerk",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["House","Techno","Progressive","Drum Loops"],
    about:[
      "NEON PULSE delivers the engine room of modern electronic music: tight, hypnotic drum loops built for House, Techno and Progressive. Rolling kicks, crisp hats, driving percussion and full groove loops give your track the relentless, dancefloor-ready pulse that keeps a club moving.",
      "Every loop is professionally programmed and mixed, tempo-labeled and ready to drop into your DAW. Use full grooves to sketch fast, or layer the individual percussion loops to craft your own signature rhythm section.",
      "Studio-quality drums for producers who take the dancefloor seriously — royalty-free."
    ],
    features:[
      {icon:"fa-compact-disc", t:"Club-ready grooves", d:"Full drum loops built for House, Techno and Progressive energy."},
      {icon:"fa-drum", t:"Layerable elements", d:"Kick, hat and percussion loops to build your own rhythm section."},
      {icon:"fa-gauge-high", t:"Tempo-labeled", d:"BPM-tagged loops that lock to your project instantly."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Use in commercial releases and DJ sets, no clearance."}
    ],
    specs:[
      {k:"Content", v:"House / Techno / Progressive drum loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Tempo range", v:"120–135 BPM"},
      {k:"Included", v:"Full grooves + layerable perc loops"},
      {k:"Price", v:"$10"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["House/Techno/Progressive drum loops","Full grooves + element loops","Studio-mixed & tempo-labeled","Works in all DAWs"]
  },

  "concrete-vault": {
    type:"kit", name:"CONCRETE VAULT", sub:"HipHop, Trap & Drill Pro Drum Loops",
    tagline:"Hard-hitting drum loops for HipHop, Trap & Drill — pocket, bounce and aggression.",
    cover:"img/packs/concrete-vault.jpg", accent:"#8895a7", accent2:"#ff2d2d",
    price:"10", badge:"🆕 New",
    note:"Pro loops · tempo-labeled · royalty-free",
    buy:"ecrmh",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Trap","Drill","Hip-Hop","Drum Loops"],
    about:[
      "CONCRETE VAULT is a hard-hitting collection of drum loops engineered for HipHop, Trap and Drill. From rolling drill hats and sliding 808 patterns to hard trap bounces and classic hip-hop pockets, these grooves give your beat instant attitude and a professional rhythmic foundation.",
      "Each loop is programmed by ear, mixed and tempo-labeled so you can drop it in and start writing immediately. Use the full patterns to build fast, or pull the hat and percussion loops to add complex, radio-ready flair to your own drums.",
      "The rhythmic backbone for your next street anthem — royalty-free."
    ],
    features:[
      {icon:"fa-drum", t:"HipHop, Trap & Drill", d:"Full drum patterns covering pocket, bounce and drill aggression."},
      {icon:"fa-bolt", t:"Rolling hi-hats", d:"Complex, triplet and drill-style hat loops ready to drop in."},
      {icon:"fa-gauge-high", t:"Tempo-labeled", d:"BPM-tagged loops that lock straight to your session."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Use in commercial releases with zero clearance."}
    ],
    specs:[
      {k:"Content", v:"HipHop / Trap / Drill drum loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Tempo range", v:"120–150 BPM"},
      {k:"Included", v:"Full grooves + hat & perc loops"},
      {k:"Price", v:"$10"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["HipHop/Trap/Drill drum loops","Full patterns + hat loops","Studio-mixed & tempo-labeled","Works in all DAWs"]
  },

  "westcoast-chrome": {
    type:"kit", name:"WESTCOAST CHROME", sub:"G-Funk & West Coast Pro Drum Loops",
    tagline:"Laid-back G-Funk & West Coast drum grooves — that classic lowrider bounce.",
    cover:"img/packs/westcoast-chrome.jpg", accent:"#2e86de", accent2:"#b06cff",
    price:"10", badge:"🆕 New",
    note:"West-Coast bounce · tempo-labeled · royalty-free",
    buy:"seuyup",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["G-Funk","West Coast","Drum Loops","Hip-Hop"],
    about:[
      "WESTCOAST CHROME captures the sun-soaked swing of G-Funk and classic West Coast hip-hop. Laid-back kicks, snappy snares, shakers and that unmistakable head-nod bounce give your beats the smooth, lowrider-ready groove made famous on the West Coast.",
      "Perfect paired with a whiny lead synth and a fat bassline, these loops are programmed with real swing and mixed to sit warm and clean. Drop a full groove and instantly transport your track to a Cali summer, or layer the percussion for your own twist.",
      "Everything you need for that timeless West-Coast feel — royalty-free."
    ],
    features:[
      {icon:"fa-drum", t:"G-Funk grooves", d:"Laid-back, swung drum loops with authentic West-Coast bounce."},
      {icon:"fa-car-side", t:"Lowrider feel", d:"Smooth pockets tailor-made to pair with G-funk leads and 808 bass."},
      {icon:"fa-gauge-high", t:"Tempo-labeled", d:"BPM-tagged loops that lock straight to your session."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Use in commercial releases with zero clearance."}
    ],
    specs:[
      {k:"Content", v:"G-Funk / West Coast drum loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Tempo range", v:"85–105 BPM"},
      {k:"Included", v:"Full grooves + percussion loops"},
      {k:"Price", v:"$10"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["G-Funk/West Coast drum loops","Full grooves + perc loops","Swung, studio-mixed pockets","Works in all DAWs"]
  },

  "etnic-ritmik": {
    type:"kit", name:"ETNIC RITMIK", sub:"Afrobeat & Reggae Pro Drum Loops Vol.1",
    tagline:"Live-feel Afrobeat & Reggae drum grooves — organic percussion and infectious rhythm.",
    cover:"img/packs/etnic-ritmik.jpg", accent:"#1DB954", accent2:"#ffcf33",
    price:"10", badge:"🆕 New",
    note:"Organic groove · tempo-labeled · royalty-free",
    buy:"fkodxs",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Afrobeat","Reggae","Percussion","Drum Loops"],
    about:[
      "ETNIC RITMIK Vol.1 brings warm, organic rhythm to your productions with authentic Afrobeat and Reggae drum grooves. Congas, shakers, live-feel kicks, rim clicks and layered percussion deliver the infectious, danceable pulse at the heart of afro, dancehall and reggae music.",
      "Every loop is crafted with real swing and human feel, mixed clean and tempo-labeled for instant use. Drop a full groove under a melody and your track instantly grooves; layer the percussion loops to build rich, polyrhythmic patterns of your own.",
      "The rhythmic soul of Afrobeat and Reggae in one kit — royalty-free."
    ],
    features:[
      {icon:"fa-drum", t:"Afrobeat & Reggae grooves", d:"Live-feel full drum loops with authentic afro & reggae swing."},
      {icon:"fa-hands", t:"Organic percussion", d:"Congas, shakers, rim clicks and layered perc for real groove."},
      {icon:"fa-gauge-high", t:"Tempo-labeled", d:"BPM-tagged loops that lock straight to your session."},
      {icon:"fa-unlock", t:"Royalty-free", d:"Use in commercial releases with zero clearance."}
    ],
    specs:[
      {k:"Content", v:"Afrobeat / Reggae drum & perc loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Tempo range", v:"95–120 BPM"},
      {k:"Included", v:"Full grooves + percussion loops"},
      {k:"Price", v:"$10"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["Afrobeat & Reggae drum loops","Organic percussion loops","Live-feel, tempo-labeled grooves","Works in all DAWs"]
  }

};
