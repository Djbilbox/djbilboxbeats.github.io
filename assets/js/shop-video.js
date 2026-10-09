/* ============================================================
   HUMPIRE SHOP — vidéos promo animées dans les cartes produit
   Chaque carte dont le produit a une vidéo (`yt` dans vst-data.js, rendue
   par vstCard en bouton .card-yt[data-yt]) joue sa vidéo promo YouTube en
   boucle, sans le son, dès qu'elle est visible à l'écran. Hors de l'écran,
   l'iframe est retirée pour ne pas garder des dizaines de lecteurs ouverts.
   Les cartes sans vidéo reçoivent un lent zoom « Ken Burns » sur la
   vignette, pour que toute la grille soit animée.
   Usage : ShopVideo.watch(conteneur) après chaque rendu de la grille.
   ============================================================ */
(function(){
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const MAX_LIVE = (window.matchMedia && matchMedia('(max-width:700px)').matches) ? 2 : 6;
  const live = new Set();

  function src(id){
    return 'https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&mute=1&controls=0&loop=1&playlist=' + id +
      '&playsinline=1&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&fs=0';
  }

  /* La vidéo d'une carte : data-yt posé sur la vignette elle-même (page
     streetwear) ou sur le bouton « Demo » de vstCard (boutique VST). */
  function videoOf(media){
    if(media.dataset.yt) return { id: media.dataset.yt, v: !!media.dataset.ytv };
    const btn = media.querySelector('.card-yt[data-yt]');
    return btn ? { id: btn.dataset.yt, v: !!btn.dataset.ytv } : null;
  }

  function start(media){
    if(live.has(media) || live.size >= MAX_LIVE) return;
    const vid = videoOf(media);
    if(!vid) return;
    const box = document.createElement('div');
    box.className = 'card-live';
    if(vid.v) box.dataset.ratio = 'v';
    const f = document.createElement('iframe');
    f.src = src(vid.id);
    f.title = 'Promo video';
    f.tabIndex = -1;
    f.setAttribute('aria-hidden', 'true');
    f.allow = 'autoplay; encrypted-media; picture-in-picture';
    /* On attend un peu après le chargement : les premières images de
       l'embed montrent l'interface YouTube, pas la vidéo. */
    f.addEventListener('load', () => setTimeout(() => box.classList.add('on'), 2500));
    box.appendChild(f);
    const tag = document.createElement('span');
    tag.className = 'card-live-tag';
    tag.innerHTML = '<i class="fa-solid fa-circle"></i> Promo';
    const img = media.querySelector('img');
    img ? img.after(box, tag) : media.prepend(box, tag);
    live.add(media);
  }

  function stop(media){
    if(!live.has(media)) return;
    live.delete(media);
    const box = media.querySelector('.card-live');
    const tag = media.querySelector('.card-live-tag');
    if(box) box.classList.remove('on');
    setTimeout(() => { box && box.remove(); tag && tag.remove(); }, 600);
  }

  /* cartes vidéo visibles mais en attente d'une place (MAX_LIVE atteint) */
  const waiting = new Set();

  const io = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
    entries.forEach(e => {
      const media = e.target;
      const hasVideo = !!videoOf(media) && !reduce && !saveData;
      if(e.isIntersecting && e.intersectionRatio >= 0.55){
        if(hasVideo){ waiting.add(media); start(media); if(live.has(media)) waiting.delete(media); }
        else media.classList.add('kb');
      } else if(e.intersectionRatio < 0.2){
        waiting.delete(media);
        media.classList.remove('kb');
        if(live.has(media)){
          stop(media);
          for(const m of waiting){ start(m); if(live.has(m)){ waiting.delete(m); break; } }
        }
      }
    });
  }, { threshold: [0, 0.2, 0.55, 0.9] }) : null;

  window.ShopVideo = {
    /* La grille est entièrement reconstruite à chaque filtre : on repart
       de zéro plutôt que de suivre des cartes détachées du DOM. */
    watch(root){
      if(!io || !root) return;
      io.disconnect(); live.clear(); waiting.clear();
      root.querySelectorAll('.card-media, .sw-card-img-link').forEach(m => io.observe(m));
    }
  };
})();
