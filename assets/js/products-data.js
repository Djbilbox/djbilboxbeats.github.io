/* ============================================================
   DJBILBOX BEATS — Full product catalog (detail pages)
   Drives product.html?id=<slug>. One entry per VST / sample kit.
   `video` = YouTube playlist id used as the muted hero background.
   `buy`   = Gumroad slug (append /PROMOCODE to auto-apply a deal).
   ============================================================ */
window.PRODUCTS = {

  /* ===================== VST PLUGINS ===================== */
  "vice-city": {
    type:"vst", name:"Vice City", sub:"Virtual Polyphonic Synthesizer",
    tagline:"Neon-soaked 80s synthwave in a single plug-in — VST3 & Standalone.",
    cover:"img/vst/vice-city-vst.jpg", accent:"#ff3ca6", accent2:"#37e1ff",
    price:"18.45", old:"36.90", badge:"-50%", code:"VICECITY50",
    note:"Code VICECITY50 · Until Jul 31, 2026",
    buy:"ykdzli/VICECITY50", demo:"",
    video:"PLbtcZhy947NV5MzDssQ511txw0IHAp0pZ",
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

  "oriental-instrument": {
    type:"vst", name:"Oriental Instrument", sub:"Arabic & Oriental Rompler",
    tagline:"Authentic oud, qanun, ney, strings & percussion — one pro instrument.",
    cover:"img/vst/oriental-instrument-box.jpg", accent:"#e8a33d", accent2:"#c0392b",
    price:"24.50", old:"49", badge:"-50%", code:"ORIENTAL50",
    note:"Code ORIENTAL50 · Until Jul 31, 2026",
    buy:"oriental-instrument-djbilbox-beats/ORIENTAL50",
    demo:"oriental-instrument-demo-free-Download",
    video:"m7jGEmFAMHM",
    tags:["Oriental","Arabic","Win · Mac","Rompler"],
    about:[
      "ORIENTAL INSTRUMENT puts the heart of the Middle East under your fingertips. Multi-sampled oud, qanun, ney, saz, oriental strings and live percussion — recorded and tuned for trap, afro, raï'n'b and cinematic productions.",
      "Browse instruments and phrases from a clean, organised interface, drop a melody in seconds, and bend notes with built-in quarter-tone-friendly articulations for that genuine oriental feel."
    ],
    features:[
      {icon:"fa-layer-group", t:"Multi-instrument library", d:"Oud, qanun, ney, saz, strings, brass and percussion — switch between them from one plug-in window."},
      {icon:"fa-wand-magic-sparkles", t:"Real articulations", d:"Slides, ornaments and quarter-tone bends captured from real players for authentic phrasing."},
      {icon:"fa-folder-open", t:"Loop & melody browser", d:"Hundreds of ready melodic phrases you can audition and drag straight into your beat."},
      {icon:"fa-desktop", t:"Win & Mac", d:"Cross-platform bundle — install on your Windows or macOS studio and go."}
    ],
    specs:[
      {k:"Formats", v:"VST3 · AU · Standalone"},
      {k:"Platform", v:"Windows 10/11 & macOS (64-bit)"},
      {k:"Content", v:"Multi-sampled oriental instruments + phrases"},
      {k:"Articulations", v:"Slides, ornaments, quarter-tone bends"},
      {k:"Install", v:"Instant download after purchase"},
      {k:"License", v:"Royalty-free for your productions"}
    ],
    includes:["Oriental Instrument (Win + Mac bundle)","Multi-sampled instrument library","Melodic phrase browser","Free demo available"]
  },

  /* ===================== SAMPLE KITS ===================== */
  "oriental-vol1": {
    type:"kit", name:"Oriental — Loop Melody Vol.1", sub:"Oriental Melody Loops",
    tagline:"23+ oriental melody loops to start your next trap-oriental banger.",
    cover:"img/packs/oriental-vol1.jpg", accent:"#e8a33d", accent2:"#c0392b",
    price:"FREE", badge:"FREE", buy:"oceljx",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Oriental","Melody Loops","Free"],
    about:[
      "A pack of ready-to-flip oriental melody loops — oud, strings and ethnic leads tuned for trap, drill and afro productions. Each loop is key- and BPM-labelled so you can drop it straight onto your grid.",
      "Free for profit: chop them, layer them and release your beats with no royalties owed."
    ],
    features:[
      {icon:"fa-music", t:"Melody loops", d:"Oriental oud, qanun and string melodies ready to chop and pitch."},
      {icon:"fa-tag", t:"Key & BPM labelled", d:"Every loop named with its key and tempo for instant arranging."},
      {icon:"fa-unlock", t:"Free for profit", d:"Use them in your commercial releases — name your price (€0+)."}
    ],
    specs:[
      {k:"Content", v:"23+ oriental melody loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Labelled", v:"Key + BPM in filenames"},
      {k:"Price", v:"Free / name-your-price"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["23+ oriental WAV loops","Key & BPM tagged filenames","Compatible with any DAW"]
  },

  "vice-city-vol4": {
    type:"kit", name:"Vice City — Drum Loop Vol.4", sub:"Drill · Afrotrap · Synthwave Drums",
    tagline:"Hard-hitting drum loops with that neon Vice City attitude.",
    cover:"img/packs/vice-city-vol4.jpg", accent:"#ff3ca6", accent2:"#37e1ff",
    price:"FREE", badge:"FREE", buy:"pkesp",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Drill","Afrotrap","Synthwave","Free"],
    about:[
      "Vol.4 of the Vice City series — full drum loops blending drill bounce, afrotrap energy and 80s synthwave flavour. Drop a loop, add your 808 and the groove is done.",
      "Perfect for producers who want pro drum patterns without programming every hat from scratch."
    ],
    features:[
      {icon:"fa-drum", t:"Full drum loops", d:"Programmed grooves mixing drill, afrotrap and retro percussion."},
      {icon:"fa-bolt", t:"Mix-ready", d:"Punchy, balanced loops that sit in the mix straight away."},
      {icon:"fa-unlock", t:"Free for profit", d:"Royalty-free for your commercial beats."}
    ],
    specs:[
      {k:"Content", v:"Drum loops (drill / afro / synthwave)"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Price", v:"Free / name-your-price"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Vice City drum loop collection","WAV stems ready to drop","Works in any DAW"]
  },

  "futur-melody": {
    type:"kit", name:"Futur — 23 New Melody", sub:"Future Melody Loops",
    tagline:"23 forward-thinking melody loops for futuristic trap & afro.",
    cover:"img/packs/futur-melody.jpg", accent:"#7b5cff", accent2:"#37e1ff",
    price:"FREE", badge:"FREE", buy:"fhzxyv",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Future","Melody Loops","Free"],
    about:[
      "23 brand-new melody loops with a modern, futuristic edge — bright plucks, evolving pads and emotive leads for trap, afro and pop productions.",
      "Each loop is a finished idea you can build a beat around in minutes."
    ],
    features:[
      {icon:"fa-music", t:"23 melody loops", d:"Fresh, modern melodic ideas ready to flip."},
      {icon:"fa-tag", t:"Key & BPM labelled", d:"Arrange faster with tagged filenames."},
      {icon:"fa-unlock", t:"Free for profit", d:"Use in your releases royalty-free."}
    ],
    specs:[
      {k:"Content", v:"23 melody loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Price", v:"Free / name-your-price"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["23 future melody WAV loops","Key & BPM tagged","Any-DAW compatible"]
  },

  "drums-loop-vol1": {
    type:"kit", name:"Drums Loop Vol.1", sub:"Drum Loops Collection",
    tagline:"The essential drum loop starter pack — clean, punchy, ready.",
    cover:"img/packs/drums-loop-vol1.jpg", accent:"#ff2d2d", accent2:"#ff8a3d",
    price:"FREE", badge:"FREE", buy:"czpvfx",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Drums","Loops","Free"],
    about:[
      "Vol.1 of the DJBILBOX drum loop series — a versatile set of grooves covering trap, hip-hop and afro. The fast way to lay a solid rhythmic foundation.",
      "Layer them with your one-shots or use them as-is to lock a vibe instantly."
    ],
    features:[
      {icon:"fa-drum", t:"Versatile grooves", d:"Loops spanning trap, hip-hop and afro tempos."},
      {icon:"fa-bolt", t:"Punchy & clean", d:"Mixed to drop straight into your session."},
      {icon:"fa-unlock", t:"Free for profit", d:"Royalty-free for commercial use."}
    ],
    specs:[
      {k:"Content", v:"Drum loop collection"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Price", v:"Free / name-your-price"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Drum loop WAV pack","Multi-genre grooves","Works in any DAW"]
  },

  "break-ya-neck-vol2": {
    type:"kit", name:"Break Ya Neck — Hip-Hop Vol.2", sub:"Hip-Hop Drum Loops",
    tagline:"Boom-bap & hip-hop drum loops with serious head-nod factor.",
    cover:"img/packs/break-ya-neck-vol2.jpg", accent:"#d4a017", accent2:"#8a5a00",
    price:"FREE", badge:"FREE", buy:"ntscu",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Hip-Hop","Drum Loops","Free"],
    about:[
      "Vol.2 of Break Ya Neck — gritty, swung hip-hop and boom-bap drum loops with the kind of groove that makes heads nod from bar one.",
      "Dusty, characterful and ready for sampling-style productions."
    ],
    features:[
      {icon:"fa-drum", t:"Boom-bap grooves", d:"Swung, dusty loops with vintage hip-hop character."},
      {icon:"fa-record-vinyl", t:"Sample-ready", d:"Perfect under chops, vinyl crackle and Rhodes lines."},
      {icon:"fa-unlock", t:"Free for profit", d:"Royalty-free for your releases."}
    ],
    specs:[
      {k:"Content", v:"Hip-hop / boom-bap drum loops"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Price", v:"Free / name-your-price"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Hip-hop drum loop pack","Swung boom-bap grooves","Any-DAW compatible"]
  },

  "ziploc-vol3": {
    type:"kit", name:"Ziploc — Blue Pack Vol.3", sub:"Afrotrap · Hip-Hop · Trap",
    tagline:"The Blue Pack — afrotrap & trap loops sealed and ready to flip.",
    cover:"img/packs/ziploc-vol3.jpg", accent:"#2e86de", accent2:"#37e1ff",
    price:"FREE", badge:"FREE", buy:"ghruf",
    video:"PLbtcZhy947NWd96DYzVDRNHYX846jE9zr",
    tags:["Afrotrap","Hip-Hop","Trap","Free"],
    about:[
      "Vol.3 of the Ziploc series — the Blue Pack — a mixed bag of afrotrap, hip-hop and trap loops and one-shots, sealed tight and ready to flip into your next hit.",
      "A go-to grab-bag when you need fresh sounds fast."
    ],
    features:[
      {icon:"fa-box-open", t:"Mixed grab-bag", d:"Loops and one-shots across afrotrap, hip-hop and trap."},
      {icon:"fa-bolt", t:"Ready to flip", d:"Drop-in sounds to jump-start a beat in seconds."},
      {icon:"fa-unlock", t:"Free for profit", d:"Royalty-free for commercial productions."}
    ],
    specs:[
      {k:"Content", v:"Afrotrap / trap loops & one-shots"},
      {k:"Format", v:"WAV · 44.1kHz / 24-bit"},
      {k:"Price", v:"Free / name-your-price"},
      {k:"License", v:"Free for profit"}
    ],
    includes:["Ziploc Blue Pack samples","Loops + one-shots","Works in any DAW"]
  }

};
