/* ============================================================
   DJBILBOX BEATS — Rich info content for the free VST detail pages
   Keyed by the `id` used in vst-data.js. Rendered by free-vst.html.
   `long`  : 2-3 sentence description (FR)
   `feats` : [{i:fa-icon, t:title, d:description}]  (3-4 items)
   `dev`   : developer / editor name
   ============================================================ */
window.FREE_VST_INFO = {
  /* ---------- Synths & Instruments ---------- */
  vital: {
    dev:"Vital Audio",
    long:"Vital est un synthétiseur wavetable spectral moderne. Sa version gratuite est déjà extrêmement complète : oscillateurs wavetable, modulation visuelle en temps réel, unison stéréo large et effets intégrés. Idéal pour créer des basses, leads et nappes modernes en trap, drill et électronique.",
    feats:[
      {i:"fa-wave-square",t:"Oscillateurs wavetable",d:"Dessinez et morphez vos propres tables d'ondes pour des sons uniques."},
      {i:"fa-diagram-project",t:"Modulation visuelle",d:"Glissez-déposez les modulations : tout est visible et animé en temps réel."},
      {i:"fa-layer-group",t:"Unison & stéréo",d:"Un moteur d'unison large pour des sons massifs et immersifs."},
      {i:"fa-plug",t:"VST3 · AU",d:"Fonctionne dans FL Studio et tous les DAW modernes."}
    ]
  },
  zebralette: {
    dev:"u-he",
    long:"Zebralette est un mini-synthé gratuit basé sur un seul oscillateur du célèbre Zebra d'u-he. Malgré sa simplicité, il offre une synthèse spectrale puissante, un LFO, une enveloppe et des effets intégrés. Parfait pour apprendre la synthèse u-he et créer des leads et pads expressifs.",
    feats:[
      {i:"fa-wave-square",t:"Oscillateur Zebra",d:"Le moteur spectral de Zebra dans une interface épurée."},
      {i:"fa-sliders",t:"Morphing spectral",d:"Transformez la forme d'onde pour des timbres évolutifs."},
      {i:"fa-guitar",t:"Leads & pads",d:"Excellent pour des mélodies chaudes et des nappes riches."},
      {i:"fa-plug",t:"VST · gratuit",d:"Signé u-he, une référence du software audio."}
    ]
  },
  mg1: {
    dev:"Cherry Audio",
    long:"Le Surrealistic MG-1 Plus est une émulation gratuite du synthétiseur analogique Realistic MG-1 (fabriqué par Moog). Cherry Audio recrée fidèlement ses oscillateurs chauds et son filtre caractéristique. Parfait pour des basses grasses, des leads vintage et des sonorités G-Funk / synthwave.",
    feats:[
      {i:"fa-wave-square",t:"Oscillateurs analogiques",d:"Le son chaud et épais des synthés Moog vintage."},
      {i:"fa-filter",t:"Filtre caractéristique",d:"Un filtre résonnant idéal pour les basses et leads."},
      {i:"fa-sun",t:"Vibe G-Funk",d:"Parfait pour les leads west-coast et synthwave."},
      {i:"fa-plug",t:"100% gratuit",d:"Offert par Cherry Audio, qualité pro."}
    ]
  },
  drum8: {
    dev:"Audiolatry",
    long:"Drum8 est un rompler de batterie gratuit signé Audiolatry, pensé pour le hip-hop et la trap. Il embarque de nombreux kits prêts à l'emploi avec réglages de gain, filtre et reverb. Chargez un kit, jouez les pads et composez vos patterns en quelques secondes.",
    feats:[
      {i:"fa-drum",t:"Kits hip-hop & trap",d:"Des batteries prêtes à l'emploi pour vos beats."},
      {i:"fa-sliders",t:"Gain · filtre · reverb",d:"Sculptez rapidement le son de chaque kit."},
      {i:"fa-bolt",t:"Workflow rapide",d:"Chargez, jouez, exportez — pensé pour la prod rapide."},
      {i:"fa-plug",t:"VST gratuit",d:"Parfait comme complément à vos drum kits."}
    ]
  },

  /* ---------- Effects ---------- */
  ott: {
    dev:"Xfer Records",
    long:"OTT est le compresseur multibande gratuit le plus utilisé au monde, signé Xfer Records (créateurs de Serum). Il applique une compression up/down agressive sur 3 bandes pour ce son moderne, clair et « pro » qu'on entend partout en trap, EDM et pop.",
    feats:[
      {i:"fa-layer-group",t:"Compression 3 bandes",d:"Traite graves, médiums et aigus séparément."},
      {i:"fa-arrows-up-down",t:"Up / Down compression",d:"Rehausse les détails et écrase les pics."},
      {i:"fa-wand-magic-sparkles",t:"Son moderne instantané",d:"Ce grain « pro » sur les basses, synthés et voix."},
      {i:"fa-plug",t:"Gratuit · Xfer",d:"Par les créateurs de Serum."}
    ]
  },
  camelcrusher: {
    dev:"Camel Audio",
    long:"CamelCrusher est un plugin gratuit légendaire de distorsion et coloration. Il combine deux types de distorsion (tube & mécanique), un compresseur « phat » et un filtre. Parfait pour salir des basses, épaissir des drums ou donner du caractère à n'importe quelle piste.",
    feats:[
      {i:"fa-fire",t:"Double distorsion",d:"Tube chaud + distorsion mécanique agressive."},
      {i:"fa-compress",t:"Compresseur Phat",d:"Épaissit et colle instantanément le son."},
      {i:"fa-filter",t:"Filtre intégré",d:"Sculptez le grain avec cutoff et résonance."},
      {i:"fa-plug",t:"Gratuit · légendaire",d:"Un classique présent dans tous les studios."}
    ]
  },
  supermassive: {
    dev:"Valhalla DSP",
    long:"ValhallaSupermassive est un plugin gratuit de reverbs géantes et de delays massifs signé Valhalla DSP. Ses modes créent des espaces immenses, des échos ambiants et des nappes évolutives. Idéal pour les intros, les ambiances et le sound design cinématique.",
    feats:[
      {i:"fa-water",t:"Reverbs géantes",d:"Des espaces immenses et ambiants."},
      {i:"fa-clock-rotate-left",t:"Delays massifs",d:"Échos évolutifs et texturés."},
      {i:"fa-infinity",t:"Modes créatifs",d:"Plusieurs algorithmes aux noms de galaxies."},
      {i:"fa-plug",t:"Gratuit · Valhalla",d:"Une référence mondiale de la reverb."}
    ]
  },
  freqecho: {
    dev:"Valhalla DSP",
    long:"ValhallaFreqEcho est un delay gratuit à décalage de fréquence (frequency shifter + echo) de Valhalla DSP. Il crée des effets psychédéliques, des montées métalliques et des ambiances hors du commun. Parfait pour le sound design et les transitions.",
    feats:[
      {i:"fa-clock-rotate-left",t:"Delay + freq shift",d:"Échos qui montent ou descendent en fréquence."},
      {i:"fa-wand-magic-sparkles",t:"Effets psychédéliques",d:"Textures uniques et évolutives."},
      {i:"fa-sliders",t:"Simple & musical",d:"Peu de réglages, résultats immédiats."},
      {i:"fa-plug",t:"Gratuit · Valhalla",d:"Idéal pour le sound design."}
    ]
  },
  spacemodulator: {
    dev:"Valhalla DSP",
    long:"ValhallaSpaceModulator est un flanger gratuit de Valhalla DSP, capable d'effets de modulation subtils comme extrêmes. Du léger chorus au flanger « jet » spatial, il ajoute mouvement et largeur stéréo à vos sons.",
    feats:[
      {i:"fa-wave-square",t:"Flanger classique",d:"Du chorus subtil au flanger extrême."},
      {i:"fa-arrows-left-right",t:"Largeur stéréo",d:"Ajoute mouvement et espace."},
      {i:"fa-rocket",t:"Effets spatiaux",d:"Sons « jet » et modulations profondes."},
      {i:"fa-plug",t:"Gratuit · Valhalla",d:"Qualité studio, zéro coût."}
    ]
  },
  graillon3: {
    dev:"Auburn Sounds",
    long:"Graillon 3 (version gratuite) d'Auburn Sounds est un correcteur de hauteur / auto-tune en temps réel. Il offre une correction propre, un effet « robot » pour les voix modernes et un changeur d'octave. Parfait pour l'autotune trap et les effets vocaux.",
    feats:[
      {i:"fa-microphone",t:"Auto-tune temps réel",d:"Correction de hauteur immédiate."},
      {i:"fa-robot",t:"Effet robot",d:"Le son autotune moderne façon trap."},
      {i:"fa-arrow-up-wide-short",t:"Octave shift",d:"Changez l'octave de la voix."},
      {i:"fa-plug",t:"Gratuit · Auburn",d:"Version gratuite déjà très complète."}
    ]
  },
  mautopitch: {
    dev:"MeldaProduction",
    long:"MAutoPitch est un correcteur de hauteur et auto-tune gratuit ultra-complet de MeldaProduction. Correction automatique selon la gamme, contrôle des formants, largeur stéréo et effet de detune. Un excellent auto-tune gratuit pour vos voix.",
    feats:[
      {i:"fa-microphone",t:"Correction auto",d:"S'accorde à la gamme choisie."},
      {i:"fa-wave-square",t:"Formants & detune",d:"Garde une voix naturelle ou robotisée."},
      {i:"fa-arrows-left-right",t:"Largeur stéréo",d:"Élargit la voix instantanément."},
      {i:"fa-plug",t:"Gratuit · Melda",d:"Qualité pro, sans limite."}
    ]
  },
  talvocoder: {
    dev:"TAL Software",
    long:"TAL-Vocoder-2 est une émulation gratuite de vocodeur analogique vintage des années 80, signée TAL Software. Il transforme votre voix en textures robotiques et harmoniques classiques. Parfait pour les hooks, les nappes vocales et le son rétro.",
    feats:[
      {i:"fa-microphone",t:"Vocodeur vintage",d:"Le son robotique analogique des années 80."},
      {i:"fa-music",t:"Voix harmonisées",d:"Transformez la voix en nappe mélodique."},
      {i:"fa-sliders",t:"Carrier intégré",d:"Synthé porteur inclus, prêt à jouer."},
      {i:"fa-plug",t:"Gratuit · TAL",d:"Un vocodeur culte, offert."}
    ]
  },
  tdeesser: {
    dev:"Techivation",
    long:"T-De-Esser 2 de Techivation est un de-esser gratuit moderne, simple et transparent. Il contrôle les sibilances (les « s » agressifs) de vos voix en un seul réglage, sans altérer le reste du son. Indispensable au mixage vocal.",
    feats:[
      {i:"fa-volume-low",t:"Contrôle des sibilances",d:"Dompte les « s » agressifs des voix."},
      {i:"fa-sliders",t:"Une seule commande",d:"Simple et rapide à régler."},
      {i:"fa-wand-magic-sparkles",t:"Transparent",d:"Ne dénature pas la voix."},
      {i:"fa-plug",t:"Gratuit · Techivation",d:"Qualité mixage pro."}
    ]
  },
  surgext: {
    dev:"Surge Synth Team",
    long:"Surge XT Effects est le rack d'effets complet extrait du synthétiseur open-source Surge XT. Reverbs, delays, distortions, chorus, EQ, vocoder et bien plus — des dizaines d'effets de qualité, 100% gratuits et open-source.",
    feats:[
      {i:"fa-layer-group",t:"Dizaines d'effets",d:"Reverb, delay, distorsion, chorus, EQ…"},
      {i:"fa-code",t:"Open-source",d:"Développé par une large communauté."},
      {i:"fa-sliders",t:"Tout-en-un",d:"Un seul plugin pour de multiples effets."},
      {i:"fa-plug",t:"Gratuit · libre",d:"Aucune limite, aucune licence."}
    ]
  },
  neuralq: {
    dev:"Analog Obsession",
    long:"NeuralQ d'Analog Obsession est un égaliseur et saturateur gratuit inspiré d'un célèbre EQ à lampes (Pultec), modélisé via réseau de neurones. Il apporte chaleur, air et couleur analogique à vos bus, voix et masters.",
    feats:[
      {i:"fa-sliders",t:"EQ style Pultec",d:"Le grain d'un EQ à lampes légendaire."},
      {i:"fa-fire",t:"Saturation analogique",d:"Chaleur et harmoniques musicales."},
      {i:"fa-star",t:"Bus & mastering",d:"Idéal sur voix, drums et master."},
      {i:"fa-plug",t:"Gratuit · Analog Obsession",d:"Modélisation neuronale."}
    ]
  }
};
