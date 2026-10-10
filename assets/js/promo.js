/* ============================================================
   PROMO −30 % — vrai code Gumroad HUMPIRE30
   ------------------------------------------------------------
   Créé le 2026-10-10 sur Gumroad (Checkout > Discounts) : −30 %,
   valable jusqu'au 24 octobre 2026 23:59 (heure de Paris), sur
   34 produits. Le code est collé automatiquement aux liens
   d'achat (/l/<slug>/HUMPIRE30), donc le client paie exactement
   le prix affiché.

   ELIGIBLE doit rester IDENTIQUE à la liste des produits du code
   côté Gumroad. Un produit affiché en promo ici mais absent du
   code serait facturé plein tarif (et inversement). Vérifier avec
   un lien /l/<slug>/HUMPIRE30 : `discount_code.valid` doit valoir
   true.

   Exclus volontairement (bil, 2026-10-10) : les nouveautés et les
   produits dont le prix vient de changer — HUMPIRE VST SUITE et
   ses 7 plugins, ROBOTALK, STATION SYNTH, ORIENTAL INSTRUMENT,
   THUGLIFE, BIGBASS, VICE CITY (passés à 99 $ le 2026-10-10),
   PRO BUNDLE, bundles de plugins et de packs, EQ-PRO SPIDER. Un
   prix barré doit être le prix le plus bas des 30 jours
   précédents (règle UE) : pas de « −30 % » sur un prix relevé
   cette semaine.

   Après la date de fin, tout redevient normal sans rien toucher.
   ============================================================ */
window.Promo = (function () {
  const CODE = 'HUMPIRE30';
  const PERCENT = 30;
  const UNTIL = Date.parse('2026-10-24T23:59:00+02:00');

  /* slugs d'achat utilisés par le site + permalinks courts Gumroad */
  const ELIGIBLE = new Set([
    // plugins
    'ocpoej',                       // MATRIX MODULAR
    'mastering', 'vptjlg',          // MASTERING
    // pédales
    'pharaoh-comp', 'wrvnxn', 'surf-tremolo', 'krwhfy', 'neon-phaser', 'lqcun',
    'coral-chorus', 'nxkwfd', 'aurora-verb', 'dzranx', 'canyon-echo', 'cbbot',
    'lava-fuzz', 'gjebft', 'storm-rider', 'hfmjow', 'camel-pedal', 'fimvw',
    'jet-flanger', 'lbceu', 'camel-pedals', 'awwbw',
    // packs et kits
    'westcoast-vybes-vol01', 'tbycyi', 'ejmwmz', 'west-side-drum-kit', 'tiyemt',
    'yrkzl', 'mkijdn', 'fnpdxf', 'pohwt', 'yecrn', 'argerk', 'ecrmh', 'seuyup',
    'fkodxs', 'oceljx', 'pkesp', 'fhzxyv', 'czpvfx', 'break-ya-neck-vol2',
    'zpcjxk', 'ghruf'
  ]);

  const num = v => parseFloat(String(v).replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
  const active = () => Date.now() < UNTIL;
  const ok = buy => active() && ELIGIBLE.has(buy);
  /* arrondi au centime, comme Gumroad (prix en cents × 70 %) */
  const sale = list => Math.round(num(list) * (100 - PERCENT)) / 100;
  const fmt = n => '$' + (Number.isInteger(n) ? n : n.toFixed(2));

  return {
    CODE, PERCENT, UNTIL, active, ok, num, sale, fmt,
    codeFor: buy => (ok(buy) ? CODE : ''),
    /* prix réellement payé pour ce produit (nombre) */
    price: (buy, list) => (ok(buy) ? sale(list) : num(list))
  };
})();
