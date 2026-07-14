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
  { id:"all-vst-pack", name:"🎁 ALL VST PACK — Every VST in One", img:"img/vst/free-bundle.jpg", category:"bundle",
    tags:["Oriental Instrument · Machina","Matrix · BigBass · Vice City","5 VSTs in 1 pack"], price:"9.80", old:"49", badge:"🔥 -80%",
    buy:"", demo:"",
    note:"Code SOLDES80 · All 5 VSTs (value €87) · Best deal" },

  { id:"free-bundle", name:"🎁 FREE BUNDLE — Free VSTs + Demo", img:"img/vst/free-bundle.jpg", category:"bundle",
    tags:["Free VSTs","Oriental Demo · Effects","Starter Pack"], price:"0", old:"", badge:"🎁 FREE",
    buy:"djbilbox-free-bundle", demo:"",
    note:"✅ FREE · Matrix, BigBass, Vice City + Oriental Demo in one pack" },

  /* ========== EFFECTS ========== */
  { id:"machina", name:"MACHINA EFFECT — Energy Drink for Your Sound", img:"img/vst/machina-vst.jpg", category:"effect",
    tags:["Distortion · Delay · Filter","VST3 · AU · Win/Mac"], price:"3.60", old:"18", badge:"🔥 -80%",
    buy:"lbceu/SOLDES80", demo:"",
    note:"Code SOLDES80 · -80% Summer Sale" },

  { id:"matrix-modular", name:"MATRIX MODULAR — Westcoast Oriental VST Effect", img:"img/vst/matrix-modular-cover.jpg", category:"effect",
    tags:["Stereo Modulation · Auto-Pan","VST3 · Standalone"], price:"0", badge:"FREE",
    buy:"ocpoej", demo:"",
    note:"✅ 100% FREE · Download now" },

  /* ========== INSTRUMENTS ========== */
  { id:"oriental-instrument", name:"Oriental Instrument — Full Version (280+ Instruments)", img:"img/vst/oriental-instrument-box.jpg", category:"instrument",
    tags:["280+ Instruments","Oriental · Maqam Engine","Win · Mac"], price:"13.80", old:"69", badge:"🔥 -80%",
    buy:"oriental-instrument-djbilbox-beats/SOLDES80",
    demo:"oriental-instrument-demo-free-Download",
    thumb:"assets/products/oriental-instrument/oriental-instrument-card.jpg",
    note:"Code SOLDES80 · Full 280+ instruments · -80% Summer Sale" },

  { id:"bigbass", name:"BIGBASS — LA Lowrider Bass", img:"img/vst/bigbass-vst.jpg", category:"instrument",
    tags:["Lowrider Bass","VST3 · Standalone · Win/Mac"], price:"0", old:"", badge:"FREE",
    buy:"xaziro", demo:"",
    note:"✅ 100% FREE · Download now" },

  { id:"vice-city", name:"Vice City — VST Synthesizer", img:"img/vst/vice-city-vst.jpg", category:"instrument",
    tags:["Synthwave","VST3 · Standalone"], price:"0", old:"", badge:"FREE",
    buy:"ykdzli", demo:"",
    thumb:"assets/products/vice-city/vice-city-card.jpg",
    preview:"assets/products/vice-city/vice-city-card.mp4",
    note:"✅ 100% FREE · Download now" },

  { id:"oriental-instrument-demo", name:"Oriental Instrument — DEMO (Free)", img:"img/vst/oriental-instrument-box.jpg", category:"instrument",
    tags:["280+ Instruments Demo","Oriental","Win · Mac"], price:"0", old:"", badge:"FREE DEMO",
    buy:"oriental-instrument-demo-free-Download", demo:"",
    note:"Free demo · Try 50+ instruments · Full version available" },
];
