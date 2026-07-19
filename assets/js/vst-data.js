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
    preview:"assets/products/vice-city/vice-city-card.mp4",
    note:"Code SOLDES80 · 70 presets · -80% Summer Sale" },

  /* ========== PARTNER GEAR — FL Studio & Apeshyt (separate from my own products) ========== */
  { name:"FL STUDIO 26 — Fruity Edition", img:"img/vst/fl-fruity.jpg", category:"partner",
    tags:["Entry DAW","Sequencer · Piano roll"], price:"~€89", badge:"🍊 FL Studio", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Compose with the playlist, piano roll, step sequencer and automation, plus the core instruments & effects. Built for beat-making — note it can't record or edit audio tracks.",
    note:"The DAW I use · lifetime free updates" },

  { name:"FL STUDIO 26 — Producer Edition", img:"img/vst/fl-producer.jpg", category:"partner",
    tags:["Most popular","Audio recording + automation"], price:"~€189", badge:"⭐ Most Popular", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Everything in Fruity plus full audio recording & editing, the Edison editor and the complete mixer with sidechain. The full toolkit I make every DJBILBOX beat on.",
    note:"My main edition · lifetime free updates" },

  { name:"FL STUDIO 26 — Signature Bundle", img:"img/vst/fl-signature.jpg", category:"partner",
    tags:["Producer + signature plugins","Gross Beat · Harmless · Newtone"], price:"~€289", badge:"🍊 FL Studio", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Producer Edition plus premium plugins: Harmless, Gross Beat, NewTone, Pitcher, DirectWave, Hardcore and more.",
    note:"Lifetime free updates" },

  { name:"FL STUDIO 26 — All Plugins Edition", img:"img/vst/fl-all-plugins.jpg", category:"partner",
    tags:["The ultimate setup","Every Image-Line plugin"], price:"~€499", badge:"🍊 FL Studio", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Signature Bundle plus every Image-Line native plugin — Harmor, Sytrus, Toxic Biohazard, Sakura, Morphine, PoiZone and the whole collection.",
    note:"Lifetime free updates" },

  { name:"FL STUDIO — Free Trial", img:"img/vst/fl-fruity.jpg", category:"partner",
    tags:["Full version · no time limit","Try before you buy"], price:"0", free:true, badge:"✅ FREE", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio-download/",
    desc:"Try the full FL Studio free with no time limit — you just can't re-open saved projects until you buy a licence.",
    note:"Free demo — the real thing, unlimited" },

  { name:"APESHYT RAMPAGE — Unleash The Beast", img:"img/vst/apeshyt-rampage.png", category:"partner",
    tags:["Aggressive Synth","+ Rebellion Melody Loops"], price:"0", free:true, badge:"✅ FREE", detail:"apeshyt-rampage.html",
    url:"https://apeshyt808.com/browse/free-plugin/",
    desc:"A sonic weapon that smashes through ordinary sound — an aggressive synth for beats that hit hard. Includes the Rebellion Melody Loops pack.",
    note:"Free plugin from Apeshyt · bonus melody loops" },

  { name:"VIRTUAL DJ — Free (Home)", img:"img/vst/virtualdj-free.jpg", category:"partner",
    tags:["DJ software · free for home","Auto BPM · stems · video"], price:"0", free:true, badge:"✅ FREE",
    url:"https://fr.virtualdj.com/download/",
    desc:"The world's most popular DJ software, free for home use — mix music, video and karaoke with automatic BPM sync, real-time stems separation and a massive controller list.",
    note:"Free demo · full app for home use" },

  { name:"VIRTUAL DJ — PRO", img:"img/vst/virtualdj-pro.jpg", category:"partner",
    tags:["Pro · gigging DJs","All features unlocked"], price:"~€19/mo", badge:"🤝 Partner",
    url:"https://fr.virtualdj.com/buy/",
    desc:"The full professional VirtualDJ for performing, streaming and commercial use — unlocks every feature and all hardware. Monthly subscription or a Pro Infinity lifetime licence.",
    note:"Pro version · subscription or Pro Infinity" },

  /* ========== FREE VST — recommended free plugins (not mine, external downloads) ==========
     sub:"instrument" = synths/instruments · sub:"effect" = effects. Grouped separately in the shop. */

  /* ---- Synths & Instruments ---- */
  { name:"Vital — Spectral Synth", img:"img/vst/free/vital-real.jpg", category:"free", sub:"instrument",
    tags:["Spectral wavetable synth","VST3 · AU · Win/Mac"], price:"0", free:true, badge:"✅ FREE",
    url:"https://vital.audio/",
    desc:"Synthétiseur spectral haut de gamme — la version gratuite complète est l'un des meilleurs synthés wavetable disponibles.",
    note:"Free download · version gratuite complète" },

  { name:"Zebralette — Mini Synth (u-he)", img:"img/vst/free/zebralette-real.jpg", category:"free", sub:"instrument",
    tags:["Mini modular synth","u-he · Zebra oscillator"], price:"0", free:true, badge:"✅ FREE",
    url:"https://u-he.com/products/zebralette/",
    desc:"Le mini synthé modulaire d'u-he basé sur un oscillateur de Zebra — parfait pour débuter avec la synthèse u-he.",
    note:"Free download · by u-he" },

  { name:"Surrealistic MG-1 Plus — Moog Emulation", img:"img/vst/free/mg1-real.png", category:"free", sub:"instrument",
    tags:["Moog emulation","Cherry Audio · analog"], price:"0", free:true, badge:"✅ FREE",
    url:"https://cherryaudio.com/products/mg-1-plus",
    desc:"Émulation gratuite du célèbre synthétiseur analogique Moog Realistic par Cherry Audio — basses et leads chauds.",
    note:"Free download · by Cherry Audio" },

  { name:"Drum8 — Hip-Hop Drum Rompler", img:"img/vst/free/drum8-real.jpg", category:"free", sub:"instrument",
    tags:["Drum rompler","Hip-Hop · Trap kits"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.audiolatry.com/plugins/drum8",
    desc:"Rompler de batterie virtuel contenant de nombreux kits hip-hop et trap prêts à l'emploi, par Audiolatry.",
    note:"Free download · by Audiolatry" },

  /* ---- Effects ---- */
  { name:"OTT — Multiband Compressor", img:"img/vst/free/ott-real.jpg", category:"free", sub:"effect",
    tags:["Multiband compressor","Xfer Records"], price:"0", free:true, badge:"✅ FREE",
    url:"https://xferrecords.com/freeware",
    desc:"Le célèbre compresseur multiband par Xfer Records — indispensable pour obtenir le gros son moderne.",
    note:"Free download · by Xfer Records" },

  { name:"CamelCrusher — Distortion", img:"img/vst/free/camelcrusher-real.jpg", category:"free", sub:"effect",
    tags:["Distortion · Compressor","Legendary 'fat' tone"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.kvraudio.com/product/camelcrusher-by-camel-audio",
    desc:"Distorsion / compresseur légendaire au son \"fat\", disponible gratuitement en version legacy.",
    note:"Free download · legacy version" },

  { name:"ValhallaSupermassive — Reverb / Delay", img:"img/vst/free/supermassive-real.jpg", category:"free", sub:"effect",
    tags:["Giant reverb & delay","Valhalla DSP"], price:"0", free:true, badge:"✅ FREE",
    url:"https://valhalladsp.com/shop/reverb/valhalla-supermassive/",
    desc:"Un des meilleurs plug-ins gratuits au monde pour les reverbes géantes et les delays massifs.",
    note:"Free download · by Valhalla DSP" },

  { name:"ValhallaFreqEcho — Freq Delay", img:"img/vst/free/freqecho-real.png", category:"free", sub:"effect",
    tags:["Frequency-shift delay","Valhalla DSP"], price:"0", free:true, badge:"✅ FREE",
    url:"https://valhalladsp.com/shop/delay/valhalla-freq-echo/",
    desc:"Un delay à décalage de fréquence parfait pour les effets psychédéliques et le sound design.",
    note:"Free download · by Valhalla DSP" },

  { name:"ValhallaSpaceModulator — Flanger", img:"img/vst/free/spacemodulator-real.jpg", category:"free", sub:"effect",
    tags:["Flanger · spatialisation","Valhalla DSP"], price:"0", free:true, badge:"✅ FREE",
    url:"https://valhalladsp.com/shop/modulation/valhalla-space-modulator/",
    desc:"Flanger / effet de spatialisation gratuit de chez Valhalla — modulation extrême et effets stéréo.",
    note:"Free download · by Valhalla DSP" },

  { name:"Graillon 3 — Auto-Tune", img:"img/vst/free/graillon-real.jpg", category:"free", sub:"effect",
    tags:["Pitch correction","Auburn Sounds · real-time"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.auburnsounds.com/products/Graillon.html",
    desc:"La version gratuite de Graillon par Auburn Sounds offre un excellent pitch correction / auto-tune en temps réel.",
    note:"Free download · by Auburn Sounds" },

  { name:"MAutoPitch — Pitch Correction", img:"img/vst/free/mautopitch-real.jpg", category:"free", sub:"effect",
    tags:["Pitch correct · auto-tune","MeldaProduction"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.meldaproduction.com/MAutoPitch",
    desc:"L'effet de correction de pitch et d'auto-tune gratuit ultra-complet de MeldaProduction.",
    note:"Free download · by MeldaProduction" },

  { name:"TAL-Vocoder-2 — Vintage Vocoder", img:"img/vst/free/talvocoder-real.jpg", category:"free", sub:"effect",
    tags:["Vintage vocoder","TAL Software · 80s"], price:"0", free:true, badge:"✅ FREE",
    url:"https://tal-software.com/products/tal-vocoder",
    desc:"Émulation de vocodeur vintage analogique des années 80 par TAL Software — voix robotiques classiques.",
    note:"Free download · by TAL Software" },

  { name:"T-De-Esser 2 — De-Esser", img:"img/vst/free/tdeesser-real.jpg", category:"free", sub:"effect",
    tags:["De-esser · vocals","Techivation"], price:"0", free:true, badge:"✅ FREE",
    url:"https://techivation.com/t-de-esser/",
    desc:"Un de-esser moderne, simple et transparent créé par Techivation — contrôle les sifflantes en un clic.",
    note:"Free download · by Techivation" },

  { name:"Surge XT Effects — FX Rack", img:"img/vst/free/surgext-real.jpg", category:"free", sub:"effect",
    tags:["Full FX rack","Open-source synth"], price:"0", free:true, badge:"✅ FREE",
    url:"https://surge-synthesizer.github.io/",
    desc:"Le rack d'effets complet issu du synthétiseur open-source Surge XT — reverbs, delays, distortions et plus.",
    note:"Free download · open-source" },

  { name:"NeuralQ — EQ / Saturation", img:"img/vst/free/neuralq-real.png", category:"free", sub:"effect",
    tags:["EQ · saturation","Analog Obsession · neural"], price:"0", free:true, badge:"✅ FREE",
    url:"https://analogobsession.com/",
    desc:"Égaliseur et saturateur basé sur un modèle de réseau de neurones par Analog Obsession — chaleur analogique.",
    note:"Free download · by Analog Obsession" },
];
