/* ============================================================
   DJBILBOX BEATS — VST plugins catalog
   `buy`  : Gumroad product slug (after /l/) or full URL — paid product.
   `demo` : Gumroad slug/URL for the free demo (optional)
   `note` : Short line shown on the card (🎟️ added automatically)
   `tier` : "pro" ($97) | "legendary" ($697, STATION SYNTH + ses 11 librairies)
            | "bundle" ($997, tout le catalogue). Une entrée qui porte un
            `tier` voit son `price`/`old`/`buy` RÉÉCRITS au chargement par
            assets/js/pricing.js selon la promo du moment (4 promos par mois).
            Ne pas y écrire un prix à la main : il sera écrasé.
   `price`: pour tout ce qui n'a PAS de `tier` (partenaires, VST gratuits
            externes, versions BASIC), le prix doit égaler le prix réel.
   Modèle repris d'Apeshyt808 depuis le 12 août 2026 : le synthé se donne
   (BASIC gratuit, comme Rampage), ce sont les librairies qui se vendent.
   Un plugin seul à $97 catalogue, STATION SYNTH + ses 11 librairies à $697,
   et le PRO BUNDLE à $997 — jamais payés plein tarif, la promo tourne.
   ============================================================ */
/* MACHINA EFFECT and the ALL VST PACK bundle were pulled from sale on
   2026-08-01: the plug-in does not work, and the bundle shipped it as one
   of its five VSTs. Do not re-add either without a fixed build. */
window.VSTS = [
  /* ========== PRO BUNDLE — l'offre phare ==========
     Vrai bundle Gumroad (il contient les 6 produits, rien à téléverser),
     publié le 12 août 2026 sous `djbilbox-pro-bundle`. Valeur pièce par
     pièce : $1182. MACHINA EFFECT en a été retiré — le plug-in ne marche
     pas, ne pas le remettre sans build corrigé.                          */
  { id:"pro-bundle", name:"DJBILBOX PRO BUNDLE — All 6 Plugins", img:"img/vst/ui/pro-bundle-card.jpg", category:"instrument",
    tags:["6 plugins · $1182 value","STATION SYNTH PRO included","VST3 · AU · Standalone · Win/Mac"], tier:"bundle", price:"997", badge:"👑 Best value",
    buy:"djbilbox-pro-bundle", demo:"station-synth-demo",
    note:"Every plugin I make · every future release included · one payment" },

  /* ========== EFFECTS ========== */
  { id:"matrix-modular", yt:"DPoCVD-eK3w", name:"MATRIX MODULAR — Westcoast Oriental VST Effect", img:"img/vst/ui/matrix-modular-card.jpg", category:"effect",
    tags:["Stereo Modulation · Auto-Pan","VST3 · Standalone"], tier:"pro", price:"97",
    buy:"ocpoej", demo:"",
    note:"Stereo modulation · auto-pan · westcoast oriental colour" },

  { id:"mastering", name:"MASTERING — Pro VST3 Mastering Limiter", img:"img/vst/ui/mastering-card.jpg", category:"effect",
    tags:["Mastering Limiter","Peak control · Loudness","VST3 · Standalone"], tier:"pro", price:"97", badge:"🆕 New",
    buy:"mastering", demo:"",
    note:"Transparent mastering limiter · studio-quality peak control" },

  /* ========== INSTRUMENTS ==========
     Chaque synthé se décline en BASIC (gratuit, la porte d'entrée façon
     Apeshyt Rampage) et PRO (tier "pro"). BIGBASS et VICE CITY n'ont pas
     encore de build BASIC — à produire, cf. rapport du 12 août 2026. */
  /* THUGLIFE — ajoute le 15 aout 2026. Synthe soustractif VST3 + Standalone
     Windows, 60 presets usine (noms west coast) + EXPANSION VOL.1 (22 presets)
     chargee par la fente a cassette. Slug Gumroad attendu : `thuglife`.
     tier "pro" => $97 catalogue, prix du moment ecrit par pricing.js. */
  { id:"thuglife", name:"THUGLIFE PRO — G-Funk Street Synth", img:"img/vst/ui/thuglife-card.jpg", category:"instrument",
    detail:"thuglife.html",
    tags:["60 G-Funk presets · Expansion Vol.1","Distortion · Chorus · Delay · Reverb","VST3 · Standalone · Windows"], tier:"pro", price:"97", badge:"🔥 New",
    buy:"thuglife", demo:"",
    note:"West coast synth · 60 presets + 22 en Expansion Vol.1 · 16 voix" },

  /* STATION SYNTH — added 2026-08-09. */
  { id:"station-synth-bundle", yt:"_YLj6CONTXU", name:"STATION SYNTH PRO BUNDLE — Synth + 11 Expansion Libraries", img:"img/vst/ui/station-synth-card.jpg", category:"instrument",
    detail:"station-synth-bundle.html",
    preview:"assets/products/station-synth/station-synth-card.mp4",
    tags:["Synth + 11 expansion libraries","4128 presets · 44 wavetables","VST3 · AU · Standalone · Win/Mac"], tier:"legendary", price:"697", badge:"🔥 New",
    buy:"station-synth-legendary-bundle",
    demo:"station-synth-demo",
    note:"Wavetable synth · 4128 presets · 11 libraries · Windows & macOS" },

  { id:"station-synth-demo", yt:"Hd6PJpDXZIQ", name:"STATION SYNTH BASIC — The Synth, Free (50 presets)", img:"img/vst/ui/station-synth-alt-card.jpg", category:"instrument",
    detail:"station-synth-demo.html",
    tags:["The synth alone, free","50 presets · 14 wavetables","VST3 · AU · Standalone · Win/Mac"], price:"0", free:true, badge:"✅ FREE BASIC",
    buy:"station-synth-demo", demo:"",
    note:"100% FREE BASIC · full engine · 50 presets · upgrade keeps your install" },

  { id:"mpc-2026", yt:"supwohrB7xg", name:"MPC 2026 BASIC — Beat Machine (16 Pads)", img:"img/vst/ui/mpc-2026-card.jpg", category:"instrument",
    tags:["16 pads · 50 kits","Sequencer · MIDI 36-51","VST3 · AU · Win/Mac"], price:"0", free:true, badge:"✅ FREE BASIC",
    buy:"mpc-2026", demo:"",
    note:"100% FREE BASIC · plays the samples already on your machine · 50 kits across 10 styles" },

  { id:"oriental-instrument", yt:"F-H8_4urmAo", name:"ORIENTAL INSTRUMENT PRO BUNDLE — 280+ Instruments", img:"img/vst/ui/oriental-instrument-card.jpg", category:"instrument",
    tags:["280+ instruments · Maqam engine","BASIC edition available","Win · Mac"], tier:"oriental", price:"130",
    buy:"oriental-instrument-djbilbox-beats",
    demo:"oriental-instrument-demo-free-Download",
    note:"Full 280+ instruments · edition BASIC a 10 $" },

  { id:"bigbass", name:"BIGBASS PRO — LA Lowrider Bass", img:"img/vst/ui/bigbass-card.jpg", category:"instrument",
    tags:["Lowrider Bass","VST3 · Standalone · Win/Mac"], tier:"pro", price:"97",
    buy:"xaziro", demo:"",
    note:"808 · 3 bass modes" },

  { id:"vice-city", yt:"oadLL3JJYD0", name:"VICE CITY PRO — VST Synthesizer", img:"img/vst/ui/vice-city-card.jpg", category:"instrument",
    tags:["Synthwave","VST3 · Standalone"], tier:"pro", price:"97",
    buy:"ykdzli", demo:"",
    preview:"assets/products/vice-city/vice-city-card.mp4",
    note:"70 presets" },

  { id:"neon-synth-80s", yt:"hU39w6LhcAY", name:"NEON SYNTH 80s BASIC — Synthwave Polysynth", img:"img/vst/ui/neon-synth-80s-card.jpg", category:"instrument",
    tags:["Synthwave · 80s","6 Presets","VST3 · Standalone"], price:"0", free:true, badge:"✅ FREE BASIC",
    buy:"neon-synth-80s", demo:"",
    note:"100% FREE BASIC · dual-oscillator synth · 6 synthwave presets" },

  /* Passe de gratuit a 10 $ le 13 aout 2026 (bil). Pas de `tier` : c'est un
     prix fixe, il ne suit pas le calendrier des promos. */
  { id:"oriental-instrument-free", name:"ORIENTAL INSTRUMENT BASIC — 50+ Instruments", img:"img/vst/ui/oriental-instrument-card.jpg", category:"instrument",
    tags:["50+ Instruments","Oriental · Maqam Engine","Win · Mac"], price:"10", badge:"BASIC",
    buy:"oriental-instrument-demo-free-Download", demo:"",
    note:"Edition BASIC · 50+ instruments · passe au PRO BUNDLE quand tu veux" },

  /* ========== PARTNER GEAR — FL Studio & Apeshyt (separate from my own products) ========== */
  { name:"FL STUDIO 26 — Fruity Edition", img:"img/vst/fl-fruity.jpg", category:"partner",
    tags:["Entry DAW","Sequencer · Piano roll"], price:"~$97.90", badge:"🍊 FL Studio", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Compose with the playlist, piano roll, step sequencer and automation, plus the core instruments & effects. Built for beat-making — note it can't record or edit audio tracks.",
    note:"The DAW I use · lifetime free updates" },

  { name:"FL STUDIO 26 — Producer Edition", img:"img/vst/fl-producer.jpg", category:"partner",
    tags:["Most popular","Audio recording + automation"], price:"~$207.90", badge:"⭐ Most Popular", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Everything in Fruity plus full audio recording & editing, the Edison editor and the complete mixer with sidechain. The full toolkit I make every DJBILBOX beat on.",
    note:"My main edition · lifetime free updates" },

  { name:"FL STUDIO 26 — Signature Bundle", img:"img/vst/fl-signature.jpg", category:"partner",
    tags:["Producer + signature plugins","Gross Beat · Harmless · Newtone"], price:"~$317.90", badge:"🍊 FL Studio", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Producer Edition plus premium plugins: Harmless, Gross Beat, NewTone, Pitcher, DirectWave, Hardcore and more.",
    note:"Lifetime free updates" },

  { name:"FL STUDIO 26 — All Plugins Edition", img:"img/vst/fl-all-plugins.jpg", category:"partner",
    tags:["The ultimate setup","Every Image-Line plugin"], price:"~$548.90", badge:"🍊 FL Studio", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio/",
    desc:"Signature Bundle plus every Image-Line native plugin — Harmor, Sytrus, Toxic Biohazard, Sakura, Morphine, PoiZone and the whole collection.",
    note:"Lifetime free updates" },

  { name:"FL STUDIO — Free Trial", img:"img/vst/fl-fruity.jpg", category:"free", sub:"instrument",
    tags:["Full version · no time limit","Try before you buy"], price:"0", free:true, badge:"✅ FREE", detail:"fl-studio.html",
    url:"https://www.image-line.com/fl-studio-download/",
    desc:"Try the full FL Studio free with no time limit — you just can't re-open saved projects until you buy a licence.",
    note:"Free demo — the real thing, unlimited" },

  { name:"APESHYT RAMPAGE — Unleash The Beast", img:"img/vst/apeshyt-rampage.png", category:"free", sub:"instrument",
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
    tags:["Pro · gigging DJs","All features unlocked"], price:"~$20.90/mo", badge:"🤝 Partner",
    url:"https://fr.virtualdj.com/buy/",
    desc:"The full professional VirtualDJ for performing, streaming and commercial use — unlocks every feature and all hardware. Monthly subscription or a Pro Infinity lifetime licence.",
    note:"Pro version · subscription or Pro Infinity" },

  /* ========== FREE VST — recommended free plugins (not mine, external downloads) ==========
     sub:"instrument" = synths/instruments · sub:"effect" = effects. Grouped separately in the shop. */

  /* ---- Synths & Instruments ---- */
  { name:"Vital — Spectral Synth", img:"img/vst/free/vital-real.jpg", category:"free", id:"vital", detail:"free-vst.html?id=vital", sub:"instrument",
    tags:["Spectral wavetable synth","VST3 · AU · Win/Mac"], price:"0", free:true, badge:"✅ FREE",
    url:"https://vital.audio/",
    desc:"Top-tier spectral wavetable synth — the full free version is one of the best wavetable synths available.",
    note:"Free download · full free version" },

  { name:"Zebralette — Mini Synth (u-he)", img:"img/vst/free/zebralette-real.jpg", category:"free", id:"zebralette", detail:"free-vst.html?id=zebralette", sub:"instrument",
    tags:["Mini modular synth","u-he · Zebra oscillator"], price:"0", free:true, badge:"✅ FREE",
    url:"https://u-he.com/products/zebralette/",
    desc:"u-he's mini modular synth based on a Zebra oscillator — perfect for getting into u-he synthesis.",
    note:"Free download · by u-he" },

  { name:"Surrealistic MG-1 Plus — Moog Emulation", img:"img/vst/free/mg1-real.png", category:"free", id:"mg1", detail:"free-vst.html?id=mg1", sub:"instrument",
    tags:["Moog emulation","Cherry Audio · analog"], price:"0", free:true, badge:"✅ FREE",
    url:"https://cherryaudio.com/products/mg-1-plus",
    desc:"Free emulation of the famous analog Moog Realistic synth by Cherry Audio — warm basses and leads.",
    note:"Free download · by Cherry Audio" },

  { name:"Drum8 — Hip-Hop Drum Rompler", img:"img/vst/free/drum8-real.jpg", category:"free", id:"drum8", detail:"free-vst.html?id=drum8", sub:"instrument",
    tags:["Drum rompler","Hip-Hop · Trap kits"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.audiolatry.com/plugins/drum8",
    desc:"Virtual drum rompler packed with ready-to-use hip-hop and trap kits, by Audiolatry.",
    note:"Free download · by Audiolatry" },

  /* ---- Effects ---- */
  { name:"OTT — Multiband Compressor", img:"img/vst/free/ott-real.jpg", category:"free", id:"ott", detail:"free-vst.html?id=ott", sub:"effect",
    tags:["Multiband compressor","Xfer Records"], price:"0", free:true, badge:"✅ FREE",
    url:"https://xferrecords.com/freeware",
    desc:"The famous multiband compressor by Xfer Records — essential for the big modern sound.",
    note:"Free download · by Xfer Records" },

  { name:"CamelCrusher — Distortion", img:"img/vst/free/camelcrusher-real.jpg", category:"free", id:"camelcrusher", detail:"free-vst.html?id=camelcrusher", sub:"effect",
    tags:["Distortion · Compressor","Legendary 'fat' tone"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.kvraudio.com/product/camelcrusher-by-camel-audio",
    desc:"Legendary distortion / compressor with a 'fat' tone, free as a legacy version.",
    note:"Free download · legacy version" },

  { name:"ValhallaSupermassive — Reverb / Delay", img:"img/vst/free/supermassive-real.jpg", category:"free", id:"supermassive", detail:"free-vst.html?id=supermassive", sub:"effect",
    tags:["Giant reverb & delay","Valhalla DSP"], price:"0", free:true, badge:"✅ FREE",
    url:"https://valhalladsp.com/shop/reverb/valhalla-supermassive/",
    desc:"One of the best free plugins in the world for giant reverbs and massive delays.",
    note:"Free download · by Valhalla DSP" },

  { name:"ValhallaFreqEcho — Freq Delay", img:"img/vst/free/freqecho-real.png", category:"free", id:"freqecho", detail:"free-vst.html?id=freqecho", sub:"effect",
    tags:["Frequency-shift delay","Valhalla DSP"], price:"0", free:true, badge:"✅ FREE",
    url:"https://valhalladsp.com/shop/delay/valhalla-freq-echo/",
    desc:"A frequency-shifting delay perfect for psychedelic effects and sound design.",
    note:"Free download · by Valhalla DSP" },

  { name:"ValhallaSpaceModulator — Flanger", img:"img/vst/free/spacemodulator-real.jpg", category:"free", id:"spacemodulator", detail:"free-vst.html?id=spacemodulator", sub:"effect",
    tags:["Flanger · spatialisation","Valhalla DSP"], price:"0", free:true, badge:"✅ FREE",
    url:"https://valhalladsp.com/shop/modulation/valhalla-space-modulator/",
    desc:"Free flanger / spatial effect from Valhalla — extreme modulation and stereo effects.",
    note:"Free download · by Valhalla DSP" },

  { name:"Graillon 3 — Auto-Tune", img:"img/vst/free/graillon-real.jpg", category:"free", id:"graillon3", detail:"free-vst.html?id=graillon3", sub:"vocal",
    tags:["Pitch correction","Auburn Sounds · real-time"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.auburnsounds.com/products/Graillon.html",
    desc:"Graillon's free version by Auburn Sounds delivers excellent real-time pitch correction / auto-tune.",
    note:"Free download · by Auburn Sounds" },

  { name:"MAutoPitch — Pitch Correction", img:"img/vst/free/mautopitch-real.jpg", category:"free", id:"mautopitch", detail:"free-vst.html?id=mautopitch", sub:"effect",
    tags:["Pitch correct · auto-tune","MeldaProduction"], price:"0", free:true, badge:"✅ FREE",
    url:"https://www.meldaproduction.com/MAutoPitch",
    desc:"MeldaProduction's ultra-complete free pitch-correction and auto-tune effect.",
    note:"Free download · by MeldaProduction" },

  { name:"TAL-Vocoder-2 — Vintage Vocoder", img:"img/vst/free/talvocoder-real.jpg", category:"free", id:"talvocoder", detail:"free-vst.html?id=talvocoder", sub:"vocal",
    tags:["Vintage vocoder","TAL Software · 80s"], price:"0", free:true, badge:"✅ FREE",
    url:"https://tal-software.com/products/tal-vocoder",
    desc:"Emulation of a vintage 80s analog vocoder by TAL Software — classic robotic vocals.",
    note:"Free download · by TAL Software" },

  { name:"T-De-Esser 2 — De-Esser", img:"img/vst/free/tdeesser-real.jpg", category:"free", id:"tdeesser", detail:"free-vst.html?id=tdeesser", sub:"effect",
    tags:["De-esser · vocals","Techivation"], price:"0", free:true, badge:"✅ FREE",
    url:"https://techivation.com/t-de-esser/",
    desc:"A modern, simple and transparent de-esser by Techivation — tame sibilance in one click.",
    note:"Free download · by Techivation" },

  { name:"Surge XT Effects — FX Rack", img:"img/vst/free/surgext-real.jpg", category:"free", id:"surgext", detail:"free-vst.html?id=surgext", sub:"effect",
    tags:["Full FX rack","Open-source synth"], price:"0", free:true, badge:"✅ FREE",
    url:"https://surge-synthesizer.github.io/",
    desc:"The full effects rack from the open-source Surge XT synth — reverbs, delays, distortions and more.",
    note:"Free download · open-source" },

  { name:"NeuralQ — EQ / Saturation", img:"img/vst/free/neuralq-real.png", category:"free", id:"neuralq", detail:"free-vst.html?id=neuralq", sub:"effect",
    tags:["EQ · saturation","Analog Obsession · neural"], price:"0", free:true, badge:"✅ FREE",
    url:"https://analogobsession.com/",
    desc:"EQ and saturator based on a neural-network model by Analog Obsession — analog warmth.",
    note:"Free download · by Analog Obsession" },
];
