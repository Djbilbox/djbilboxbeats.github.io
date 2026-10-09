/* ============================================================
   DJBILBOX BEATS — PRIX RÉELS
   ------------------------------------------------------------
   2026-08-24 : le moteur de promo rotatif a été RETIRÉ.

   Il annonçait un prix catalogue de $97 par plugin et une remise
   qui tournait 4 fois par mois (DROP67 / FLASH47 / PROWEEK77 /
   BLOWOUT30), codes collés aux liens d'achat en /l/<slug>/<CODE>.
   Deux problèmes : ces codes n'existaient plus sur Gumroad, et
   les prix Gumroad sont descendus à $10-$39. Le site affichait
   donc « $97 barré → $30 » pour un produit vendu $10.

   RÈGLE : le site n'invente JAMAIS un prix. Le champ `price` de
   vst-data.js / packs-data.js / products-data.js DOIT égaler le
   prix Gumroad réel. Ce fichier ne fait plus que :
     1. retirer tout prix barré / code promo résiduel ;
     2. remplir les jetons <span data-djb-price="…"> des pages.

   Si une vraie promo redémarre un jour : créer les codes sur
   Gumroad D'ABORD, vérifier qu'ils s'appliquent au checkout,
   et seulement ensuite les rebrancher ici.
   ============================================================ */
window.PRICING = (function () {

  /* Prix Gumroad réels par tier (vérifiés le 2026-08-24).
     `pro` vaut $15 (THUGLIFE, BIGBASS, VICE CITY) ; MASTERING et
     MATRIX MODULAR sont à $10 et portent leur prix en propre dans
     les fichiers de données — ce tableau ne sert qu'aux jetons
     d'affichage des pages produit. */
  const LIST = { pro: 15, oriental: 50, legendary: 99, bundle: 39 };

  function money(n) {
    const v = Math.round(n * 100) / 100;
    return Number.isInteger(v) ? String(v) : v.toFixed(2);
  }

  /* Plus de remise : le prix affiché EST le prix catalogue. */
  function priceFor(tier, listPrice) {
    if (tier === 'pack') {
      const b = parseFloat(listPrice) || 0;
      return { now: b, list: b, code: '' };
    }
    const v = LIST[tier];
    return v === undefined ? null : { now: v, list: v, code: '' };
  }

  /* Nettoie une entrée de catalogue : pas de prix barré, pas de
     code collé au slug Gumroad. `price` est laissé tel quel, il
     vient des fichiers de données et doit égaler Gumroad. */
  function applyTo(item) {
    if (!item) return item;
    delete item.old;
    delete item.promo;
    if (typeof item.buy === 'string' && !/^https?:\/\//.test(item.buy) && item.buy.indexOf('/') !== -1) {
      item.buy = item.buy.split('/')[0];
    }
    return item;
  }

  function applyAll() {
    if (Array.isArray(window.VSTS))  window.VSTS.forEach(i => applyTo(i));
    if (Array.isArray(window.PACKS)) window.PACKS.forEach(i => applyTo(i));
    if (window.PRODUCTS) Object.keys(window.PRODUCTS).forEach(k => applyTo(window.PRODUCTS[k]));
  }

  /* Jetons de prix des pages produit. Ceux hérités du moteur de
     promo (`*-old`, `save-pct`, `promo-name`, compte à rebours)
     n'ont plus de sens : on masque l'élément au lieu d'afficher
     un faux prix barré. */
  function mount() {
    const REAL = {
      'pro':       '$' + LIST.pro,
      'oriental':  '$' + LIST.oriental,
      'legendary': '$' + LIST.legendary,
      'bundle':    '$' + LIST.bundle
    };
    const DEAD = ['pro-old', 'oriental-old', 'legendary-old', 'bundle-old', 'save-pct', 'promo-name'];

    document.querySelectorAll('[data-djb-price]').forEach(el => {
      const k = el.getAttribute('data-djb-price');
      if (REAL[k] !== undefined) { el.textContent = REAL[k]; return; }
      if (DEAD.indexOf(k) !== -1) { el.hidden = true; el.style.display = 'none'; }
    });

    document.querySelectorAll('[data-djb-countdown]').forEach(el => {
      el.hidden = true; el.style.display = 'none';
    });

    /* au cas où un bandeau promo traînerait dans une page en cache */
    document.querySelectorAll('.promo-strip').forEach(el => el.remove());
  }

  applyAll();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(mount, 0));
  } else {
    setTimeout(mount, 0);
  }

  return { LIST, priceFor, applyAll, applyTo, money, mount };
})();
