/* ============================================================
   DJBILBOX BEATS — VST plugins catalog
   `buy`  : Gumroad product slug (after /l/) or full URL — paid product.
            Append "/PROMOCODE" to auto-apply a discount at checkout.
   `demo` : Gumroad slug/URL for the free demo (optional)
   `note` : Short promo line shown on the card (🎟️ added automatically)
   `old`  : struck-through original price
   ============================================================ */
/* Order = newest release first: MATRIX MODULAR (Effect) → MACHINA (Effect) → BIGBASS → Vice City → Oriental Instrument */
window.VSTS = [
  /* ========== EFFECTS ========== */
  { id:"matrix-modular", name:"MATRIX MODULAR — Westcoast Oriental VST Effect", img:"img/vst/matrix-modular-cover.jpg", category:"effect",
    tags:["Stereo Modulation · Auto-Pan","VST3 · Standalone"], price:"0", badge:"FREE",
    buy:"ocpoej", demo:"",
    note:"Now FREE · Limited time offer" },

  { id:"machina", name:"MACHINA — Audio Effect", img:"img/vst/machina-vst.jpg", category:"effect",
    tags:["Distortion · Delay · Filter","VST3 · AU · Win/Mac"], price:"0", old:"", badge:"FREE",
    buy:"lbceu", demo:"",
    note:"Now FREE · Limited time offer" },

  /* ========== INSTRUMENTS ========== */
  { id:"bigbass", name:"BIGBASS — LA Lowrider Bass", img:"img/vst/bigbass-vst.jpg", category:"instrument",
    tags:["Lowrider Bass","VST3 · Standalone · Win/Mac"], price:"0", old:"", badge:"FREE",
    buy:"xaziro", demo:"",
    note:"Now FREE · Limited time offer" },

  { id:"vice-city", name:"Vice City — VST Plugin", img:"img/vst/vice-city-vst.jpg", category:"instrument",
    tags:["Synthwave","VST3 · Standalone"], price:"0", old:"", badge:"FREE",
    buy:"ykdzli", demo:"",
    note:"Now FREE · Limited time offer" },

  { id:"oriental-instrument", name:"Oriental Instrument — 280+ Instruments", img:"img/vst/oriental-instrument-box.jpg", category:"instrument",
    tags:["280+ Instruments","Oriental","Win · Mac"], price:"24.50", old:"49", badge:"🔥 -50%",
    buy:"oriental-instrument-djbilbox-beats/ORIENTAL50",
    demo:"oriental-instrument-demo-free-Download",
    note:"Code: ORIENTAL50 · 280+ instruments orientaux · -50%" },
];
