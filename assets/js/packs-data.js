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
  /* ---------- New release (2026) ---------- */
  { id:"westcoast-vybes-vol01", name:"WESTCOAST VYBES Vol.01 — G-Funk Melody Loops", img:"img/packs/westcoast-vybes-vol01.jpg",
    genre:"West Coast", tags:["West Coast","G-Funk","Melody Loops","Hip-Hop"], price:"5",
    buy:"westcoast-vybes-vol01", demo:"westcoast-vybes-vol01-demo" },

  { id:"kit-drum-funk", name:"KIT DRUM FUNK — Professional Drum Kit", img:"img/packs/kit-drum-funk.jpg",
    genre:"Funk", tags:["Funk","Drum Kit","MIDI","One-Shots"], tier:"pack", price:"5",
    buy:"ejmwmz", demo:"ejmwmz" },

  { id:"west-side", name:"KIT DRUM WEST SIDE — 2Pac, Snoop Dogg & The Game", img:"img/packs/west-side.jpg",
    genre:"West Coast", tags:["West Coast","G-Funk","Hip-Hop","MIDI"], price:"19",
    buy:"west-side-drum-kit", demo:"west-side-drum-kit" },

  /* ---------- Premium kits (2026) ---------- */
  { id:"tone-vault", name:"TONE VAULT — Ultimate Instrument One-Shots", img:"img/packs/tone-vault.jpg",
    genre:"One-Shots", tags:["One-Shots","Instruments"], tier:"pack", price:"16",
    buy:"yrkzl" },

  { id:"void-signals", name:"VOID SIGNALS — 19GB SFX & Cinematic Suite", img:"img/packs/void-signals.jpg",
    genre:"SFX", tags:["SFX","Cinematic"], price:"34",
    buy:"mkijdn", demo:"mkijdn" },

  { id:"ghost-voice", name:"GHOST VOICE — Vocal Hooks & Acapellas", img:"img/packs/ghost-voice.jpg",
    genre:"Vocals", tags:["Vocals","Acapellas"], price:"15",
    buy:"fnpdxf", demo:"fnpdxf" },

  { id:"raw-elements", name:"RAW ELEMENTS — Ultimate One-Shot Drum Kit", img:"img/packs/raw-elements.jpg",
    genre:"One-Shots", tags:["Drums","One-Shots"], price:"17",
    buy:"pohwt", demo:"pohwt" },

  { id:"vinyl-breaker", name:"VINYL BREAKER — Scratch & Vinyl Sample Kit", img:"img/packs/vinyl-breaker.jpg",
    genre:"Hip-Hop", tags:["Vinyl","Hip-Hop"], tier:"pack", price:"13",
    buy:"yecrn", demo:"yecrn" },

  { id:"neon-pulse", name:"NEON PULSE — House & Techno Drum Loops", img:"img/packs/neon-pulse.jpg",
    genre:"House", tags:["House","Techno"], tier:"pack", price:"12",
    buy:"argerk", demo:"argerk" },

  { id:"concrete-vault", name:"CONCRETE VAULT — Trap & Drill Drum Loops", img:"img/packs/concrete-vault.jpg",
    genre:"Trap", tags:["Trap","Drill"], tier:"pack", price:"12",
    buy:"ecrmh", demo:"ecrmh" },

  { id:"westcoast-chrome", name:"WESTCOAST CHROME — G-Funk Drum Loops", img:"img/packs/westcoast-chrome.jpg",
    genre:"G-Funk", tags:["G-Funk","West Coast"], tier:"pack", price:"13",
    buy:"seuyup", demo:"seuyup" },

  { id:"etnic-ritmik", name:"ETNIC RITMIK — Afrobeat & Reggae Loops Vol.1", img:"img/packs/etnic-ritmik.jpg",
    genre:"Afro", tags:["Afrobeat","Reggae"], tier:"pack", price:"14",
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
    genre:"Hip-Hop", tags:["Hip-Hop","Drum Loops"], tier:"pack", price:"11",
    buy:"break-ya-neck-vol2", demo:"break-ya-neck-vol2" },

  { id:"ziploc-vol3", name:"Ziploc — Blue Pack Vol.3", img:"img/packs/ziploc-vol3.jpg",
    genre:"Afrotrap", tags:["Afrotrap","Hip-Hop","Trap"], price:"12",
    buy:"ghruf", demo:"ghruf" },
];
