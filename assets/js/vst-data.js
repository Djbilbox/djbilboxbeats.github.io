/* ============================================================
   DJBILBOX BEATS — VST plugins catalog
   `buy`  : Gumroad product slug (after /l/) or full URL — paid product.
   `demo` : Gumroad slug/URL for the free demo (optional)
   `note` : Short line shown on the card (🎟️ added automatically)
   `tier` : "pro" | "oriental" | "legendary" | "bundle" | "pack".
            Sert au regroupement et aux jetons d'affichage des pages
            produit. Depuis le 2026-08-24 pricing.js NE RÉÉCRIT PLUS
            les prix : le moteur de promo rotatif a été retiré.
   `price`: TOUJOURS le prix Gumroad réel, pour toutes les entrées.
            Le site n'invente jamais un prix — si Gumroad change,
            ce fichier change. Vérifié le 2026-08-24 :
            MASTERING 10, MATRIX 10, BIGBASS 15, VICE CITY 15,
            THUGLIFE 15, ORIENTAL 15, STATION SYNTH 25, BUNDLE 39.
   Modèle repris d'Apeshyt808 depuis le 12 août 2026 : le synthé se donne
   (BASIC gratuit, comme Rampage), ce sont les librairies qui se vendent.
   ============================================================ */
/* MACHINA EFFECT and the ALL VST PACK bundle were pulled from sale on
   2026-08-01: the plug-in does not work, and the bundle shipped it as one
   of its five VSTs. Do not re-add either without a fixed build. */
window.VSTS = [
  /* ========== HUMPIRE VST SUITE 1.0 (NEW — octobre 2026) ==========
     Repris du store Gumroad le 2026-10-09. Ces produits sont vendus en EUR :
     `cur:"€"` fait afficher le bon symbole (le reste du catalogue est en $).
     `yt`  : vidéo promo de la playlist YouTube PLHBhwyzxv1c0, jouée en
             boucle muette dans la carte (assets/js/shop-video.js).
     `ytv` : la vidéo est un Short vertical (9:16) — recadrage différent. */
  { id:"humpire-vst-suite", yt:"sqUykeuBnSk", ytv:true, name:"HUMPIRE VST SUITE — 7 VST3 Plugins + 6,142 Presets + MIDI", img:"https://public-files.gumroad.com/hq0b3i51z2fn8097vymtniyy1226", category:"instrument",
    tags:["7 plugins · 6,142 presets","Generators · Instruments · FX","VST3 · Win x64 · macOS Universal"], tier:"bundle", price:"129", cur:"€", badge:"👑 Suite 1.0",
    buy:"humpire-vst-suite", demo:"",
    note:"TAXI ALGER, CASBAH CHORDS, BLOCK GORILLA, ALIEN 808, CAMEL PILOT, LA BAGUETTE, CHOCOLATINE · 237 € séparément" },

  { id:"humpire-all-vst", yt:"V78hhQnKFMo", ytv:true, name:"HUMPIRE VST & EFFECTS — 24 VST3 Plugins (Synths, Guitar & Mixing)", img:"https://public-files.gumroad.com/hs1ke1qz5ks8s2jqu0sygu1r9uyf", category:"instrument",
    tags:["24 plugins · 25 products","Synths · Guitar pedals · Mixing","VST3 · Win · Mac"], tier:"bundle", price:"199", cur:"€", badge:"👑 Everything",
    buy:"ohiyxu", demo:"",
    note:"Every paid HUMPIRE & DJBILBOX BEATS plugin in one bundle" },

  { id:"humpire-free-vst", yt:"wGAhmsQpYsU", name:"HUMPIRE FREE VST COLLECTION — 6 Plugins & Demos", img:"https://public-files.gumroad.com/ddhz33xrds5jjxosfmfscq5dg197", category:"instrument",
    tags:["3 free plugins + 3 demos","No payment needed","VST3"], tier:"bundle", price:"0", free:true, badge:"✅ FREE",
    buy:"pqhfx", demo:"",
    note:"100% FREE · every free HUMPIRE plugin and demo in one download" },

  { id:"taxi-alger", name:"TAXI ALGER — Beat Generator VST3 (36 Genres)", img:"https://public-files.gumroad.com/vcwebqva83j5oogk7whupyv9171n", category:"instrument",
    tags:["Beat generator · 36 genres","Real drummer grooves · drag to DAW","VST3 · Win · Mac"], tier:"pro", price:"39", cur:"€", badge:"🆕 Suite 1.0",
    buy:"taxi-alger", demo:"",
    note:"Pick a genre, hit GENERATE, drag the groove into your DAW" },

  { id:"casbah-chords", yt:"fKaF1aQVe30", name:"CASBAH CHORDS — Chord & Melody Generator VST3 (Maqam Modes)", img:"https://public-files.gumroad.com/s15lzhfwfvts60kmc84pwv8wt1yq", category:"instrument",
    tags:["Chords & melodies · 36 genres","Maqam modes · Chaabi · Raï","VST3 · Win · Mac"], tier:"pro", price:"39", cur:"€", badge:"🆕 Suite 1.0",
    buy:"casbah-chords", demo:"",
    note:"Pick a genre and a key, hit GENERATE, drag chords & melodies into your DAW" },

  { id:"block-gorilla", yt:"Eb0n_N0ehNI", name:"BLOCK GORILLA — 16-Pad Drum Machine VST3 + Beat Generator", img:"https://public-files.gumroad.com/44dfrmww3ve5ed0qc51ldz2k1db7", category:"instrument",
    tags:["16 pads · sampler · sequencer","Beat generator · real drummers","VST3 · Win · Mac"], tier:"pro", price:"39", cur:"€", badge:"🆕 Suite 1.0",
    buy:"block-gorilla", demo:"",
    note:"Drum machine, sampler, sequencer and beat generator in one plugin" },

  { id:"alien-808", name:"ALIEN 808 — 808 & Sub Bass VST3 + Pattern Generator", img:"https://public-files.gumroad.com/ij1x8tjbkhc7x2vpqc0bn5w51tpr", category:"instrument",
    tags:["808 & sub bass","Pattern generator · slides & glides","VST3 · Win · Mac"], tier:"pro", price:"35", cur:"€", badge:"🆕 Suite 1.0",
    buy:"alien-808", demo:"",
    note:"808 instrument with a built-in pattern generator · slides & glides" },

  /* `playNow` : clavier jouable sur la fiche (assets/audio/play/camel-pilot.json) */
  { id:"camel-pilot", yt:"NiOGzRZxf8g", playNow:"camel-pilot", name:"CAMEL PILOT — Bass Synth VST3 + Bassline Generator", img:"https://public-files.gumroad.com/717hxxq26sj2d4ksw8w99ieavpqk", category:"instrument",
    tags:["Bass synthesizer","Bassline generator · MIDI","VST3 · Win · Mac"], tier:"pro", price:"35", cur:"€", badge:"🆕 Suite 1.0",
    buy:"camel-pilot", demo:"",
    note:"Pick a genre, hit GENERATE, get a bassline and its MIDI" },

  { id:"la-baguette", name:"LA BAGUETTE — Tape Compressor VST3 (Saturation, Wow & Flutter)", img:"https://public-files.gumroad.com/i6jawu7lmrdu0wqs6ilxyy9dop7u", category:"effect",
    tags:["Tape compressor","Saturation · wow & flutter","VST3 · Win · Mac"], tier:"pro", price:"25", cur:"€", badge:"🆕 Suite 1.0",
    buy:"la-baguette", demo:"",
    note:"A compressor and a tape machine in one plugin · drums, vocals, 808s" },

  { id:"chocolatine", name:"CHOCOLATINE — Bus Glue Compressor & Saturation VST3", img:"https://public-files.gumroad.com/b0mlf7s2tk4g1yu6o5rqifus9dwu", category:"effect",
    tags:["Bus glue compressor","Saturation · transients · width","VST3 · Win · Mac"], tier:"pro", price:"25", cur:"€", badge:"🆕 Suite 1.0",
    buy:"chocolatine", demo:"",
    note:"Glue your bus with harmonic saturation, transient shaping and stereo width" },

  /* ========== GUITAR PEDALS COLLECTION (NEW 2026) ========== */
  { id:"camel-pedals", name:"CAMEL PEDALS — 10 Guitar Pedal Plugins Pack", img:"https://public-files.gumroad.com/1hyo02s4s0yijj5cbxldca3pbayk", category:"effect",
    tags:["10 Pedal Plugins Pack","VST3 · AU · Standalone","Win · Mac"], tier:"bundle", price:"64", badge:"🔥 10 Pedals Pack",
    buy:"camel-pedals", demo:"",
    note:"The complete 10 guitar pedals suite · compressor, fuzz, overdrive, reverb, echo, chorus..." },

  { id:"pharaoh-comp", name:"PHARAOH COMP — Compressor Guitar Pedal Plugin", img:"https://public-files.gumroad.com/s35yqlyl6e4xc7x8vbt5pvh2lmok", category:"effect",
    tags:["Compressor Pedal","Analog Warmth · Punch","VST3 · AU · Standalone"], tier:"pro", price:"7", badge:"🎸 Pedal",
    buy:"pharaoh-comp", demo:"",
    note:"Studio compressor guitar pedal · vintage warmth and dynamic punch" },

  { id:"aurora-verb", name:"AURORA VERB — Reverb Guitar Pedal Plugin", img:"https://public-files.gumroad.com/k6tauzs2b0d5lvmslbrbnp6ogrba", category:"effect",
    tags:["Reverb Pedal","Ambient · Shimmer · Hall","VST3 · AU · Standalone"], tier:"pro", price:"10", badge:"🎸 Pedal",
    buy:"aurora-verb", demo:"",
    note:"Lush ambient reverb guitar pedal · rich space and shimmer modulation" },

  { id:"canyon-echo", yt:"qt3efwJxBA0", name:"CANYON ECHO — Delay Guitar Pedal Plugin", img:"https://public-files.gumroad.com/ecgc5v83136n8rc57u4c71mdhgh1", category:"effect",
    tags:["Delay Pedal","Tape Echo · Analog Ping-Pong","VST3 · AU · Standalone"], tier:"pro", price:"10", badge:"🎸 Pedal",
    buy:"canyon-echo", demo:"",
    note:"Analog tape echo & delay pedal · warm repeats and spatial ping-pong" },

  { id:"storm-rider", name:"STORM RIDER — Distortion Guitar Pedal Plugin", img:"https://public-files.gumroad.com/4z4l9vwo64hax6qwbguyqn6zogid", category:"effect",
    tags:["Distortion Pedal","Heavy Gain · Tube Drive","VST3 · AU · Standalone"], tier:"pro", price:"9", badge:"🎸 Pedal",
    buy:"storm-rider", demo:"",
    note:"High gain aggressive distortion pedal · tube-style saturation and bite" },

  { id:"lava-fuzz", name:"LAVA FUZZ — Fuzz Guitar Pedal Plugin", img:"https://public-files.gumroad.com/0hochbyl11hbyqjumsnbs067jsue", category:"effect",
    tags:["Fuzz Pedal","Vintage Silicon / Germanium","VST3 · AU · Standalone"], tier:"pro", price:"8", badge:"🎸 Pedal",
    buy:"lava-fuzz", demo:"",
    note:"Heavy vintage fuzz pedal · thick harmonic distortion and sustain" },

  { id:"camel-pedal", name:"CAMEL PEDAL — Overdrive Guitar Pedal Plugin", img:"https://public-files.gumroad.com/cvwjhpwvbrzh12ce6r1g2u7k4vh8", category:"effect",
    tags:["Overdrive Pedal","Tube Screamer Style · Boost","VST3 · AU · Standalone"], tier:"pro", price:"8", badge:"🎸 Pedal",
    buy:"camel-pedal", demo:"",
    note:"Classic warm overdrive pedal · transparent boost and creamy clipping" },

  { id:"jet-flanger", name:"JET FLANGER — Flanger Guitar Pedal Plugin", img:"https://public-files.gumroad.com/13f1yfeuscwxxqn7f40cpvgvqjnp", category:"effect",
    tags:["Flanger Pedal","Jet Sweep · Stereo Modulation","VST3 · AU · Standalone"], tier:"pro", price:"7", badge:"🎸 Pedal",
    buy:"jet-flanger", demo:"",
    note:"Stereo flanger pedal · dramatic jet sweeps and lush swirl modulation" },

  { id:"neon-phaser", name:"NEON PHASER — Phaser Guitar Pedal Plugin", img:"https://public-files.gumroad.com/gn2mo18w1u5vamm6ex0p0s6n1r90", category:"effect",
    tags:["Phaser Pedal","Multi-Stage Analog Phase","VST3 · AU · Standalone"], tier:"pro", price:"6", badge:"🎸 Pedal",
    buy:"neon-phaser", demo:"",
    note:"Multi-stage analog phaser pedal · 70s funk swirl and deep sweeps" },

  { id:"coral-chorus", name:"CORAL CHORUS — Chorus Guitar Pedal Plugin", img:"https://public-files.gumroad.com/jcatj3mxf9m5y6vpl1dd14z9fcbm", category:"effect",
    tags:["Chorus Pedal","Stereo Dimension · Warmth","VST3 · AU · Standalone"], tier:"pro", price:"6", badge:"🎸 Pedal",
    buy:"coral-chorus", demo:"",
    note:"Lush stereo chorus pedal · wide shimmer and 80s analog warmth" },

  { id:"surf-tremolo", name:"SURF TREMOLO — Tremolo Guitar Pedal Plugin", img:"https://public-files.gumroad.com/a80mqbr6d4yprm8yzkwgw237nv1d", category:"effect",
    tags:["Tremolo Pedal","Opto / Harmonic Tremolo","VST3 · AU · Standalone"], tier:"pro", price:"5", badge:"🎸 Pedal",
    buy:"surf-tremolo", demo:"",
    note:"Vintage optical and harmonic tremolo pedal · rhythmic pulse and wave shaping" },

  { id:"eq-pro-spider", yt:"t8N7Z6bG7u0", name:"EQ-PRO SPIDER — Free 8-Band EQ Plugin", img:"https://public-files.gumroad.com/pewpk4wx84fcy9rn6igvz5bfi8vq", category:"effect",
    tags:["8-Band Parametric EQ","Visual Spectrum Analyzer","VST3 · AU · Standalone"], price:"0", free:true, badge:"✅ FREE",
    buy:"eq-pro-spider", demo:"",
    note:"100% FREE · professional 8-band parametric equalizer with real-time analyzer" },

  { id:"mini-mpc-humpire", yt:"_0a3LF_2O0Y", name:"MINI MPC HUMPIRE — Free Beat Machine (64 Pads)", img:"https://public-files.gumroad.com/4l3h0k0qe4alih949ll89f6sjqvf", category:"instrument",
    tags:["64 Pads Sampler","Built-in Sequencer · Kits","Standalone · App"], price:"0", free:true, badge:"✅ FREE BASIC",
    buy:"retihn", demo:"",
    note:"100% FREE · 64-pad MPC sampler and beat machine with custom kits" },

  /* ========== PRO BUNDLE — l'offre phare ==========
     Vrai bundle Gumroad (il contient les 6 produits, rien à téléverser),
     publié le 12 août 2026 sous `djbilbox-pro-bundle`. MACHINA EFFECT en
     a été retiré — le plug-in ne marche pas, ne pas le remettre sans
     build corrigé.                                                       */
  { id:"pro-bundle", yt:"1j-7i2QO38Y", ytv:true, name:"DJBILBOX PRO BUNDLE — All 6 Plugins", img:"img/vst/ui/pro-bundle-card.jpg", category:"instrument",
    tags:["6 plugins · one payment","STATION SYNTH PRO included","VST3 · AU · Standalone · Win/Mac"], tier:"bundle", price:"39", badge:"👑 Best value",
    buy:"djbilbox-pro-bundle", demo:"station-synth-demo",
    note:"Every plugin I make · every future release included · one payment" },

  /* ========== EFFECTS ========== */
  { id:"matrix-modular", yt:"QMOsU3igGrM", name:"MATRIX MODULAR — Westcoast Oriental VST Effect", img:"img/vst/ui/matrix-modular-card.jpg", category:"effect",
    tags:["Stereo Modulation · Auto-Pan","VST3 · Standalone"], tier:"pro", price:"10",
    buy:"ocpoej", demo:"",
    note:"Stereo modulation · auto-pan · westcoast oriental colour" },

  { id:"mastering", yt:"zo7iokIrYuo", name:"MASTERING — Pro VST3 Mastering Limiter", img:"img/vst/ui/mastering-card.jpg", category:"effect",
    tags:["Mastering Limiter","Peak control · Loudness","VST3 · Standalone"], tier:"pro", price:"10", badge:"🆕 New",
    buy:"mastering", demo:"",
    note:"Transparent mastering limiter · studio-quality peak control" },

  /* ========== INSTRUMENTS ==========
     Chaque synthé se décline en BASIC (gratuit, la porte d'entrée façon
     Apeshyt Rampage) et PRO (tier "pro"). BIGBASS et VICE CITY n'ont pas
     encore de build BASIC — à produire, cf. rapport du 12 août 2026. */
  /* THUGLIFE — ajoute le 15 aout 2026. Synthe soustractif VST3 + Standalone
     Windows, 60 presets usine (noms west coast) + EXPANSION VOL.1 (22 presets)
     chargee par la fente a cassette. Slug Gumroad : `thuglife`, $15. */
  { id:"thuglife", yt:"OMAN209ZVxI", name:"THUGLIFE PRO — G-Funk Street Synth", img:"img/vst/ui/thuglife-card.jpg", category:"instrument",
    detail:"thuglife.html",
    tags:["60 G-Funk presets · Expansion Vol.1","Distortion · Chorus · Delay · Reverb","VST3 · Standalone · Windows"], tier:"pro", price:"15", badge:"🔥 New",
    buy:"thuglife", demo:"oxckm",
    note:"West coast synth · 60 presets + 22 en Expansion Vol.1 · 16 voix" },

  /* STATION SYNTH — added 2026-08-09. */
  { id:"station-synth-bundle", yt:"vvfdwvFgUNk", name:"STATION SYNTH PRO BUNDLE — Synth + 11 Expansion Libraries", img:"img/vst/ui/station-synth-card.jpg", category:"instrument",
    detail:"station-synth-bundle.html",
    preview:"assets/products/station-synth/station-synth-card.mp4",
    tags:["Synth + 11 expansion libraries","4128 presets · 44 wavetables","VST3 · AU · Standalone · Win/Mac"], tier:"legendary", price:"25", badge:"🔥 New",
    buy:"station-synth-legendary-bundle",
    demo:"station-synth-demo",
    note:"Wavetable synth · 4128 presets · 11 libraries · Windows & macOS" },

  { id:"station-synth-demo", yt:"EiXPY1bMZk8", ytv:true, name:"STATION SYNTH BASIC — The Synth, Free (50 presets)", img:"img/vst/ui/station-synth-alt-card.jpg", category:"instrument",
    detail:"station-synth-demo.html",
    tags:["The synth alone, free","50 presets · 14 wavetables","VST3 · AU · Standalone · Win/Mac"], price:"0", free:true, badge:"✅ FREE BASIC",
    buy:"station-synth-demo", demo:"",
    note:"100% FREE BASIC · full engine · 50 presets · upgrade keeps your install" },

  { id:"mpc-2026", yt:"KHdAfW6mKRI", name:"MPC 2026 BASIC — Beat Machine (16 Pads)", img:"img/vst/ui/mpc-2026-card.jpg", category:"instrument",
    tags:["16 pads · 50 kits","Sequencer · MIDI 36-51","VST3 · AU · Win/Mac"], price:"0", free:true, badge:"✅ FREE BASIC",
    buy:"mpc-2026", demo:"",
    note:"100% FREE BASIC · plays the samples already on your machine · 50 kits across 10 styles" },

  { id:"oriental-instrument", yt:"og8FVdn1oBs", name:"ORIENTAL INSTRUMENT PRO BUNDLE — 280+ Instruments", img:"img/vst/ui/oriental-instrument-card.jpg", category:"instrument",
    tags:["280+ instruments · Maqam engine","BASIC edition available","Win · Mac"], tier:"oriental", price:"15",
    buy:"oriental-instrument-djbilbox-beats",
    demo:"oriental-instrument-demo-free-Download",
    note:"Full 280+ instruments · edition BASIC a 10 $" },

  { id:"bigbass", yt:"Rf7737wRKrE", name:"BIGBASS PRO — LA Lowrider Bass", img:"img/vst/ui/bigbass-card.jpg", category:"instrument",
    tags:["Lowrider Bass","VST3 · Standalone · Win/Mac"], tier:"pro", price:"15",
    buy:"xaziro", demo:"",
    note:"808 · 3 bass modes" },

  { id:"vice-city", yt:"-0zeINzGrPg", name:"VICE CITY PRO — VST Synthesizer", img:"img/vst/ui/vice-city-card.jpg", category:"instrument",
    tags:["Synthwave","VST3 · Standalone"], tier:"pro", price:"15",
    buy:"ykdzli", demo:"",
    preview:"assets/products/vice-city/vice-city-card.mp4",
    note:"70 presets" },

  { id:"neon-synth-80s", yt:"opGIZrYgWPI", name:"NEON SYNTH 80s BASIC — Synthwave Polysynth", img:"img/vst/ui/neon-synth-80s-card.jpg", category:"instrument",
    tags:["Synthwave · 80s","6 Presets","VST3 · Standalone"], price:"0", free:true, badge:"✅ FREE BASIC",
    buy:"neon-synth-80s", demo:"",
    note:"100% FREE BASIC · dual-oscillator synth · 6 synthwave presets" },

  /* Passe de gratuit a 10 $ le 13 aout 2026 (bil). Pas de `tier` : c'est un
     prix fixe, il ne suit pas le calendrier des promos. */
  { id:"oriental-instrument-free", yt:"og8FVdn1oBs", name:"ORIENTAL INSTRUMENT BASIC — 50+ Instruments", img:"img/vst/ui/oriental-instrument-card.jpg", category:"instrument",
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
