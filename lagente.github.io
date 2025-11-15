<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>LA GENTE</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #000; color: #fff; font-family: Arial,sans-serif; margin:0; padding:0; }
    .container { max-width: 900px; margin: 0 auto 24px auto; padding: 10px 2vw 0 2vw; }
    h1, h2, h3, h4 { text-align: center; margin-top:20px; letter-spacing:2px;}
    .gold { color: #FFD700; }
    .menu { text-align: center; margin-bottom: 12px; margin-top: 8px; }
    .menu a {
      color: #FFD700;
      text-decoration: none;
      font-weight: bold;
      margin: 0 11px;
      font-size: 1.15rem;
      transition: background 0.18s, box-shadow 0.18s, color 0.18s;
      padding: 3px 13px;
      border-radius:6px;
    }
    .menu a:hover, .logo-bar a:hover img {
      background: #2f2210;
      box-shadow: 0 0 8px #FFD70099;
    }
    .menu a:active, .menu a.active {
      background:#FFD700;
      color:#000;
      box-shadow: 0 0 18px #FFD700aa;
    }
    .logo-bar { display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:18px; margin-bottom: 18px; margin-top:14px;}
    .logo-bar a img {height:44px;width:44px;object-fit:contain;border-radius:12px;background:#222; transition:box-shadow 0.19s, outline 0.19s;}
    .logo-bar a:active img {
      outline: 2px solid #FFD700;
      box-shadow: 0 0 19px #FFD700;
      background: #FFD70022;
    }
    .subscribe { text-align: center; margin: 20px auto 26px auto; font-size: 1.08rem;}
    .section { margin: 34px 0 20px 0; text-align:left;}
    .section-title { color: #FFD700; font-size: 1.21rem; margin-bottom: 7px; font-weight: bold; text-align: left;}
    .videos { display: flex; flex-wrap: wrap; gap: 36px; justify-content: center; margin-top:24px;}
    .video-block {
      background:#222;
      border-radius:16px;
      padding:16px 16px 12px 16px;
      box-shadow:0 2px 16px #0007;
      max-width:700px;
      width:100%;
      text-align:center;
    }
    .video-block p { font-size:1.1rem; margin:0 0 9px 0; color: #FFD700; font-weight: bold;}
    .video-block iframe {
      width: 560px;
      height: 315px;
      max-width: 95vw;
      border-radius: 9px;
    }
    .contact-link { font-size:1.15rem; color:#FFD700; text-align:center; display:block; margin: 20px 0 30px 0;}
    .footer { text-align:center; color:#FFD700cc; font-size:.93rem; margin-bottom: 14px;}
    input,button{border:none;}
    button{background:#FFD700;color:#000;padding:7px 18px;border-radius:5px;cursor:pointer;}
    button:hover{background:#111;color:#FFD700;}
    @media(max-width:700px){
      .container {max-width:100%;}
      .video-block iframe { width:98vw; height:200px; }
      .video-block { padding:10px 3vw;}
      .logo-bar a img {height:32px;width:32px;}
    }
  </style>
</head>
<body>
<div class="container">
  <h1 class="gold">LA GENTE</h1>
  <div class="subscribe">
    RECEVOIS LES NOUVEAUTÉS DE LA GENTE <br>
    <input required aria-label="Votre email" placeholder="Votre email" style="margin-top:7px; padding:6px; border-radius:5px; border:none;"> 
    <button>S'INSCRIRE</button>
  </div>
  <div class="menu">
    <a href="#home">ACCUEIL</a>
    <a href="#about">À PROPOS</a>
    <a href="#videos">VIDÉOS</a>
    <a href="#contact">CONTACT</a>
  </div>
  <div class="logo-bar">
    <a href="https://www.snapchat.com/@la_gente34?share_id=kBd752z3RWmePMgvwEYF8w&locale=fr_FR" title="Snapchat">
      <img src="https://img.icons8.com/color/48/snapchat.png" alt="Snapchat">
    </a>
    <a href="https://www.instagram.com/la_gente_34officiel/" title="Instagram">
      <img src="https://img.icons8.com/fluency/48/instagram-new.png" alt="Instagram">
    </a>
    <a href="https://www.youtube.com/@La_Gente_Officiel" title="YouTube">
      <img src="https://img.icons8.com/fluency/48/youtube-play.png" alt="YouTube">
    </a>
    <a href="https://open.spotify.com/intl-fr/artist/6jt10hTcdVCW6jKOlatM3f" title="Spotify">
      <img src="https://img.icons8.com/color/48/spotify--v1.png" alt="Spotify">
    </a>
    <a href="mailto:juanitoooo@live.fr" title="Mail">
      <img src="https://img.icons8.com/fluency/48/gmail.png" alt="Mail">
    </a>
  </div>
  <div class="section" id="about">
    <div class="section-title">À PROPOS</div>
    <h3 class="gold">TODO PARA EL PUEBLO⏳⏳⏳</h3>
    <p>LA GENTE propose un son urbain et moderne, entre rap, trap et ambiance méditerranéenne. Cet artiste originaire du Sud se distingue par des paroles sincères, des mélodies accrocheuses et une énergie dorée. <br><br>
    Suis LA GENTE sur les réseaux pour plus de sons, vidéos et actualités !</p>
  </div>
  <div class="section" id="videos">
    <div class="section-title">VIDÉOS</div>
    <div class="videos">
      <div class="video-block">
        <p>Clip 1</p>
        <iframe src="https://www.youtube.com/embed/EcswS5weuw8" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
      <div class="video-block">
        <p>Clip 2</p>
        <iframe src="https://www.youtube.com/embed/GsVH4TgXI_o" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
      <div class="video-block">
        <p>Clip 3</p>
        <iframe src="https://www.youtube.com/embed/lfSXr4NlNgs" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
      <div class="video-block">
        <p>Clip 4</p>
        <iframe src="https://www.youtube.com/embed/ExPl7c7shqs" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
      <div class="video-block">
        <p>Clip 5</p>
        <iframe src="https://www.youtube.com/embed/wLDQV2RTZYk" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
      <div class="video-block">
        <p>Clip 6</p>
        <iframe src="https://www.youtube.com/embed/1xk3dylcONA" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
      <div class="video-block">
        <p>Clip 7</p>
        <iframe src="https://www.youtube.com/embed/ZopNevOGumk" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
      <div class="video-block">
        <p>Clip 8</p>
        <iframe src="https://www.youtube.com/embed/9BmNQzW9CWo" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
      </div>
    </div>
  </div>
  <div class="contact-link" id="contact">
    <b>Contact :</b> <a href="mailto:juanitoooo@live.fr" style="color:#FFD700;">juanitoooo@live.fr</a>
  </div>
</div>
<div class="footer">
  © 2025 LA GENTE - Site propulsé par GitHub Pages
</div>
<script>
document.querySelectorAll('.menu a').forEach(function(link){
  link.addEventListener('click', function(e){
    document.querySelectorAll('.menu a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
</script>
</body>
</html>
