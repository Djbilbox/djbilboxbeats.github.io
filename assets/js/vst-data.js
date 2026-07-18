/* ============================================================
   DJBILBOX BEATS — VST plugins catalog
   `buy`  : Gumroad product slug (after /l/) or full URL — paid product.
            "/SOLDES80" appended = -80% Summer Sale auto-applies at checkout.
   `demo` : Gumroad slug/URL for the free demo (optional)
   `note` : Short promo line shown on the card (🎟️ added automatically)
   `old`  : struck-through original price (EUR). `price` = current sale price.
   Sale valid until 30 July 2026 (code SOLDES80).
   ============================================================ */
window.VSTS = [
  /* ========== BUNDLE ========== */
  { id:"all-vst-pack", name:"🎁 ALL VST PACK — Every VST in One", img:"img/vst/all-vst-pack.jpg", category:"bundle",
    tags:["Oriental Instrument · Machina","Matrix · BigBass · Vice City","5 VSTs in 1 pack"], price:"34.60", old:"173", badge:"🔥 -80%",
    buy:"", demo:"",
    note:"Code SOLDES80 · All 5 VSTs (total value €173) · Best deal" },

  /* ========== EFFECTS ========== */
  { id:"machina", name:"MACHINA EFFECT — Energy Drink for Your Sound", img:"img/vst/machina-vst.jpg", category:"effect",
    tags:["Distortion · Delay · Filter","VST3 · AU · Win/Mac"], price:"3.60", old:"18", badge:"🔥 -80%",
    buy:"lbceu/SOLDES80", demo:"",
    note:"Code SOLDES80 · -80% Summer Sale" },

  { id:"matrix-modular", name:"MATRIX MODULAR — Westcoast Oriental VST Effect", img:"img/vst/matrix-modular-cover.jpg", category:"effect",
    tags:["Stereo Modulation · Auto-Pan","VST3 · Standalone"], price:"3.60", old:"18", badge:"🔥 -80%",
    buy:"ocpoej/SOLDES80", demo:"",
    note:"Code SOLDES80 · -80% Summer Sale" },

  /* ========== INSTRUMENTS ========== */
  { id:"oriental-instrument", name:"Oriental Instrument — Full Version (280+ Instruments)", img:"img/vst/oriental-instrument-box.jpg", category:"instrument",
    tags:["280+ Instruments","Oriental · Maqam Engine","Win · Mac"], price:"13.80", old:"69", badge:"🔥 -80%",
    buy:"oriental-instrument-djbilbox-beats/SOLDES80",
    demo:"oriental-instrument-demo-free-Download",
    thumb:"assets/products/oriental-instrument/oriental-instrument-card.jpg",
    note:"Code SOLDES80 · Full 280+ instruments · -80% Summer Sale" },

  { id:"bigbass", name:"BIGBASS — LA Lowrider Bass", img:"img/vst/bigbass-vst.jpg", category:"instrument",
    tags:["Lowrider Bass","VST3 · Standalone · Win/Mac"], price:"5.80", old:"29", badge:"🔥 -80%",
    buy:"xaziro/SOLDES80", demo:"",
    note:"Code SOLDES80 · 808 · 3 bass modes · -80% Summer Sale" },

  { id:"vice-city", name:"Vice City — VST Synthesizer", img:"img/vst/vice-city-vst.jpg", category:"instrument",
    tags:["Synthwave","VST3 · Standalone"], price:"7.80", old:"39", badge:"🔥 -80%",
    buy:"ykdzli/SOLDES80", demo:"",
    thumb:"assets/products/vice-city/vice-city-card.jpg",
    preview:"assets/products/vice-city/vice-city-card.mp4",
    note:"Code SOLDES80 · 70 presets · -80% Summer Sale" },

  /* ========== PARTNER / AFFILIATE (external checkout) ========== */
  { name:"🦍 APESHYT RAMPAGE — Unleash The Beast", img:"img/vst/apeshyt-rampage.svg", category:"instrument",
    tags:["Aggressive Synth","+ Rebellion Melody Loops ($39)"], price:"~$", badge:"🤝 Partner",
    url:"https://apeshyt808.com/ape-rampage/",
    note:"Official partner · BONUS: Rebellion Melody Loops Pack included" },

  { name:"🍊 FL STUDIO — Producer Edition", img:"img/vst/fl-studio.svg", category:"instrument",
    tags:["The DAW I use","Lifetime free updates"], price:"~€", badge:"🤝 Partner",
    url:"https://www.image-line.com/fl-studio/",
    note:"Code DJBILBOX · The DAW behind every DJBILBOX beat" },

  { name:"🎛️ SERUM 2 & Premium Plugins", img:"img/vst/free-effects.svg", category:"instrument",
    tags:["Serum 2 · Auto-Tune · more","Best deals via ProducerSources"], price:"~€", badge:"🤝 Partner",
    url:"https://producersources.com",
    note:"Code DJBILBOX · Premium plugins at partner prices" },

  /* ========== FREE DOWNLOADS ========== */
  { name:"🎁 FREE VST INSTRUMENTS PACK", img:"img/vst/free-instruments.svg", category:"instrument",
    tags:["Vital · Zebralette · MG-1","Drum8 · 4 free synths"], price:"0", free:true, badge:"✅ FREE",
    url:"studio-setup.html#free",
    note:"Vital, Zebralette, Surrealistic MG-1 Plus & Drum8 — 100% free" },

  { name:"🎁 FREE FX EFFECTS PACK", img:"img/vst/free-effects.svg", category:"effect",
    tags:["OTT · CamelCrusher · Valhalla","Graillon · MAutoPitch · 11 free FX"], price:"0", free:true, badge:"✅ FREE",
    url:"studio-setup.html#free",
    note:"OTT, CamelCrusher, Valhalla, Graillon 3 & more — 100% free" },
];
