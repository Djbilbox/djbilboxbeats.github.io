/* ============================================================
   DJBILBOX BEATS — Shared site JS
   Header (mobile menu), cart, promo bar, card rendering + filters.
   Reusable across pages. Load AFTER beats-data.js where needed.
   ============================================================ */

/* ============================================================
   SIDEBAR — shared left navigation, injected on every page.
   Each page sets <body data-page="KEY"> to highlight its link.
   ============================================================ */
const NAV = [
  { key:'beats',       label:'Beats',       href:'beats-redesign.html', icon:'fa-music' },
  { key:'vst',         label:'VST',         href:'vst.html',            icon:'fa-sliders' },
  { key:'drumkits',    label:'Drum Kits',   href:'drum-kits.html',      icon:'fa-drum' },
  { key:'services',    label:'Services',    href:'services.html',       icon:'fa-headphones' },
  { key:'contact',     label:'Contact',     href:'contact.html',        icon:'fa-envelope' },
  { key:'account',     label:'My Account',  href:'account.html',        icon:'fa-user' },
  { key:'reviews',     label:'Reviews',     href:'reviews.html',        icon:'fa-star' },
  { key:'license',     label:'License',     href:'license.html',        icon:'fa-id-card' },
  { key:'discography', label:'Discography', href:'discography.html',    icon:'fa-record-vinyl' },
  { key:'playlists',   label:'Playlists',   href:'playlists.html',      icon:'fa-list-ul' },
  { key:'news',        label:'News',        href:'news.html',           icon:'fa-newspaper' },
];

function mountSidebar(active){
  if(document.querySelector('.sidebar')) return;
  const links = NAV.map(n=>
    `<a href="${n.href}"${n.key===active?' class="active"':''}><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`
  ).join('') +
    `<a href="#" onclick="document.getElementById('aiChat')?.classList.toggle('open');return false;"><i class="fa-solid fa-robot"></i> AI Chat</a>`;

  const sidebar = document.createElement('aside');
  sidebar.className='sidebar';
  sidebar.innerHTML = `
    <a href="index.html" class="brand">DJBILBOX <span>BEATS</span></a>
    <nav class="side-nav">${links}</nav>
    <div class="side-foot">
      <div class="side-social">
        <a href="https://open.spotify.com/artist/2wP5nwScAUiXF6Esc4x0hG" target="_blank" title="Spotify"><i class="fa-brands fa-spotify"></i></a>
        <a href="https://www.youtube.com/@djbilboxbeats" target="_blank" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
      </div>
      <div class="side-actions">
        <button class="icon-btn" onclick="openCart()" title="Cart">
          <i class="fa-solid fa-bag-shopping"></i><span class="badge" data-cart-badge>0</span>
        </button>
        <span class="lang-wrap notranslate" translate="no"><i class="fa-solid fa-globe"></i><div id="google_translate_element"></div></span>
      </div>
    </div>`;

  const mtop = document.createElement('div');
  mtop.className='mtop';
  mtop.innerHTML = `
    <button class="nav-burger" onclick="toggleNav()" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
    <a href="index.html" class="brand">DJBILBOX <span>BEATS</span></a>`;

  const overlay = document.createElement('div');
  overlay.className='side-overlay';
  overlay.onclick=toggleNav;

  document.body.prepend(overlay, mtop, sidebar);
  Cart.refresh();
}

function toggleNav(){
  document.querySelector('.sidebar')?.classList.toggle('open');
  document.querySelector('.side-overlay')?.classList.toggle('show');
}

/* Shared footer — injected if the page has no <footer> */
function mountFooter(){
  if(document.querySelector('.footer')) return;
  const f=document.createElement('footer');
  f.className='footer';
  f.innerHTML=`<div class="container">
    <div class="footer-inner">
      <a href="index.html" class="brand">DJBILBOX <span>BEATS</span></a>
      <div class="footer-links">
        <a href="license.html">License</a><a href="services.html">Contact</a><a href="news.html">Newsletter</a>
      </div>
      <div class="footer-social">
        <a href="https://open.spotify.com/artist/2wP5nwScAUiXF6Esc4x0hG" target="_blank"><i class="fa-brands fa-spotify"></i></a>
        <a href="https://www.youtube.com/@djbilboxbeats" target="_blank"><i class="fa-brands fa-youtube"></i></a>
      </div>
    </div>
    <div class="footer-copy">© 2026 DJBILBOX BEATS — All rights reserved.</div>
  </div>`;
  document.body.appendChild(f);
}

/* Shared AI-chat placeholder — injected if missing */
function mountAiChat(){
  if(document.getElementById('aiChat')) return;
  const d=document.createElement('div');
  d.id='aiChat';
  d.style.cssText='position:fixed;right:18px;bottom:62px;width:320px;max-width:90vw;background:var(--surface-2);border:1px solid var(--border);border-radius:14px;padding:16px;z-index:1200;display:none';
  d.innerHTML=`<strong style="font-family:var(--font-a);text-transform:uppercase">AI Chat</strong>
    <p style="color:var(--text-3);font-size:.8rem;margin-top:8px">Ask me about beats, packs, licenses or services.</p>`;
  document.body.appendChild(d);
  const st=document.createElement('style');st.textContent='#aiChat.open{display:block}';document.head.appendChild(st);
}

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

document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!==undefined){
    mountSidebar(document.body.dataset.page);
    mountFooter();
    mountAiChat();
    mountPromo();
  }
  /* Google Translate widget */
  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement(
      {pageLanguage:'en',includedLanguages:'en,fr,es,de,it,pt,ar'},
      'google_translate_element'
    );
  };
  const s=document.createElement('script');
  s.src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async=true;
  document.head.appendChild(s);
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
  get(){ try{ return JSON.parse(localStorage.getItem(this.key))||[] }catch{ return [] } },
  save(items){ localStorage.setItem(this.key, JSON.stringify(items)); this.refresh(); },
  add(item){ const c=this.get(); if(item.buy && c.some(x=>x.buy===item.buy)){ this.refresh(); return; } c.push(item); this.save(c); },
  remove(i){ const c=this.get(); c.splice(i,1); this.save(c); renderCartItems(); },
  clear(){ this.save([]); renderCartItems(); },
  total(){ return this.get().reduce((s,it)=>{ const n=parseFloat(String(it.price).replace(',','.').replace(/[^0-9.]/g,'')); return s+(isNaN(n)?0:n); },0); },
  refresh(){
    const n=this.get().length;
    document.querySelectorAll('[data-cart-badge]').forEach(b=>{ b.textContent=n; b.style.display=n?'flex':'none'; });
  }
};
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
      <button class="btn primary" style="width:100%;justify-content:center" onclick="checkout()">
        <i class="fa-solid fa-bag-shopping"></i> Checkout on Gumroad</button>
      <button class="cart-clear" onclick="Cart.clear()">Clear cart</button>
      <p class="cart-note">Free items: just set your price to €0 on Gumroad. Paid items from the same store are paid together.</p>
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
      const priceTxt=free?'FREE':(isNaN(parseFloat(it.price))?it.price:'€'+it.price);
      return `<div class="cart-item">
        <div class="ci-info"><div class="ci-name">${it.title}</div>
          <div class="ci-price${free?' free':''}">${priceTxt}</div></div>
        <a class="ci-open" href="${gumroadUrl(it.buy)}" target="_blank" rel="noopener" title="Open on Gumroad"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <button class="ci-remove" onclick="Cart.remove(${i})" title="Remove">✕</button>
      </div>`;
    }).join('');
  }
  const t=Cart.total();
  const tEl=document.getElementById('cartTotal'); if(tEl) tEl.textContent = t>0?('€'+t.toFixed(2)):'FREE';
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
  const items=Cart.get().filter(it=>it.buy);
  if(!items.length){ openCart(); return; }

  // Put a Gumroad overlay link for every cart item into the page so Gumroad
  // bundles them together, then open the overlay on the first one.
  let box=document.getElementById('grBundle');
  if(!box){ box=document.createElement('div'); box.id='grBundle';
            box.style.cssText='position:absolute;left:-9999px;top:-9999px'; document.body.appendChild(box); }
  box.innerHTML=items.map(it=>
    `<a class="gumroad-button" href="${gumroadUrl(it.buy)}" data-gumroad-overlay-checkout="true">Buy</a>`
  ).join('');

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
   Pass a full /l/<slug> url, a bare slug, or nothing (store front). */
const GUMROAD_STORE='https://djbilboxbeats.gumroad.com';
const BIG_PACK='djbilbox-beats-big-pack-931-beats'; // 931 beats free-for-profit pack
function gumroadUrl(buy){
  if(!buy) return GUMROAD_STORE;
  if(/^https?:\/\//.test(buy)) return buy;
  return GUMROAD_STORE+'/l/'+buy;
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
  const badgeTxt = p.badge || (isFree?'FREE':'');
  const badge = badgeTxt ? `<span class="card-badge${isFree?' free':''}">${badgeTxt}</span>` : '';
  const tags = (p.tags||[]).slice(0,2).map(t=>`<span class="tag">${t}</span>`).join('');
  const old = p.old ? `<span class="old">€${p.old}</span>` : '';
  const priceHtml = isFree ? `<span class="now free">FREE</span>` : `<span class="now">€${p.price}</span>${old}`;
  const el = document.createElement('article');
  el.className='card';
  el.dataset.genre = p.genre || '';
  const ref=(p.buy||'').replace(/'/g,"\\'");
  const nm=p.name.replace(/'/g,"\\'");
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
        <button class="btn-cta" onclick="addToCart('${nm}','${p.price}','${ref}')"><i class="fa-solid fa-cart-plus"></i> Add</button>
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
let activePackGenre='All';
function setPackGenre(genre, el, containerId){
  activePackGenre=genre;
  document.querySelectorAll('#packPills .pill').forEach(p=>p.classList.remove('active'));
  el?.classList.add('active');
  const data=(window.PACKS||[]).filter(p=>activePackGenre==='All'||p.genre===activePackGenre);
  renderPacks(data, containerId);
}
function buildPackPills(containerId, gridId){
  const bar=document.getElementById(containerId);
  if(!bar||!window.PACKS) return;
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

/* ============================================================
   GENERIC PRODUCT CARDS — services / license tiers
   p: {name, img?, price ("FREE"|number|text), old?, badge?, desc?, buy?}
   ============================================================ */
function genericCard(p){
  const isFree=String(p.price).toUpperCase()==='FREE';
  const isContact=p.contact!==undefined;
  const badge=p.badge? `<span class="card-badge${isFree||p.badge==='free'?' free':''}">${p.badge==='free'?'Free':p.badge}</span>`:'';
  const media=p.img? `<div class="card-media">${badge}<img loading="lazy" src="${p.img}" alt="${p.name}"></div>`:'';
  const old=p.old? `<span class="old">€${p.old}</span>`:'';
  const now=isFree? `<span class="now free">FREE</span>`
            : isContact? `<span class="now" style="font-size:.85rem;color:var(--text-2)">On request</span>`
            : (isNaN(p.price)? `<span class="now" style="font-size:.85rem">${p.price}</span>` : `<span class="now">€${p.price}</span>`);
  let btn;
  if(isContact){
    const subj=encodeURIComponent(p.subject||(p.name+' — request'));
    btn=`<a class="btn-cta" href="mailto:${p.contact}?subject=${subj}"><i class="fa-solid fa-envelope"></i> Contact</a>`;
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
  const old = p.old ? `<span class="old">€${p.old}</span>` : '';
  const soon = String(p.price).toUpperCase()==='SOON';
  const priceHtml = soon ? `<span class="now" style="font-size:.82rem;color:var(--text-3)">Coming soon</span>`
                         : `<span class="now">€${p.price}</span>${old}`;
  const demo = p.demo ? `<button class="btn-cta ghost" onclick="buy('${p.demo.replace(/'/g,"\\'")}')"><i class="fa-solid fa-download"></i> Demo</button>` : '';
  const mainBtn = soon
    ? `<button class="btn-cta ghost" onclick="window.open(GUMROAD_STORE,'_blank')"><i class="fa-solid fa-bell"></i> Notify</button>`
    : `<button class="btn-cta" onclick="addToCart('${p.name.replace(/'/g,"\\'")}','${p.price}','${(p.buy||'').replace(/'/g,"\\'")}')"><i class="fa-solid fa-cart-plus"></i> Add</button>`;
  const noteHtml = p.note ? `<div style="background:var(--accent-glow);border:1px solid rgba(255,45,45,.3);border-radius:5px;padding:5px 9px;font-size:.64rem;font-weight:700;color:var(--accent);letter-spacing:.03em;margin-top:2px">🎟️ ${p.note}</div>` : '';
  const el=document.createElement('article');
  el.className='card';
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
      ${noteHtml}
      <div class="card-foot">
        <div class="price">${priceHtml}</div>
        <div style="display:flex;gap:6px">${soon?'':demo}${mainBtn}</div>
      </div>
    </div>`;
  return el;
}
function renderVsts(list, containerId){
  const grid=document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML='';
  const frag=document.createDocumentFragment();
  (list||[]).forEach(p=>frag.appendChild(vstCard(p)));
  grid.appendChild(frag);
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
