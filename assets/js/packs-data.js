/* ============================================================
   DJBILBOX BEATS — Sample packs / Drum kits catalog
   Real products (covers in img/packs/), wired to Gumroad.
   `buy`  : Gumroad product slug (the part after /l/).
   `price`: MUST equal the product's real Gumroad price — no markup, no
            invented discount.
   `demo` : Gumroad slug of the free demo. Most packs below sell their demo as
            a *variant* of the same product, so `demo` repeats `buy` — the
            buyer picks the "FREE DEMO" tier on the Gumroad page. Only set it
            when a free demo variant really exists (TONE VAULT has none).
            That variant scheme is broken on Gumroad: a variant price can only
            ADD to the product price, so a paid product's "free" tier still
            charges full price. WESTCOAST VYBES points `demo` at a separate
            $0 product instead — the only pack whose demo is really free.
            Setting the product price to $0 would fix the demo but then the
            Gumroad storefront advertises the pack itself as $0.
   `tier`: "pack" — le prix affiché est RÉÉCRIT au chargement par
           assets/js/pricing.js, qui applique la remise en cours (4 promos
           par mois) et colle le code Gumroad au lien d'achat. Le `price`
           écrit ici est donc le prix CATALOGUE (barré), pas le prix payé.
   Prices in USD. Promos tournantes depuis le 12 août 2026 — voir
   assets/js/pricing.js pour le calendrier et les codes.
   ============================================================ */
window.PACKS = [
  /* ---------- Bundles & kit loops HUMPIRE (Gumroad, ajoutés le 2026-10-09) ---------- */
  { id:"djbilbox-paid-packs", name:"DJBILBOX BEATS — Complete Paid Packs, Kits & Loops (8 packs)", img:"https://public-files.gumroad.com/72ditauizwiml4m3ok8p79p79z8s",
    genre:"Bundle", tags:["Bundle","8 premium packs","Drum Kits","Loops"], price:"29", badge:"🎁 BUNDLE",
    buy:"fhpnge" },

  { id:"djbilbox-free-packs", name:"DJBILBOX BEATS — Free Packs, Kits & Loops (15 packs)", img:"https://public-files.gumroad.com/s59nl0f34izq5c294j3fwdb21px9",
    genre:"Bundle", tags:["Bundle","15 free packs","Free"], price:"FREE",
    buy:"ozwlb" },

  { id:"kit-loop-sunset", name:"SUNSET — Kit Loop by HUMPIRE (West Coast & G-Funk, 119 BPM)", img:"https://public-files.gumroad.com/a1u4l9d05vl6ubhnfdb169d74t2y",
    genre:"West Coast", tags:["West Coast","G-Funk","Kit Loop","Free"], price:"FREE",
    buy:"ioprn" },

  { id:"kit-loop-supreme", name:"SUPREME — Kit Loop by HUMPIRE (Miami Up-Tempo & Synth, 134 BPM)", img:"https://public-files.gumroad.com/gp5c44ozszvbn7k7l0gx2meom1xn",
    genre:"Synth", tags:["Miami","Synth","Kit Loop","Free"], price:"FREE",
    buy:"erckby" },

  { id:"kit-loop-viper", name:"VIPER — Kit Loop by HUMPIRE (Dark Trap & 808)", img:"https://public-files.gumroad.com/pa4ipxwevvtxde764jz77ck01p9a",
    genre:"Trap", tags:["Trap","Drill","808","Free"], price:"FREE",
    buy:"lsuizj" },

  { id:"931-free-beats", name:"931 Free Rap Beats — Royalty-Free Instrumental Beat Pack", img:"https://public-files.gumroad.com/4sr3oqdct58ty9vxwuz8p0qhwv4u",
    genre:"Beats", tags:["931 beats","Instrumentals","Free"], price:"FREE",
    buy:"djbilbox-beats-big-pack-931-beats" },

  /* ---------- New release (2026) ---------- */
  { id:"menace-to-melody", name:"MENACE TO MELODY — G-Funk & West Coast Melodies (2026)", img:"https://public-files.gumroad.com/dapyb6imssp9ofk6vbupisttsdpp",
    genre:"G-Funk", tags:["G-Funk","West Coast","Melody Loops","Free"], price:"FREE",
    buy:"menace-to-melody" },

  { id:"boyz-n-da-loop", name:"BOYZ N DA LOOP — G-Funk & West Coast Drum Loops (2026)", img:"https://public-files.gumroad.com/rjwd8ao71azl84zuzdup2umabvzw",
    genre:"West Coast", tags:["G-Funk","West Coast","Drum Loops","Free"], price:"FREE",
    buy:"boyz-n-da-loop" },

  { id:"venom-flp", name:"VENOM — Free FL Studio Drum Loop Template (FLP)", img:"https://public-files.gumroad.com/sj3ni0o893kspzpz0gpcd8lvy6gw",
    genre:"FL Studio", tags:["FL Studio","FLP","Template","Free"], price:"FREE",
    buy:"psmeiq" },

  { id:"lowrider-drum-loops-2026", name:"Lowrider Drum Loops 2026 — G-Funk & West Coast Pack", img:"https://public-files.gumroad.com/rq6kvahdjx91hqo6zrtr1qp5igqr",
    genre:"G-Funk", tags:["G-Funk","Lowrider","Drum Loops","Free"], price:"FREE",
    buy:"epabpp" },

  { id:"cali-g-funk-melodies-2026", name:"🌴 Cali G-Funk Melodies 2026 : Big Pack 6Go (100% Free) 🍦", img:"img/packs/cali-g-funk-melodies-2026.jpg",
    genre:"G-Funk", tags:["G-Funk","West Coast","Free","Melody Loops","Samples"], price:"FREE",
    buy:"rdswq" },

  { id:"westcoast-vybes-vol01", name:"WESTCOAST VYBES Vol.01 — G-Funk Melody Loops", img:"img/packs/westcoast-vybes-vol01.jpg",
    genre:"West Coast", tags:["West Coast","G-Funk","Melody Loops","Hip-Hop"], price:"5",
    buy:"westcoast-vybes-vol01", demo:"westcoast-vybes-vol01-demo" },

  { id:"kit-drum-funk", name:"KIT DRUM FUNK — Professional Drum Kit", img:"img/packs/kit-drum-funk.jpg",
    genre:"Funk", tags:["Funk","Drum Kit","MIDI","One-Shots"], tier:"pack", price:"10",
    buy:"ejmwmz", demo:"ejmwmz" },

  { id:"west-side", name:"KIT DRUM WEST SIDE — 2Pac, Snoop Dogg & The Game", img:"img/packs/west-side.jpg",
    genre:"West Coast", tags:["West Coast","G-Funk","Hip-Hop","MIDI"], price:"10",
    buy:"west-side-drum-kit", demo:"west-side-drum-kit" },

  /* ---------- Premium kits (2026) ---------- */
  { id:"tone-vault", name:"TONE VAULT — Ultimate Instrument One-Shots", img:"img/packs/tone-vault.jpg",
    genre:"One-Shots", tags:["One-Shots","Instruments"], tier:"pack", price:"8",
    buy:"yrkzl" },

  { id:"void-signals", name:"VOID SIGNALS — 19GB SFX & Cinematic Suite", img:"img/packs/void-signals.jpg",
    genre:"SFX", tags:["SFX","Cinematic"], price:"10",
    buy:"mkijdn", demo:"mkijdn" },

  { id:"ghost-voice", name:"GHOST VOICE — Vocal Hooks & Acapellas", img:"img/packs/ghost-voice.jpg",
    genre:"Vocals", tags:["Vocals","Acapellas"], price:"10",
    buy:"fnpdxf", demo:"fnpdxf" },

  { id:"raw-elements", name:"RAW ELEMENTS — Ultimate One-Shot Drum Kit", img:"img/packs/raw-elements.jpg",
    genre:"One-Shots", tags:["Drums","One-Shots"], price:"10",
    buy:"pohwt", demo:"pohwt" },

  { id:"vinyl-breaker", name:"VINYL BREAKER — Scratch & Vinyl Sample Kit", img:"img/packs/vinyl-breaker.jpg",
    genre:"Hip-Hop", tags:["Vinyl","Hip-Hop"], tier:"pack", price:"20",
    buy:"yecrn", demo:"yecrn" },

  { id:"neon-pulse", name:"NEON PULSE — House & Techno Drum Loops", img:"img/packs/neon-pulse.jpg",
    genre:"House", tags:["House","Techno"], tier:"pack", price:"18",
    buy:"argerk", demo:"argerk" },

  { id:"concrete-vault", name:"CONCRETE VAULT — Trap & Drill Drum Loops", img:"img/packs/concrete-vault.jpg",
    genre:"Trap", tags:["Trap","Drill"], tier:"pack", price:"18",
    buy:"ecrmh", demo:"ecrmh" },

  { id:"westcoast-chrome", name:"WESTCOAST CHROME — G-Funk Drum Loops", img:"img/packs/westcoast-chrome.jpg",
    genre:"G-Funk", tags:["G-Funk","West Coast"], tier:"pack", price:"20",
    buy:"seuyup", demo:"seuyup" },

  { id:"etnic-ritmik", name:"ETNIC RITMIK — Afrobeat & Reggae Loops Vol.1", img:"img/packs/etnic-ritmik.jpg",
    genre:"Afro", tags:["Afrobeat","Reggae"], tier:"pack", price:"21",
    buy:"fkodxs", demo:"fkodxs" },

  /* ---------- Sample packs (Vol. series) ---------- */
  { id:"oriental-vol1", name:"Oriental — Loop Melody Vol.1", img:"img/packs/oriental-vol1.jpg",
    genre:"Oriental", tags:["Oriental","Melody Loops"], price:"7",
    buy:"oceljx", demo:"oceljx" },

  { id:"vice-city-vol4", name:"Vice City — Drum Loop Vol.4", img:"img/packs/vice-city-vol4.jpg",
    genre:"Drill", tags:["Drill","Afrotrap","Synthwave"], price:"10",
    buy:"pkesp", demo:"pkesp" },

  { id:"futur-melody", name:"Futur — 23 New Melody", img:"img/packs/futur-melody.jpg",
    genre:"Futur", tags:["Future","Melody Loops"], price:"8",
    buy:"fhzxyv", demo:"fhzxyv" },

  { id:"drums-loop-vol1", name:"Drums Loop Vol.1", img:"img/packs/drums-loop-vol1.jpg",
    genre:"Drums", tags:["Drums","Loops"], price:"6",
    buy:"czpvfx", demo:"czpvfx" },

  { id:"break-ya-neck-vol2", name:"Break Ya Neck — Hip-Hop Vol.2", img:"img/packs/break-ya-neck-vol2.jpg",
    genre:"Hip-Hop", tags:["Hip-Hop","Drum Loops"], tier:"pack", price:"18",
    buy:"break-ya-neck-vol2", demo:"break-ya-neck-vol2" },

  { id:"ziploc-vol3", name:"Ziploc — Blue Pack Vol.3", img:"img/packs/ziploc-vol3.jpg",
    genre:"Afrotrap", tags:["Afrotrap","Hip-Hop","Trap"], price:"10",
    buy:"ghruf", demo:"ghruf" },
];
