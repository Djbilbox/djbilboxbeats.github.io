/* ============================================================
   DJBILBOX BEATS — VST plugins catalog
   `buy`  : Gumroad product slug (after /l/) or full URL — paid product.
            Append "/PROMOCODE" to auto-apply a discount at checkout.
   `demo` : Gumroad slug/URL for the free demo (optional)
   `note` : Short promo line shown on the card (🎟️ added automatically)
   `old`  : struck-through original price
   ============================================================ */
/* Order = newest release first: MACHINA (Effect) → BIGBASS → Vice City → Oriental Instrument (Instruments) */
window.VSTS = [
  /* ========== EFFECTS ========== */
  { id:"machina", name:"MACHINA — Audio Effect", img:"img/vst/machina-vst.svg", category:"effect",
    tags:["Distortion · Delay · Filter","VST3 · Standalone · Win/Mac"], price:"[à compléter]", old:"", badge:"🆕 NEW",
    buy:"[à compléter]", demo:"",
    note:"Vending machine UI · Creative distortion & FX" },

  /* ========== INSTRUMENTS ========== */
  { id:"bigbass", name:"BIGBASS — LA Lowrider Bass", img:"img/vst/bigbass-vst.jpg", category:"instrument",
    tags:["Lowrider Bass","VST3 · Standalone · Win/Mac"], price:"19.50", old:"39", badge:"🔥 -50%",
    buy:"xaziro/BIGBASS50", demo:"",
    note:"Code: BIGBASS50 · Offre de lancement -50%" },

  { id:"vice-city", name:"Vice City — VST Plugin", img:"img/vst/vice-city-vst.jpg", category:"instrument",
    tags:["Synthwave","VST3 · Standalone"], price:"18.45", old:"36.90", badge:"🔥 -50%",
    buy:"ykdzli/VICECITY50", demo:"",
    note:"Code: VICECITY50 · Until Jul 31, 2026" },

  { id:"oriental-instrument", name:"Oriental Instrument — 280+ Instruments", img:"img/vst/oriental-instrument-box.jpg", category:"instrument",
    tags:["280+ Instruments","Oriental","Win · Mac"], price:"24.50", old:"49", badge:"🔥 -50%",
    buy:"oriental-instrument-djbilbox-beats/ORIENTAL50",
    demo:"oriental-instrument-demo-free-Download",
    note:"Code: ORIENTAL50 · 280+ instruments orientaux · prix accessible" },
];
