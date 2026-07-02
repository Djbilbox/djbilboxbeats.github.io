/* ============================================================
   DJBILBOX BEATS — Full product catalog (detail pages)
   Drives product.html?id=<slug>. One entry per VST / sample kit.
   `video` = YouTube playlist id used as the muted hero background.
   `buy`   = Gumroad slug (append /PROMOCODE to auto-apply a deal).
   ============================================================ */
window.PRODUCTS = {

  /* ===================== VST PLUGINS ===================== */
  "bigbass": {
    type:"vst", name:"BIGBASS", sub:"LA Lowrider Bass Synthesizer",
    tagline:"West-Coast lowrider bass in one plug-in — 6 real bass engines, 80 presets, VST3 & Standalone for Win & Mac.",
    cover:"img/vst/bigbass-vst.jpg", accent:"#ffcf33", accent2:"#7b2ff7",
    price:"19.50", old:"39", badge:"-50%", code:"BIGBASS50",
    note:"Code BIGBASS50 · Offre de lancement -50%",
    buy:"xaziro/BIGBASS50", demo:"",
    video:"media/bigbass-promo.mp4", poster:"img/vst/bigbass-vst.jpg",
    tags:["Lowrider Bass","G-Funk","VST3","Standalone","Win · Mac"],
    about:[
      "BIGBASS is a Los Angeles lowrider bass synthesizer built for trap, G-funk, drill and West-Coast producers. Behind its chrome-and-gold Pioneer-style faceplate sits a serious sound engine: six real, pitch-detected bass sources — SUB, SLAM, PUNCH, GROWL, SCREAM and DOOM — so every preset hits with its own character instead of the same tired 808.",
      "Eighty factory presets are organised around an LA theme — Los Santos, Lakers and Los Angeles — each one ready to drop into a beat. Shape the sound with glide, a 24 dB filter with envelope, full ADSR, drive and an FX chain (reverb, delay, distortion), all driven by animated chrome lowrider-spinner knobs. Play a note and the candy-purple Cadillac on screen hits the hydraulics.",
      "Ships as a 64-bit VST3 plug-in and a standalone app for both Windows and macOS. Instant download, unlocked with your personal serial key."
    ],
    features:[
      {icon:"fa-wave-square", t:"6 real bass engines", d:"SUB, SLAM, PUNCH, GROWL, SCREAM & DOOM — real pitch-detected bass sources, not one recycled 808."},
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
      {k:"Engine", v:"6 sampled bass modes + filter, ADSR, FX chain"},
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
    price:"18.45", old:"36.90", badge:"-50%", code:"VICECITY50",
    note:"Code VICECITY50 · Until Jul 31, 2026",
    buy:"ykdzli/VICECITY50", demo:"",
    video:"0dEw1R8ze4I",
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
    video:"media/oriental-demo.mp4", poster:"media/oriental-poster.jpg",
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
    tagline:"23+ authentic oriental melody loops — oud, qanun, strings ready to flip.",
    cover:"img/packs/oriental-vol1.jpg", accent:"#e8a33d", accent2:"#c0392b",
    price:"FREE", badge:"FREE", buy:"oceljx",
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
    price:"FREE", badge:"FREE", buy:"pkesp",
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
    price:"FREE", badge:"FREE", buy:"fhzxyv",
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
    price:"FREE", badge:"FREE", buy:"czpvfx",
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
    price:"FREE", badge:"FREE", buy:"ntscu",
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
    price:"FREE", badge:"FREE", buy:"ghruf",
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
  }

};
