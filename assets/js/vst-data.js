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

  /* ========== FL STUDIO — the DAW I use (real box art · links to image-line.com) ========== */
  { name:"FL STUDIO 26 — Fruity Edition", img:"img/vst/fl-fruity.jpg", category:"instrument",
    tags:["Entry DAW","Sequencer · Piano roll"], price:"~€89", badge:"🍊 FL Studio",
    url:"https://www.image-line.com/fl-studio/",
    desc:"The most affordable way into FL Studio — step sequencer, piano roll & playlist. Perfect to start making beats.",
    note:"The DAW I use · lifetime free updates" },

  { name:"FL STUDIO 26 — Producer Edition", img:"img/vst/fl-producer.jpg", category:"instrument",
    tags:["Most popular","Audio recording + automation"], price:"~€189", badge:"⭐ Most Popular",
    url:"https://www.image-line.com/fl-studio/",
    desc:"The complete package: full audio recording, automation and every edit feature. What I make every DJBILBOX beat on.",
    note:"My main edition · lifetime free updates" },

  { name:"FL STUDIO 26 — Signature Bundle", img:"img/vst/fl-signature.jpg", category:"instrument",
    tags:["Producer + signature plugins","Harmony · Gross Beat · Newtone"], price:"~€289", badge:"🍊 FL Studio",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Producer Edition plus the signature plugins — Harmless, Gross Beat, NewTone, Pitcher, DirectWave & more.",
    note:"Lifetime free updates" },

  { name:"FL STUDIO 26 — All Plugins Edition", img:"img/vst/fl-all-plugins.jpg", category:"instrument",
    tags:["The ultimate setup","All Image-Line native plugins"], price:"~€499", badge:"🍊 FL Studio",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Signature Bundle plus every Image-Line native plugin available at purchase — the complete FL Studio arsenal.",
    note:"Lifetime free updates" },

  { name:"FL STUDIO — Free Trial", img:"img/vst/fl-fruity.jpg", category:"instrument",
    tags:["Full version · no time limit","Try before you buy"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.image-line.com/fl-studio-download/",
    desc:"Try the full FL Studio free with no time limit — you just can't re-open saved projects until you buy a licence.",
    note:"Free demo — the real thing, unlimited" },

  /* ========== APESHYT — partner ========== */
  { name:"APESHYT RAMPAGE — Unleash The Beast", img:"img/vst/apeshyt-rampage.svg", category:"instrument",
    tags:["Aggressive Synth","+ Rebellion Melody Loops"], price:"~$67", badge:"🤝 Partner",
    url:"https://apeshyt808.com/rampages/",
    desc:"A sonic weapon that smashes through ordinary sound — an aggressive synth for beats that hit hard. Includes the Rebellion Melody Loops pack.",
    note:"Official partner · bonus melody loops" },

  /* Free plugins are listed individually on the Info page (studio-setup.html). */
];
