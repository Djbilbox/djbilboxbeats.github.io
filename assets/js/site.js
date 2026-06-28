/* ============================================================
   DJBILBOX BEATS — Shared site JS
   Header (mobile menu), cart, promo bar, card rendering + filters.
   Reusable across pages. Load AFTER beats-data.js where needed.
   ============================================================ */

/* ---------- Mobile nav ---------- */
function toggleNav(){
  document.querySelector('.hdr-nav')?.classList.toggle('open');
}

/* ---------- Sticky promo dismiss ---------- */
function closePromo(){
  document.querySelector('.promo-bar')?.classList.add('hidden');
  document.body.style.paddingBottom = '0';
}

/* ---------- Cart (lightweight, localStorage) ---------- */
const Cart = {
  key:'djb_cart',
  get(){ try{ return JSON.parse(localStorage.getItem(this.key))||[] }catch{ return [] } },
  save(items){ localStorage.setItem(this.key, JSON.stringify(items)); this.refresh(); },
  add(item){ const c=this.get(); c.push(item); this.save(c); },
  refresh(){
    const n=this.get().length;
    document.querySelectorAll('[data-cart-badge]').forEach(b=>b.textContent=n);
  }
};
function addToCart(title, price){
  Cart.add({title,price});
  const badge=document.querySelector('[data-cart-badge]');
  if(badge){ badge.animate([{transform:'scale(1.6)'},{transform:'scale(1)'}],{duration:300}); }
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
        <button class="btn-cta" onclick="buy(BIG_PACK)">
          <i class="fa-solid fa-download"></i> Get pack
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
  const btn = isFree
    ? `<i class="fa-solid fa-download"></i> Download`
    : `<i class="fa-solid fa-bag-shopping"></i> Buy`;
  const el = document.createElement('article');
  el.className='card';
  el.dataset.genre = p.genre || '';
  el.innerHTML = `
    <div class="card-media">
      ${badge}
      <img loading="lazy" src="${p.img}" alt="${p.name}">
    </div>
    <div class="card-body">
      <h3 class="card-title">${p.name}</h3>
      <div class="card-tags">${tags}</div>
      <div class="card-foot">
        <div class="price">${priceHtml}</div>
        <button class="btn-cta" onclick="buy('${(p.buy||'').replace(/'/g,"\\'")}')">${btn}</button>
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
    : `<button class="btn-cta" onclick="buy('${(p.buy||'').replace(/'/g,"\\'")}')"><i class="fa-solid fa-bag-shopping"></i> Buy</button>`;
  const el=document.createElement('article');
  el.className='card';
  el.innerHTML = `
    <div class="card-media">${badge}<img loading="lazy" src="${p.img}" alt="${p.name}"></div>
    <div class="card-body">
      <h3 class="card-title">${p.name}</h3>
      <div class="card-tags">${tags}</div>
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
