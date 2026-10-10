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

   Exclus volontairement (bil, 2026-10-10) : HUMPIRE VST SUITE et ses 7
   plugins (BLOCK GORILLA, CASBAH CHORDS, TAXI ALGER, CAMEL PILOT, ALIEN 808,
   CHOCOLATINE, LA BAGUETTE), JUKEBOX NEW YORK, le bundle 25 plugins (il
   contient la Suite) et EQ-PRO SPIDER. Tout le reste est à −30 %, y compris
   les prix relevés le jour même : le client doit pouvoir vérifier que le
   prix de référence (barré) est bien le plus bas des 30 jours précédents.

   Après la date de fin, tout redevient normal sans rien toucher.
   ============================================================ */
window.Promo = (function () {
  const CODE = 'HUMPIRE30';
  const PERCENT = 30;
  const UNTIL = Date.parse('2026-10-24T23:59:00+02:00');

  /* slugs d'achat utilisés par le site + permalinks courts Gumroad */
  const ELIGIBLE = new Set([
    // plugins et instruments (slug personnalisé + permalink court)
    'station-synth-legendary-bundle', 'ozpudm',
    'thuglife', 'quwjty',
    'oriental-instrument-djbilbox-beats', 'zfhkh',
    'xaziro',                       // BIGBASS
    'ykdzli',                       // VICE CITY
    'jvdta',                        // ROBOTALK
    'ocpoej',                       // MATRIX MODULAR
    'mastering', 'vptjlg',          // MASTERING
    // bundles
    'djbilbox-pro-bundle', 'zufkrv',
    'fhpnge',                       // bundle des 16 packs payants
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

  /* prix écrits en dur dans les pages statiques : <span data-djb-sale="slug" data-list="99">$99</span> */
  function paint() {
    document.querySelectorAll('[data-djb-sale]').forEach(el => {
      const slug = el.getAttribute('data-djb-sale'), list = el.getAttribute('data-list');
      if (ok(slug)) el.innerHTML = '<s style="opacity:.55;font-weight:500">' + fmt(num(list)) + '</s> ' + fmt(sale(list));
    });
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint); else paint();
  }

  return {
    CODE, PERCENT, UNTIL, active, ok, num, sale, fmt, paint,
    codeFor: buy => (ok(buy) ? CODE : ''),
    /* prix réellement payé pour ce produit (nombre) */
    price: (buy, list) => (ok(buy) ? sale(list) : num(list))
  };
})();
