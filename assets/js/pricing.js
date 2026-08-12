/* ============================================================
   DJBILBOX BEATS — ROTATING PROMO ENGINE
   ------------------------------------------------------------
   Modèle repris d'Apeshyt808 : un prix catalogue unique et élevé
   ($97 par plugin), jamais payé, et une promo qui tourne
   plusieurs fois par mois. Le visiteur voit toujours un prix
   barré + un prix du moment + un compte à rebours.

   Le calendrier est déterministe (basé sur le jour du mois), donc
   il tourne tout seul, sans republier le site : le 1er, le 8, le
   15 et le 22 de chaque mois la promo change d'elle-même.

   /!\ CÔTÉ GUMROAD — sans ça le site ment au visiteur :
   1. Le prix catalogue de chaque plugin doit valoir LIST.pro ($97)
      et le bundle LIST.bundle ($295).
   2. Chaque code ci-dessous doit exister comme "discount code"
      Gumroad (montant fixe pour pro/bundle, pourcentage pour les
      packs), valable sur tous les produits du tier concerné.
   Les liens d'achat sont construits en /l/<slug>/<CODE> : la remise
   s'applique toute seule à l'ouverture de la page produit.
   ============================================================ */
window.PRICING = (function () {

  /* Prix catalogue (le prix barré). Doit égaler le prix Gumroad réel.
     `pro`       = un plugin seul (MATRIX, MASTERING, BIGBASS, VICE CITY,
                   ORIENTAL INSTRUMENT).
     `legendary` = STATION SYNTH + ses 11 librairies (4128 presets). Modèle
                   Apeshyt Rampage : le synthé est gratuit, ce sont les
                   librairies qui se vendent — et il y en a 7× plus que les
                   6 extensions à $343 d'Apeshyt.
     `bundle`    = PRO BUNDLE, tout le catalogue ($1182 pièce par pièce). */
  const LIST = { pro: 97, legendary: 697, bundle: 997 };

  /* Le calendrier. `day` = jour du mois où la période démarre.
     `pro`/`legendary`/`bundle` = prix affiché pendant la période.
     `packOff` = remise en % appliquée aux sample packs / drum kits.
     `codes` = codes de réduction Gumroad correspondants.            */
  const CAMPAIGNS = [
    { day: 1,  key: 'drop',    name: 'NEW MONTH DROP',       tag: '🔥 New month drop',
      pro: 67, legendary: 497, bundle: 597, packOff: 30,
      codes: { pro: 'DROP67', legendary: 'SYNTH497', bundle: 'BUNDLE597', pack: 'PACK30' } },

    { day: 8,  key: 'flash',   name: 'MID-MONTH FLASH SALE', tag: '⚡ Flash sale',
      pro: 47, legendary: 343, bundle: 497, packOff: 50,
      codes: { pro: 'FLASH47', legendary: 'SYNTH343', bundle: 'BUNDLE497', pack: 'PACK50' } },

    { day: 15, key: 'proweek', name: 'PRO WEEK',             tag: '💎 Pro week',
      pro: 77, legendary: 597, bundle: 797, packOff: 20,
      codes: { pro: 'PROWEEK77', legendary: 'SYNTH597', bundle: 'BUNDLE797', pack: 'PACK20' } },

    { day: 22, key: 'blowout', name: 'END OF MONTH BLOWOUT', tag: '💣 Blowout',
      pro: 30, legendary: 197, bundle: 297, packOff: 60,
      codes: { pro: 'BLOWOUT30', legendary: 'SYNTH197', bundle: 'BUNDLE297', pack: 'PACK60' } }
  ];

  /* ---------- période courante + date de fin ---------- */
  function current(now) {
    now = now || new Date();
    const d = now.getDate();
    let idx = 0;
    for (let i = 0; i < CAMPAIGNS.length; i++) if (d >= CAMPAIGNS[i].day) idx = i;
    const camp = CAMPAIGNS[idx];
    /* fin = début de la période suivante, ou le 1er du mois suivant */
    const next = CAMPAIGNS[idx + 1];
    const ends = next
      ? new Date(now.getFullYear(), now.getMonth(), next.day, 0, 0, 0)
      : new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
    return Object.assign({}, camp, { ends: ends, index: idx, total: CAMPAIGNS.length });
  }

  /* ---------- formatage ---------- */
  function money(n) {
    const v = Math.round(n * 100) / 100;
    return Number.isInteger(v) ? String(v) : v.toFixed(2);
  }

  /* Prix promo d'un tier. `listPrice` sert aux packs, dont le prix
     catalogue est propre à chaque produit.                          */
  function priceFor(tier, listPrice, camp) {
    camp = camp || current();
    if (tier === 'pro')       return { now: camp.pro,       list: LIST.pro,       code: camp.codes.pro };
    if (tier === 'legendary') return { now: camp.legendary, list: LIST.legendary, code: camp.codes.legendary };
    if (tier === 'bundle')    return { now: camp.bundle,    list: LIST.bundle,    code: camp.codes.bundle };
    if (tier === 'pack') {
      const base = parseFloat(listPrice) || 0;
      return { now: Math.max(1, base * (1 - camp.packOff / 100)), list: base, code: camp.codes.pack };
    }
    return null;
  }

  /* Colle le code promo au slug Gumroad : /l/<slug>/<CODE>.
     Une URL externe complète est laissée telle quelle.               */
  function withCode(buy, code) {
    if (!buy || !code) return buy;
    if (/^https?:\/\//.test(buy)) return buy;
    if (buy.indexOf('/') !== -1) return buy;          /* code déjà collé */
    return buy + '/' + code;
  }

  /* ---------- application au catalogue ----------
     Ne touche QUE les entrées portant un `tier` explicite : les
     produits partenaires (FL Studio, Vital, Apeshyt…) et les démos
     gratuites gardent leur prix.                                     */
  function applyTo(item, camp) {
    if (!item || !item.tier || item.free) return item;
    const p = priceFor(item.tier, item.price, camp);
    if (!p) return item;
    item.old   = money(p.list);
    item.price = money(p.now);
    item.promo = { code: p.code, camp: camp.key, name: camp.name };
    item.buy   = withCode(item.buy, p.code);
    return item;
  }

  function applyAll() {
    const camp = current();
    if (Array.isArray(window.VSTS))  window.VSTS.forEach(i => applyTo(i, camp));
    if (Array.isArray(window.PACKS)) window.PACKS.forEach(i => applyTo(i, camp));
    if (window.PRODUCTS) Object.keys(window.PRODUCTS).forEach(k => applyTo(window.PRODUCTS[k], camp));
    return camp;
  }

  /* ---------- compte à rebours ---------- */
  function remaining(ends) {
    let ms = ends - new Date();
    if (ms < 0) ms = 0;
    const d = Math.floor(ms / 86400000);
    const h = Math.floor(ms % 86400000 / 3600000);
    const m = Math.floor(ms % 3600000 / 60000);
    const s = Math.floor(ms % 60000 / 1000);
    return d > 0 ? `${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`
                 : `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  }

  /* ---------- bandeau promo ---------- */
  function bannerHtml(camp) {
    const save = Math.round((1 - camp.pro / LIST.pro) * 100);
    return `
      <div class="promo-strip-in">
        <span class="ps-tag">${camp.tag}</span>
        <span class="ps-text">
          Every DJBILBOX plugin <s>$${LIST.pro}</s> <b>$${camp.pro}</b>
          — save ${save}% · STATION SYNTH <s>$${LIST.legendary}</s> <b>$${camp.legendary}</b>
          · PRO BUNDLE <s>$${LIST.bundle}</s> <b>$${camp.bundle}</b>
        </span>
        <span class="ps-timer">Ends in <b data-djb-countdown>—</b></span>
        <a class="ps-cta" href="/vst.html">Shop the sale</a>
      </div>`;
  }

  const CSS = `
  .promo-strip{background:linear-gradient(90deg,#0e3b28,#123b2c 40%,#0b1a14);
    border-bottom:1px solid rgba(180,255,214,.22);color:#eafff4;font-size:.76rem;
    position:relative;z-index:60}
  .promo-strip-in{max-width:1240px;margin:0 auto;padding:9px 18px;display:flex;
    align-items:center;gap:14px;flex-wrap:wrap;justify-content:center}
  .promo-strip .ps-tag{font-weight:800;letter-spacing:.08em;text-transform:uppercase;
    background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
    padding:3px 9px;border-radius:6px;white-space:nowrap}
  .promo-strip .ps-text s{opacity:.55}
  .promo-strip .ps-text b{color:#7dffbe;font-weight:800}
  .promo-strip .ps-timer{font-variant-numeric:tabular-nums;opacity:.9;white-space:nowrap}
  .promo-strip .ps-timer b{color:#fff}
  .promo-strip .ps-cta{background:#7dffbe;color:#05130d;font-weight:800;
    text-transform:uppercase;letter-spacing:.05em;font-size:.68rem;padding:6px 13px;
    border-radius:7px;white-space:nowrap;transition:.18s}
  .promo-strip .ps-cta:hover{background:#fff;transform:translateY(-1px)}
  @media(max-width:640px){.promo-strip{font-size:.68rem}
    .promo-strip-in{gap:8px;padding:8px 12px}}
  .djb-save{display:inline-block;background:rgba(125,255,190,.14);color:#7dffbe;
    border:1px solid rgba(125,255,190,.35);border-radius:5px;padding:2px 6px;
    font-size:.6rem;font-weight:800;letter-spacing:.04em;margin-left:6px;vertical-align:middle}
  `;

  function mount() {
    const camp = current();

    /* styles */
    if (!document.getElementById('djb-pricing-css')) {
      const st = document.createElement('style');
      st.id = 'djb-pricing-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    /* bandeau, juste sous la barre de navigation */
    if (!document.body.hasAttribute('data-no-promo') && !document.querySelector('.promo-strip')) {
      const strip = document.createElement('div');
      strip.className = 'promo-strip';
      strip.innerHTML = bannerHtml(camp);
      const bar = document.querySelector('header.topbar');
      if (bar) bar.insertAdjacentElement('afterend', strip);
      else document.body.prepend(strip);
    }

    /* jetons de prix dans les pages produit :
       <span data-djb-price="pro">, "pro-old", "bundle", "bundle-old",
       "promo-name", "save-pct"                                        */
    document.querySelectorAll('[data-djb-price]').forEach(el => {
      const k = el.getAttribute('data-djb-price');
      const map = {
        'pro': '$' + camp.pro,
        'pro-old': '$' + LIST.pro,
        'legendary': '$' + camp.legendary,
        'legendary-old': '$' + LIST.legendary,
        'bundle': '$' + camp.bundle,
        'bundle-old': '$' + LIST.bundle,
        'promo-name': camp.name,
        'save-pct': Math.round((1 - camp.pro / LIST.pro) * 100) + '%'
      };
      if (map[k] !== undefined) el.textContent = map[k];
    });

    /* compte à rebours */
    const tick = () => {
      const txt = remaining(camp.ends);
      document.querySelectorAll('[data-djb-countdown]').forEach(el => el.textContent = txt);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* Le catalogue est appliqué tout de suite (les scripts de données
     sont chargés avant celui-ci), le bandeau une fois le DOM prêt et
     l'en-tête injecté par site.js — d'où le setTimeout.              */
  const camp = applyAll();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(mount, 0));
  } else {
    setTimeout(mount, 0);
  }

  return { LIST, CAMPAIGNS, current, priceFor, applyAll, applyTo, money, remaining, mount, active: camp };
})();
