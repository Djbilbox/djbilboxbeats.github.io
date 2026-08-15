/* ============================================================
   DJBILBOX BEATS — Shared site JS
   Header (mobile menu), cart, promo bar, card rendering + filters.
   Reusable across pages. Load AFTER beats-data.js where needed.
   ============================================================ */

/* Community + contact hub — every "Contact" CTA routes here. */
const DISCORD_URL = 'https://discord.gg/7HeMSvbN';

/* ============================================================
   Google Analytics 4 (GA4) — loaded site-wide from here so EVERY
   page (incl. /locations/*) is tracked from one place.
   Real measurement ID: G-QB74GVD5RT
   ============================================================ */
(function(){
  var GA_ID = 'G-QB74GVD5RT';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

/* ============================================================
   SIDEBAR — shared left navigation, injected on every page.
   Each page sets <body data-page="KEY"> to highlight its link.
   ============================================================ */
/* First NAV_SPLIT entries render under "Browse", the rest under "Library". */
const NAV_SPLIT = 9;
const NAV = [
  { key:'music',       label:'Music',        href:'/beats-redesign.html',      icon:'fa-music' },
  { key:'beatmaker',   label:'Beatmaker',    href:'/beatmaker.html',           icon:'fa-headphones' },
  { key:'shop',        label:'Shop',         href:'/shop.html',                icon:'fa-store' },
  { key:'synths',      label:'Synths',       href:'/shop.html#synths',         icon:'fa-star' },
  { key:'effects',     label:'Effects',      href:'/shop.html#effects',        icon:'fa-sliders' },
  { key:'drum-kits',   label:'Drum Kits',    href:'/shop.html#kits',           icon:'fa-drum' },
  { key:'mastering',   label:'Mastering',    href:'/ai-mastering.html',        icon:'fa-wand-magic-sparkles' },
  { key:'video',       label:'Video Studio', href:'/video-studio.html',        icon:'fa-clapperboard' },
  { key:'setup',       label:'Info',         href:'/studio-setup.html',        icon:'fa-circle-info' },
  { key:'contact',     label:'Contact',      href:'/contact.html',             icon:'fa-envelope' },
  { key:'account',     label:'My Account',   href:'/account.html',             icon:'fa-user' },
  { key:'license',     label:'License',      href:'/license.html',             icon:'fa-id-card' },
];

function mountSidebar(active){
  if(document.querySelector('.sidebar')) return;
  const browseItems = NAV.slice(0, NAV_SPLIT);
  const libraryItems = NAV.slice(NAV_SPLIT);
  const links =
    `<div class="side-section-label">Browse</div>` +
    browseItems.map(n=>
      `<a href="${n.href}"${n.key===active?' class="active"':''}><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`
    ).join('') +
    `<div class="side-section-label">Library</div>` +
    libraryItems.map(n=>
      `<a href="${n.href}"${n.key===active?' class="active"':''}><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`
    ).join('');

  /* Centre links of the top bar — the primary destinations only.
     Everything else lives in the footer sitemap.                */
  const topLinks = NAV.slice(0, NAV_SPLIT).map(n =>
    `<a href="${n.href}"${n.key===active?' class="active"':''}>${n.label}</a>`
  ).join('');

  const header = document.createElement('header');
  header.className='topbar';
  header.innerHTML = `
    <div class="topbar-in">
      <a href="/index.html" class="brand brand-logo"><img src="/img/humpire-logo.png" alt="HUMPIRE"><span>HUM<span>PIRE</span></span></a>

      <nav class="top-nav">${topLinks}</nav>

      <div class="top-actions">
        <a href="/cart.html" class="icon-btn" aria-label="Cart">
          <i class="fa-solid fa-bag-shopping"></i><span class="badge" data-cart-badge>0</span>
        </a>
        <a href="/account.html" class="top-btn ghost" data-auth-in>Sign In</a>
        <a href="/account.html" class="top-btn solid" data-auth-up>Sign Up</a>
        <button class="nav-burger" onclick="toggleNav()" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div>

    <nav class="top-drawer" id="topDrawer">
      ${NAV.map(n=>`<a href="${n.href}"${n.key===active?' class="active"':''}><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`).join('')}
      <div class="drawer-social">
        <a href="${DISCORD_URL}" target="_blank" rel="noopener" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
        <a href="https://open.spotify.com/artist/2wP5nwScAUiXF6Esc4x0hG" target="_blank" rel="noopener" aria-label="Spotify"><i class="fa-brands fa-spotify"></i></a>
        <a href="https://www.youtube.com/@djbilboxbeats" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        <a href="https://www.twitch.tv/djbilbox" target="_blank" rel="noopener" aria-label="Twitch"><i class="fa-brands fa-twitch"></i></a>
        <a href="https://kick.com/djbilbox" target="_blank" rel="noopener" aria-label="Kick"><i class="fa-solid fa-tower-broadcast"></i></a>
      </div>
    </nav>`;

  const overlay = document.createElement('div');
  overlay.className='side-overlay';
  overlay.onclick=toggleNav;

  const ticker = document.createElement('div');
  ticker.className='top-ticker';
  const tickerItems = [
    'HUMPIRE FAM','KEEP GOIN\' HUMPIRE','BUY 1 GET 1 FREE','BUY 3 GET 3 FREE',
    'BUY 5 GET 5 FREE','AUTO-APPLIES AT CHECKOUT','857+ DOWNLOADS','FREE STATION SYNTH BASIC'
  ];
  const tickerHtml = tickerItems.map(t=>`<span>${t}</span>`).join('');
  ticker.innerHTML = `<div class="top-ticker-track">${tickerHtml}${tickerHtml}</div>`;

  document.body.prepend(overlay, header, ticker);
  reflectAuthState();
  Cart.refresh();
}

function toggleNav(){
  document.getElementById('topDrawer')?.classList.toggle('open');
  document.querySelector('.side-overlay')?.classList.toggle('show');
}

/* If a member is already signed in (account.html stores the session),
   collapse the two auth buttons into a single "My Account" pill. */
function reflectAuthState(){
  let s=null;
  try{ s=JSON.parse(localStorage.getItem('djb_session')); }catch(e){}
  if(!s) return;
  const inBtn=document.querySelector('[data-auth-in]');
  const upBtn=document.querySelector('[data-auth-up]');
  if(inBtn) inBtn.remove();
  if(upBtn){
    upBtn.textContent = (s.name||'My Account').split(' ')[0];
    upBtn.setAttribute('title','My Account');
  }
}

/* Shared footer — injected if the page has no <footer> */
/* ============================================================
   FOOTER — multi-column sitemap (Quick links / Legal / Creators /
   Follow / Contact). Every entry points at a page that exists.
   ============================================================ */
const FOOTER_COLS = [
  { t:'Quick links', links:[
    ['Home','/index.html'],
    ['Music','/beats-redesign.html'],
    ['Shop','/shop.html'],
    ['ORIENTAL INSTRUMENT','/oriental-instrument.html'],
    ['Mastering','/ai-mastering.html'],
    ['Video Studio','/video-studio.html'],
    ['Drum Kits','/drum-kits.html'],
    ['VST Plugins','/vst.html'],
    ['Studio Setup','/studio-setup.html'],
    ['Services','/services.html'],
    ['Discography','/discography.html'],
    ['Playlists','/playlists.html'],
    ['News','/news.html'],
    ['Reviews','/reviews.html'],
    ['Blog','/blog.html'],
    ['DJBILBOX Zombies','/game/index.html'],
  ]},
  { t:'Legal', links:[
    ['Beat Licensing','/license.html'],
    ['Pricing','/pricing-2026.html'],
    ['Contact','/contact.html'],
    ['My Account','/account.html'],
  ]},
  { t:'For Creators', links:[
    ['Free Beats','/beats-redesign.html'],
    ['Free VST Plugins','/free-vst.html'],
    /* free-bundle.html is only a redirect stub to vst.html — link the
       real free pack instead of bouncing the visitor through it.
       URL written out: BIG_PACK is declared further down this file, so
       referencing it here would hit the const temporal dead zone. */
    ['931 Beats Free Pack', 'https://djbilboxbeats.gumroad.com/l/djbilbox-beats-big-pack-931-beats'],
    ['Academy (Discord)', DISCORD_URL],
    ['Mix & Master','/services.html'],
    ['Global Cities','/locations/index.html'],
  ]},
  { t:'Follow DJBILBOX', links:[
    ['YouTube','https://www.youtube.com/@djbilboxbeats'],
    ['Spotify','https://open.spotify.com/artist/2wP5nwScAUiXF6Esc4x0hG'],
    ['Twitch','https://www.twitch.tv/djbilbox'],
    ['Kick','https://kick.com/djbilbox'],
    ['Discord', DISCORD_URL],
    ['Gumroad','https://djbilboxbeats.gumroad.com'],
  ]},
];

function mountFooter(){
  if(document.querySelector('.footer')) return;
  const ext = h => /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '';
  const cols = FOOTER_COLS.map(c =>
    `<div class="fcol"><h4>${c.t}</h4>` +
    c.links.map(([l,h]) => `<a href="${h}"${ext(h)}>${l}</a>`).join('') +
    `</div>`
  ).join('');

  const f=document.createElement('footer');
  f.className='footer';
  f.innerHTML=`<div class="container">
    <div class="footer-cols">
      ${cols}
      <div class="fcol">
        <h4>Contact</h4>
        <a href="mailto:djbilboxbeats@gmail.com">djbilboxbeats@gmail.com</a>
        <span>DJBILBOX BEATS</span>
        <span>Bilel Abdelkader Attalah</span>
        <span>Toulouse, France</span>
        <div class="footer-social">
          <a href="https://open.spotify.com/artist/2wP5nwScAUiXF6Esc4x0hG" target="_blank" rel="noopener" aria-label="Spotify"><i class="fa-brands fa-spotify"></i></a>
          <a href="https://www.youtube.com/@djbilboxbeats" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          <a href="https://www.twitch.tv/djbilbox" target="_blank" rel="noopener" aria-label="Twitch"><i class="fa-brands fa-twitch"></i></a>
          <a href="https://kick.com/djbilbox" target="_blank" rel="noopener" aria-label="Kick"><i class="fa-solid fa-tower-broadcast"></i></a>
          <a href="${DISCORD_URL}" target="_blank" rel="noopener" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-copy">
      DJBILBOX BEATS — Bilel Abdelkader Attalah · 4 rue Virginia Woolf, 31200 Toulouse, France<br>
      © 2026 DJBILBOX BEATS — All rights reserved.
    </div>
  </div>`;
  document.body.appendChild(f);
}

/* L'assistant de chat a ete retire du site. */

/* Default promo (BIG PACK) — injected if the page has no .promo-bar */
function mountPromo(){
  if(document.querySelector('.promo-bar')) return;
  const p=document.createElement('div');
  p.className='promo-bar';
  p.innerHTML=`<strong>🔥 931 Beats Free</strong> — Download the DJBILBOX BIG PACK · free for profit.
    <a href="${gumroadUrl(BIG_PACK)}" target="_blank" class="promo-cta">Get the pack</a>
    <button class="promo-close" onclick="closePromo()" aria-label="Close">✕</button>`;
  document.body.appendChild(p);
}

/* Add Google Analytics 4 to all pages */
function injectGA4(){
  if(document.querySelector('script[src*="googletagmanager"]')) return;
  const s1=document.createElement('script');
  s1.async=true;
  s1.src='https://www.googletagmanager.com/gtag/js?id=G-DJBILBOX001';
  document.head.appendChild(s1);
  const s2=document.createElement('script');
  s2.textContent=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DJBILBOX001',{'page_path':location.pathname,'page_title':document.title});`;
  document.head.appendChild(s2);
}

/* Le selecteur de langues a ete retire : le site est en anglais.
   Il montait un widget Google Translate qui reecrivait le DOM apres coup
   et injectait sa propre barre d'outils par-dessus la mise en page. */

document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!==undefined){
    mountSidebar(document.body.dataset.page);
    mountFooter();
    mountPromo();
  }
  injectGA4();
  /* Google Translate widget disabled — the injected bar/branding looked ugly.
     (Widget hidden via CSS and the script no longer loaded.) */
});

/* ---------- Sticky promo dismiss ---------- */
function closePromo(){
  document.querySelector('.promo-bar')?.classList.add('hidden');
  document.body.style.paddingBottom = '0';
}

/* ---------- Cart (localStorage) + slide-out drawer ----------
   Accumulate any product (packs, VST, services…) then check out on
   Gumroad in one go. Each item stores its Gumroad ref in `buy`. */
const Cart = {
  key:'djb_cart',
  promoKey:'djb_promo',
  get(){ try{ return JSON.parse(localStorage.getItem(this.key))||[] }catch{ return [] } },
  save(items){ localStorage.setItem(this.key, JSON.stringify(items)); this.refresh(); },
  add(item){ const c=this.get(); if(item.buy && c.some(x=>x.buy===item.buy)){ this.refresh(); return; } c.push(item); this.save(c); },
  remove(i){ const c=this.get(); c.splice(i,1); this.save(c); renderCartItems(); },
  clear(){ this.save([]); renderCartItems(); },
  total(){ return this.get().reduce((s,it)=>{ const n=parseFloat(String(it.price).replace(',','.').replace(/[^0-9.]/g,'')); return s+(isNaN(n)?0:n); },0); },
  getPromo(){ return localStorage.getItem(this.promoKey) || ''; },
  setPromo(code){ localStorage.setItem(this.promoKey, (code||'').trim().toUpperCase()); },
  refresh(){
    const n=this.get().length;
    document.querySelectorAll('[data-cart-badge]').forEach(b=>{ b.textContent=n; b.style.display=n?'flex':'none'; });
  }
};
/* "Buy 5 Get 5 Free" — once 5+ PAID items sit in the cart, 5 more paid
   plugins (not already in the cart) ride along in the same Gumroad bundle
   checkout at $0, via the BONUS_CODE 100%-off discount. Real paid plugins,
   not the already-free Basic versions. The code itself must exist on
   Gumroad (100% off, applied to every plugin) for this to actually zero
   the price at checkout. */
const FREE_BONUS_THRESHOLD = 5;
const FREE_BONUS_COUNT = 5;
const BONUS_CODE = 'GET5FREE';
function freeBonusItems(){
  if(!window.VSTS) return [];
  const cartBuys = new Set(Cart.get().map(it=>it.buy));
  const paidCount = Cart.get().filter(it=>String(it.price).toUpperCase()!=='FREE').length;
  if(paidCount < FREE_BONUS_THRESHOLD) return [];
  return window.VSTS.filter(v => !v.free && v.buy && v.category!=='partner' && !v.url && !cartBuys.has(v.buy))
    .slice(0, FREE_BONUS_COUNT);
}
function addToCart(title, price, buy){
  Cart.add({title, price, buy:buy||''});
  const badge=document.querySelector('[data-cart-badge]');
  if(badge){ badge.animate([{transform:'scale(1.7)'},{transform:'scale(1)'}],{duration:320}); }
  openCart();
}

/* drawer (injected once) */
function mountCart(){
  if(document.querySelector('.cart-drawer')) return;
  const ov=document.createElement('div'); ov.className='cart-overlay'; ov.onclick=closeCart;
  const d=document.createElement('aside'); d.className='cart-drawer';
  d.innerHTML=`
    <div class="cart-head">
      <h3><i class="fa-solid fa-bag-shopping"></i> Your cart</h3>
      <button class="cart-x" onclick="closeCart()" aria-label="Close">✕</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-foot">
      <div class="cart-total"><span>Total</span><strong id="cartTotal">FREE</strong></div>
      <a href="/cart.html" class="btn ghost" style="width:100%;justify-content:center">
        <i class="fa-solid fa-cart-shopping"></i> View full cart</a>
      <button class="btn primary" style="width:100%;justify-content:center" onclick="checkout()">
        <i class="fa-solid fa-bag-shopping"></i> Checkout on Gumroad</button>
      <button class="cart-clear" onclick="Cart.clear()">Clear cart</button>
      <p class="cart-note">Free items: just set your price to $0 on Gumroad. Paid items from the same store are paid together.</p>
    </div>`;
  document.body.append(ov,d);
}
function openCart(){ mountCart(); renderCartItems(); document.querySelector('.cart-drawer')?.classList.add('open'); document.querySelector('.cart-overlay')?.classList.add('show'); }
function closeCart(){ document.querySelector('.cart-drawer')?.classList.remove('open'); document.querySelector('.cart-overlay')?.classList.remove('show'); }
function renderCartItems(){
  const box=document.getElementById('cartItems'); if(!box) return;
  const items=Cart.get();
  if(!items.length){
    box.innerHTML='<p class="cart-empty"><i class="fa-solid fa-cart-shopping"></i><br>Your cart is empty.<br><span>Add sample kits, VST plugins or packs.</span></p>';
  }else{
    box.innerHTML=items.map((it,i)=>{
      const free=String(it.price).toUpperCase()==='FREE';
      const priceTxt=free?'FREE':(isNaN(parseFloat(it.price))?it.price:'$'+it.price);
      return `<div class="cart-item">
        <div class="ci-info"><div class="ci-name">${it.title}</div>
          <div class="ci-price${free?' free':''}">${priceTxt}</div></div>
        <a class="ci-open" href="${gumroadUrl(it.buy)}" target="_blank" rel="noopener" title="Open on Gumroad"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <button class="ci-remove" onclick="Cart.remove(${i})" title="Remove">✕</button>
      </div>`;
    }).join('');
  }
  const t=Cart.total();
  const tEl=document.getElementById('cartTotal'); if(tEl) tEl.textContent = t>0?('$'+t.toFixed(2)):'FREE';
}
/* Load Gumroad's overlay once. When several Gumroad product links exist on the
   same page, the overlay auto-bundles them into ONE payment (Bundle Buy). */
function loadGumroadOverlay(cb){
  if(window.__grLoaded){ cb&&cb(); return; }
  const s=document.createElement('script');
  s.src='https://gumroad.com/js/gumroad.js';
  s.onload=()=>{ window.__grLoaded=true; cb&&cb(); };
  s.onerror=()=>{ cb&&cb(); };
  document.head.appendChild(s);
}

function checkout(){
  const paid=Cart.get().filter(it=>it.buy);
  if(!paid.length){ openCart(); return; }
  // Buy 5 Get 5 Free — 5 more real paid plugins ride in the same bundle,
  // zeroed via the BONUS_CODE 100%-off discount (must exist on Gumroad).
  const bonus=freeBonusItems().map(v=>({title:v.name, price:v.price, buy:v.buy, bonus:true}));
  const code=Cart.getPromo();

  // Put a Gumroad overlay link for every cart item into the page so Gumroad
  // bundles them together, then open the overlay on the first one.
  let box=document.getElementById('grBundle');
  if(!box){ box=document.createElement('div'); box.id='grBundle';
            box.style.cssText='position:absolute;left:-9999px;top:-9999px'; document.body.appendChild(box); }
  const paidLinks=paid.map(it=>
    `<a class="gumroad-button" href="${gumroadUrl(it.buy,code)}" data-gumroad-overlay-checkout="true">Buy</a>`).join('');
  const bonusLinks=bonus.map(it=>
    `<a class="gumroad-button" href="${gumroadUrl(it.buy,BONUS_CODE)}" data-gumroad-overlay-checkout="true">Buy</a>`).join('');
  box.innerHTML=paidLinks+bonusLinks;

  loadGumroadOverlay(()=>{
    // give the script a tick to attach handlers to the freshly-added links
    setTimeout(()=>{
      const first=box.querySelector('a.gumroad-button');
      if(first){ first.click(); }
      else { window.open(GUMROAD_STORE,'_blank','noopener'); }
    }, 350);
  });
}

/* ---------- Gumroad checkout ----------
   Store: djbilboxbeats.gumroad.com — open the product overlay.
   Pass a full /l/<slug> url, a bare slug, or nothing (store front).
   `code` appends a real Gumroad discount code to the link (/l/<slug>/<CODE>). */
const GUMROAD_STORE='https://djbilboxbeats.gumroad.com';
const BIG_PACK='djbilbox-beats-big-pack-931-beats'; // 931 beats free-for-profit pack
function gumroadUrl(buy,code){
  if(!buy) return GUMROAD_STORE;
  if(/^https?:\/\//.test(buy)) return buy;
  const base=GUMROAD_STORE+'/l/'+buy;
  return code ? base+'/'+encodeURIComponent(code) : base;
}
function buy(buyRef){ window.open(gumroadUrl(buyRef),'_blank'); }
document.addEventListener('DOMContentLoaded',()=>Cart.refresh());

/* ============================================================
   BEAT CARDS — rendering + genre filtering
   ============================================================ */

/* Primary genre buckets used for the filter pills (order = priority) */
const GENRE_ORDER = ['Oriental','Trap','Drill','House','Funk','Afro','Balkan','Melodic','Hard','R&B','Synth'];

/* Map a beat's tags to its main displayed genre */
function mainGenre(tags){
  for(const g of GENRE_ORDER){ if(tags.includes(g)) return g; }
  return tags[0] || 'Beat';
}

/* Build a single beat card element */
function beatCard(b){
  const genre = mainGenre(b.tags);
  const tagsHtml = b.tags.slice(0,2).map(t=>`<span class="tag">${t}</span>`).join('');
  const el = document.createElement('article');
  el.className='card';
  el.dataset.genre = b.tags.join('|');
  el.innerHTML = `
    <div class="card-media">
      <span class="card-badge free">Free for profit</span>
      <img loading="lazy" src="${b.cover}" alt="${b.title}">
      <div class="card-play" onclick="playBeat('${b.trackId}','${b.title.replace(/'/g,"\\'")}')">
        <i class="fa-solid fa-play"></i>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${b.title}</h3>
      <div class="card-tags">${tagsHtml}</div>
      <div class="card-foot">
        <div class="price"><span class="now free">FREE</span></div>
        <button class="btn-cta" onclick="addToCart('DJBILBOX BIG PACK — 931 beats','FREE','${BIG_PACK}')">
          <i class="fa-solid fa-cart-plus"></i> Add
        </button>
      </div>
    </div>`;
  return el;
}

/* Render a list of beats into a grid container */
function renderBeats(beats, containerId){
  const grid=document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML='';
  if(!beats.length){ grid.innerHTML='<p class="empty">No beats match this filter.</p>'; return; }
  const frag=document.createDocumentFragment();
  beats.forEach(b=>frag.appendChild(beatCard(b)));
  grid.appendChild(frag);
  const count=document.getElementById('beatCount');
  if(count) count.textContent = beats.length+' beats';
}

/* Filter state */
let activeGenre='All';
let searchQuery='';

function applyFilters(containerId){
  const data=(window.BEATS||[]).filter(b=>{
    const genreOk = activeGenre==='All' || b.tags.includes(activeGenre);
    const searchOk = !searchQuery || b.title.toLowerCase().includes(searchQuery);
    return genreOk && searchOk;
  });
  renderBeats(data, containerId);
}

function setGenre(genre, el, containerId){
  activeGenre=genre;
  document.querySelectorAll('.subnav .pill').forEach(p=>p.classList.remove('active'));
  el?.classList.add('active');
  applyFilters(containerId);
}

function searchBeats(val, containerId){
  searchQuery=val.toLowerCase().trim();
  applyFilters(containerId);
  renderYT(searchQuery);   // mirror the search into the YouTube catalog
}

/* ============================================================
   YOUTUBE CATALOG — real @djbilboxbeats videos (window.YT_VIDEOS)
   Searchable alongside the Spotify beats; plays inline in a modal.
   ============================================================ */
let ytShown = 24;
function ytCard(v){
  const a=document.createElement('button');
  a.className='yt-card';
  a.type='button';
  a.onclick=()=>playYT(v.id, v.title);
  a.innerHTML=`
    <span class="yt-thumb">
      <img loading="lazy" src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" alt="${(v.title||'').replace(/"/g,'&quot;')}">
      <span class="yt-play"><i class="fa-solid fa-play"></i></span>
    </span>
    <span class="yt-meta">
      <span class="yt-title">${v.title||''}</span>
      ${v.views?`<span class="yt-views"><i class="fa-brands fa-youtube"></i> ${v.views}</span>`:''}
    </span>`;
  return a;
}
function renderYT(query){
  const grid=document.getElementById('ytGrid');
  if(!grid||!window.YT_VIDEOS) return;
  const q=(query||'').toLowerCase().trim();
  const all=window.YT_VIDEOS;
  const matched = q ? all.filter(v=>v.title.toLowerCase().includes(q)) : all;
  const list = matched.slice(0, ytShown);
  grid.innerHTML='';
  const frag=document.createDocumentFragment();
  list.forEach(v=>frag.appendChild(ytCard(v)));
  grid.appendChild(frag);
  const cnt=document.getElementById('ytCount');
  if(cnt) cnt.textContent = matched.length+' video'+(matched.length===1?'':'s');
  const more=document.getElementById('ytMore');
  if(more) more.style.display = matched.length>list.length ? 'inline-flex' : 'none';
  const empty=document.getElementById('ytEmpty');
  if(empty) empty.style.display = matched.length===0 ? 'block' : 'none';
}
function ytShowMore(query){ ytShown+=24; renderYT(query); }
function playYT(id, title){
  let modal=document.getElementById('ytModal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='ytModal';
    modal.innerHTML=`<div class="yt-modal-inner">
      <button class="yt-modal-close" aria-label="Close" onclick="closeYT()">✕</button>
      <div class="yt-modal-frame"><iframe id="ytModalFrame" allow="autoplay;encrypted-media;picture-in-picture" allowfullscreen></iframe></div>
      <div class="yt-modal-title" id="ytModalTitle"></div>
    </div>`;
    modal.addEventListener('click',e=>{ if(e.target===modal) closeYT(); });
    document.body.appendChild(modal);
  }
  document.getElementById('ytModalFrame').src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  document.getElementById('ytModalTitle').textContent=title||'';
  modal.classList.add('show');
  document.body.style.overflow='hidden';
}
function closeYT(){
  const modal=document.getElementById('ytModal');
  if(!modal) return;
  document.getElementById('ytModalFrame').src='';
  modal.classList.remove('show');
  document.body.style.overflow='';
}

/* Spotify embed player (shared mini-player if present) */
function playBeat(trackId, title){
  const frame=document.getElementById('spotifyEmbed');
  if(frame){
    frame.src=`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
    const np=document.getElementById('nowPlaying'); if(np) np.textContent='Now playing: '+title;
    document.getElementById('miniPlayer')?.classList.add('show');
    frame.scrollIntoView({behavior:'smooth',block:'nearest'});
  }else{
    window.open(`https://open.spotify.com/track/${trackId}`,'_blank');
  }
}

/* ============================================================
   PACK / DRUM-KIT CARDS — product cards with real cover art
   ============================================================ */
function packCard(p){
  const isFree = String(p.price).toUpperCase()==='FREE' || p.price==='0';
  /* A paid pack that ships a free demo still gets a green FREE badge — the
     demo is the hook, so it has to be visible on the cover, not buried. */
  const badgeTxt = p.badge || (isFree ? 'FREE' : p.demo ? 'FREE DEMO' : '');
  const badge = badgeTxt ? `<span class="card-badge${(isFree||p.demo)?' free':''}">${badgeTxt}</span>` : '';
  const tags = (p.tags||[]).slice(0,2).map(t=>`<span class="tag">${t}</span>`).join('');
  const old = p.old ? `<span class="old">$${p.old}</span>` : '';
  const freeNote = (!isFree && p.demo) ? `<span class="pack-free-note">FREE demo available</span>` : '';
  const priceHtml = isFree ? `<span class="now free">FREE</span>` : `<span class="now">$${p.price}</span>${old}${freeNote}`;
  const el = document.createElement('article');
  el.className='card';
  el.dataset.genre = p.genre || '';
  const ref=(p.buy||'').replace(/'/g,"\\'");
  const nm=p.name.replace(/'/g,"\\'");
  /* Free demo = a $0 tier on the same Gumroad page, so the button just opens
     the product and the buyer picks the FREE DEMO variant there. */
  const demo = p.demo
    ? `<button class="btn-cta ghost" title="Try the free demo on Gumroad" onclick="buy('${p.demo.replace(/'/g,"\\'")}')"><i class="fa-solid fa-download"></i> Free demo</button>`
    : '';
  const dHref = p.id ? `product.html?id=${p.id}` : null;
  const media = dHref
    ? `<a class="card-media" href="${dHref}">${badge}<img loading="lazy" src="${p.img}" alt="${p.name}"><span class="card-view"><i class="fa-solid fa-circle-info"></i> View details</span></a>`
    : `<div class="card-media">${badge}<img loading="lazy" src="${p.img}" alt="${p.name}"></div>`;
  const titleHtml = dHref ? `<a href="${dHref}"><h3 class="card-title">${p.name}</h3></a>` : `<h3 class="card-title">${p.name}</h3>`;
  el.innerHTML = `
    ${media}
    <div class="card-body">
      ${titleHtml}
      <div class="card-tags">${tags}</div>
      <div class="card-foot">
        <div class="price">${priceHtml}</div>
        <div style="display:flex;gap:6px">${demo}<button class="btn-cta" onclick="addToCart('${nm}','${p.price}','${ref}')"><i class="fa-solid fa-cart-plus"></i> Add</button></div>
      </div>
    </div>`;
  return el;
}
function renderPacks(packs, containerId){
  const grid=document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML='';
  if(!packs.length){ grid.innerHTML='<p class="empty">No packs in this category.</p>'; return; }
  const frag=document.createDocumentFragment();
  packs.forEach(p=>frag.appendChild(packCard(p)));
  grid.appendChild(frag);
  const count=document.getElementById('packCount');
  if(count) count.textContent = packs.length+' packs';
}
let activePackGenre='All', packFreeOnly=false, packSort='featured', packGridId='packsGrid';
function packPriceVal(p){ return (String(p.price).toUpperCase()==='FREE'||p.price==='0') ? 0 : (parseFloat(p.price)||0); }
function applyPackFilters(){
  let data=(window.PACKS||[]).filter(p=>activePackGenre==='All'||p.genre===activePackGenre);
  if(packFreeOnly) data=data.filter(p=>packPriceVal(p)===0);
  if(packSort==='price-asc')  data=[...data].sort((a,b)=>packPriceVal(a)-packPriceVal(b));
  else if(packSort==='price-desc') data=[...data].sort((a,b)=>packPriceVal(b)-packPriceVal(a));
  else if(packSort==='free-first') data=[...data].sort((a,b)=>packPriceVal(a)-packPriceVal(b));
  renderPacks(data, packGridId);
}
function setPackGenre(genre, el, containerId){
  activePackGenre=genre; if(containerId) packGridId=containerId;
  document.querySelectorAll('#packPills .pill').forEach(p=>p.classList.remove('active'));
  el?.classList.add('active');
  applyPackFilters();
}
function setPackSort(val){ packSort=val; applyPackFilters(); }
function togglePackFree(el){ packFreeOnly=!packFreeOnly; el?.classList.toggle('active',packFreeOnly); applyPackFilters(); }
function buildPackPills(containerId, gridId){
  const bar=document.getElementById(containerId);
  if(!bar||!window.PACKS) return;
  packGridId=gridId||'packsGrid';
  const genres=[...new Set(window.PACKS.map(p=>p.genre))];
  bar.innerHTML='';
  const mk=(label,genre,active)=>{
    const p=document.createElement('button');
    p.className='pill'+(active?' active':'');
    p.textContent=label; p.onclick=()=>setPackGenre(genre,p,gridId);
    bar.appendChild(p);
  };
  mk(`All (${window.PACKS.length})`,'All',true);
  genres.forEach(g=>mk(g,g,false));
}
/* Build the sort/FREE toolbar for the drum-kits page */
function buildPackToolbar(containerId, gridId){
  const bar=document.getElementById(containerId);
  if(!bar) return;
  packGridId=gridId||'packsGrid';
  const freeCount=(window.PACKS||[]).filter(p=>packPriceVal(p)===0).length;
  bar.innerHTML=`
    <button class="pill pack-free-toggle" onclick="togglePackFree(this)">
      <i class="fa-solid fa-gift"></i> FREE only (${freeCount})
    </button>
    <div class="pack-sort">
      <i class="fa-solid fa-arrow-down-short-wide"></i>
      <select onchange="setPackSort(this.value)" aria-label="Sort packs">
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="free-first">Free first</option>
      </select>
    </div>`;
}

/* ============================================================
   GENERIC PRODUCT CARDS — services / license tiers
   p: {name, img?, price ("FREE"|number|text), old?, badge?, desc?, buy?}
   ============================================================ */
function genericCard(p){
  const isFree=String(p.price).toUpperCase()==='FREE';
  const isContact=p.contact!==undefined;
  const badge=p.badge? `<span class="card-badge${isFree||p.badge==='free'?' free':''}">${p.badge==='free'?'Free':p.badge}</span>`:'';
  const media=p.img? `<div class="card-media">${badge}<img loading="lazy" src="${p.img}" alt="${p.name}"></div>`:'';
  const old=p.old? `<span class="old">$${p.old}</span>`:'';
  const now=isFree? `<span class="now free">FREE</span>`
            : isContact? `<span class="now" style="font-size:.85rem;color:var(--text-2)">On request</span>`
            : (isNaN(p.price)? `<span class="now" style="font-size:.85rem">${p.price}</span>` : `<span class="now">$${p.price}</span>`);
  let btn;
  if(isContact){
    /* All contact CTAs route to Discord (community + DMs) instead of email. */
    btn=`<a class="btn-cta" href="${DISCORD_URL}" target="_blank" rel="noopener"><i class="fa-brands fa-discord"></i> Discord</a>`;
  }else{
    const onclick=p.buy!==undefined? `addToCart('${p.name.replace(/'/g,"\\'")}','${p.price}','${(p.buy||'').replace(/'/g,"\\'")}')` : `addToCart('${p.name.replace(/'/g,"\\'")}','${p.price}')`;
    btn=`<button class="btn-cta" onclick="${onclick}"><i class="fa-solid fa-cart-plus"></i> Add</button>`;
  }
  return `<article class="card">${media}<div class="card-body">
    <h3 class="card-title">${p.name}</h3>
    ${p.desc?`<p style="color:var(--text-3);font-size:.74rem;line-height:1.45">${p.desc}</p>`:''}
    <div class="card-foot"><div class="price">${now}${old}</div>
      ${btn}
    </div></div></article>`;
}
function renderProducts(arr, id){ const g=document.getElementById(id); if(g) g.innerHTML=(arr||[]).map(genericCard).join(''); }
function renderReviews(arr, id){
  const g=document.getElementById(id); if(!g) return;
  g.innerHTML=(arr||[]).map(r=>`<article class="card"><div class="card-body">
    <p style="font-size:.92rem;color:var(--text-2);line-height:1.5">${r.txt}</p>
    <div class="card-meta" style="margin-top:12px;color:var(--accent);font-weight:700">${r.name}</div>
  </div></article>`).join('');
}

/* ============================================================
   VST CARDS — plugin cards (Buy + free Demo)
   ============================================================ */
function vstCard(p){
  const badge = p.badge ? `<span class="card-badge">${p.badge}</span>` : '';
  const tags = (p.tags||[]).slice(0,2).map(t=>`<span class="tag">${t}</span>`).join('');
  const old = p.old ? `<span class="old">$${p.old}</span>` : '';
  const soon = String(p.price).toUpperCase()==='SOON';
  const priceHtml = soon ? `<span class="now" style="font-size:.82rem;color:var(--text-3)">Coming soon</span>`
                   : p.free ? `<span class="now" style="color:var(--green)">FREE</span>`
                   : String(p.price).startsWith('~') ? `<span class="now" style="font-size:.86rem">${p.price}</span>`
                   : `<span class="now">$${p.price}</span>${old}`;
  const demo = p.demo ? `<button class="btn-cta ghost" onclick="buy('${p.demo.replace(/'/g,"\\'")}')"><i class="fa-solid fa-download"></i> Demo</button>` : '';
  /* External / partner products: link straight out instead of the Gumroad cart.
     `p.url` = full external URL. `p.free` = free download (green "Get Free" button). */
  let mainBtn;
  if(p.url){
    const label = p.free ? '<i class="fa-solid fa-download"></i> Get Free' : '<i class="fa-solid fa-arrow-up-right-from-square"></i> Get';
    const style = p.free ? ' style="background:var(--green)"' : '';
    mainBtn = `<a class="btn-cta" href="${p.url}" target="_blank" rel="noopener"${style}>${label}</a>`;
  } else if(soon){
    mainBtn = `<button class="btn-cta ghost" onclick="window.open(GUMROAD_STORE,'_blank')"><i class="fa-solid fa-bell"></i> Notify</button>`;
  } else {
    mainBtn = `<button class="btn-cta" onclick="addToCart('${p.name.replace(/'/g,"\\'")}','${p.price}','${(p.buy||'').replace(/'/g,"\\'")}')"><i class="fa-solid fa-cart-plus"></i> Add</button>`;
  }
  const noteHtml = p.note ? `<div style="background:var(--accent-glow);border:1px solid rgba(255,45,45,.3);border-radius:5px;padding:5px 9px;font-size:.64rem;font-weight:700;color:var(--accent);letter-spacing:.03em;margin-top:2px">🎟️ ${p.note}</div>` : '';
  const el=document.createElement('article');
  el.className='card';
  const dHref = p.detail ? p.detail : (p.id ? `product.html?id=${p.id}` : null);
  const thumb = p.thumb || p.img;
  /* optional muted loop clip revealed on hover, layered over the poster */
  const preview = p.preview
    ? `<video class="card-preview" src="${p.preview}" muted loop playsinline preload="none" aria-hidden="true"
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .25s ease;pointer-events:none"></video>`
    : '';
  /* Pastille "demo video" quand le produit a une video YouTube (champ `yt`).
     Elle ouvre la fenetre YouTube deja utilisee ailleurs sur le site plutot
     que d'emmener le visiteur hors de la boutique. Purement additive : une
     fiche sans `yt` s'affiche exactement comme avant. */
  const ytBadge = p.yt
    ? `<button type="button" class="card-yt" data-yt="${p.yt}" aria-label="Voir la demo video"
        style="position:absolute;right:10px;bottom:10px;z-index:3;display:inline-flex;align-items:center;gap:6px;
               background:rgba(10,10,14,.82);border:1px solid rgba(255,255,255,.18);color:#fff;font-size:.66rem;
               font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:6px 10px;border-radius:8px;
               cursor:pointer;backdrop-filter:blur(4px)"><i class="fa-brands fa-youtube" style="color:#ff3b3b"></i> Demo</button>`
    : '';
  const media = dHref
    ? `<a class="card-media" href="${dHref}">${badge}<img loading="lazy" src="${thumb}" alt="${p.name}">${preview}${ytBadge}<span class="card-view"><i class="fa-solid fa-circle-info"></i> View details</span></a>`
    : `<div class="card-media">${badge}<img loading="lazy" src="${thumb}" alt="${p.name}">${preview}${ytBadge}</div>`;
  const titleHtml = dHref ? `<a href="${dHref}"><h3 class="card-title">${p.name}</h3></a>` : `<h3 class="card-title">${p.name}</h3>`;
  const descHtml = p.desc ? `<p class="card-desc" style="color:var(--text-3);font-size:.68rem;line-height:1.4;margin:2px 0 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.desc}</p>` : '';
  el.innerHTML = `
    ${media}
    <div class="card-body">
      ${titleHtml}
      <div class="card-tags">${tags}</div>
      ${descHtml}
      ${noteHtml}
      <div class="card-foot">
        <div class="price">${priceHtml}</div>
        <div style="display:flex;gap:6px">${soon?'':demo}${mainBtn}</div>
      </div>
    </div>`;
  if(p.preview){
    const box = el.querySelector('.card-media');
    const vid = el.querySelector('.card-preview');
    box.addEventListener('mouseenter', ()=>{ vid.style.opacity='1'; vid.play().catch(()=>{}); });
    box.addEventListener('mouseleave', ()=>{ vid.style.opacity='0'; vid.pause(); });
  }
  const ytBtn = el.querySelector('.card-yt');
  if(ytBtn){
    ytBtn.addEventListener('click', e=>{
      /* La pastille est posee sur un <a> : sans stopper l'evenement, le clic
         ouvrirait la fiche produit en meme temps que la video. */
      e.preventDefault(); e.stopPropagation();
      if(typeof playYT === 'function') playYT(ytBtn.dataset.yt, p.name);
      else window.open('https://www.youtube.com/watch?v='+ytBtn.dataset.yt, '_blank', 'noopener');
    });
  }
  return el;
}
function renderVsts(list, containerId){
  const container=document.getElementById(containerId);
  if(!container) return;
  container.innerHTML='';

  const bundles=(list||[]).filter(p=>p.category==='bundle');
  const effects=(list||[]).filter(p=>p.category==='effect');
  const instruments=(list||[]).filter(p=>p.category==='instrument'||!p.category);

  const frag=document.createDocumentFragment();

  const mkHead = (label) => {
    const h=document.createElement('h2');
    h.className='vst-cat-head';
    h.style.cssText='grid-column:1 / -1;font-family:var(--font-a,sans-serif);font-weight:700;'
      +'font-size:1.5rem;text-transform:uppercase;letter-spacing:.06em;margin:44px 0 20px;'
      +'color:var(--accent-bright,#FFD700);display:flex;align-items:center;gap:12px';
    h.innerHTML=label+'<span style="flex:1;height:1px;background:linear-gradient(90deg,rgba(212,175,55,.5),transparent)"></span>';
    return h;
  };

  // BUNDLE section
  if(bundles.length>0){
    frag.appendChild(mkHead('🎁 VST Bundle'));
    bundles.forEach(p=>frag.appendChild(vstCard(p)));
  }

  // EFFECTS section
  if(effects.length>0){
    frag.appendChild(mkHead('⚙️ Audio Effects'));
    effects.forEach(p=>frag.appendChild(vstCard(p)));
  }

  // INSTRUMENTS section
  if(instruments.length>0){
    frag.appendChild(mkHead('🎹 Instruments'));
    instruments.forEach(p=>frag.appendChild(vstCard(p)));
  }

  container.appendChild(frag);
}

/* Build the genre filter pills based on what's actually in the data */
function buildGenrePills(containerId, gridId){
  const bar=document.getElementById(containerId);
  if(!bar||!window.BEATS) return;
  const counts={};
  window.BEATS.forEach(b=>b.tags.forEach(t=>counts[t]=(counts[t]||0)+1));
  const genres=GENRE_ORDER.filter(g=>counts[g]);
  bar.innerHTML='';
  const mk=(label,genre,active)=>{
    const p=document.createElement('button');
    p.className='pill'+(active?' active':'');
    p.textContent=label;
    p.onclick=()=>setGenre(genre,p,gridId);
    bar.appendChild(p);
  };
  mk(`All (${window.BEATS.length})`,'All',true);
  genres.forEach(g=>mk(`${g} (${counts[g]})`,g,false));
}
