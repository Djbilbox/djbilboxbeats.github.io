/* ============================================================
   DJBILBOX BEATS — Smart Chat Assistant
   Simple intent-matching chatbot that directs users to products
   or collects contact info for secretary follow-up.
   ============================================================ */

window.CHAT = {
  responses: {
    'bonjour|salut|hello|hey|coucou|yo|bonsoir|hi|ça va|ca va|cv|quoi|comment ça|comment ca': {
      intent: 'greeting',
      reply: '👋 Yo ! Bienvenue chez <strong>DJBILBOX BEATS</strong> ! 🎵\n\nJe suis là pour vous aider — que ce soit pour trouver le VST parfait (BIGBASS, Vice City, Oriental), nos sample packs pro, les tarifs, ou pour nous contacter. 🔥 -80% Summer Sale en cours (code SOLDES80) !',
      actions: [
        { text: '🎛️ VST plugins', href: 'vst.html' },
        { text: '🥁 Drum Kits', href: 'drum-kits.html' },
        { text: '💰 Tous les tarifs', href: 'vst.html' }
      ]
    },
    'bigbass|big bass|lowrider|808|basse|low rider': {
      intent: 'product',
      reply: '🔊 <strong>BIGBASS</strong> — notre synthé de basse lowrider de Los Angeles : 3 moteurs de basse, 80 presets, VST3 & Standalone pour Windows & Mac.\n\n🔥 <strong>$5.80</strong> (au lieu de $29, code SOLDES80 -80%)',
      actions: [
        { text: 'Voir la fiche', href: 'product.html?id=bigbass' },
        { text: 'Acheter', onclick: 'addToCart("BIGBASS — LA Lowrider Bass","5.80","xaziro")' }
      ]
    },
    oriental: {
      intent: 'product',
      reply: '🎹 Vous vous intéressez à l\'<strong>Oriental Instrument</strong> ? C\'est notre rompler Arabic & Oriental avec oud, qanun, ney authentiques — 280+ instruments.\n\n🔥 <strong>$13.80</strong> (au lieu de $69, code SOLDES80 -80%)',
      actions: [
        { text: 'Voir la fiche', href: 'product.html?id=oriental-instrument' },
        { text: 'Acheter', onclick: 'buy("oriental-instrument-djbilbox-beats/SOLDES80")' }
      ]
    },
    'vice-city': {
      intent: 'product',
      reply: '🌆 Vous cherchez <strong>Vice City</strong> ? Notre synthé Synthwave VST3 & Standalone — 80s neon pur, 70 presets.\n\n🔥 <strong>$7.80</strong> (au lieu de $39, code SOLDES80 -80%)',
      actions: [
        { text: 'Voir la fiche', href: 'product.html?id=vice-city' },
        { text: 'Acheter', onclick: 'addToCart("Vice City — VST Plugin","7.80","ykdzli")' }
      ]
    },
    'vst|plugin|synthé|synth|instrument': {
      intent: 'category',
      reply: '🎛️ Vous cherchez un <strong>VST plugin</strong> ? 🔥 -80% Summer Sale (code SOLDES80)\n\n🔊 <strong>BIGBASS</strong> — basse lowrider LA ($5.80)\n🌆 <strong>Vice City</strong> — synthé 80s Synthwave ($7.80)\n🎹 <strong>MATRIX MODULAR</strong> — modulation stéréo ($3.60)\n⚡ <strong>MACHINA</strong> — multi-effet créatif ($3.60)\n🌙 <strong>Oriental Instrument</strong> — oud, qanun, percussions ($13.80, 280+ instruments)',
      actions: [
        { text: 'Voir tous les VST', href: 'vst.html' },
        { text: 'Voir les Drum Kits', href: 'drum-kits.html' }
      ]
    },
    'kit|drum|sample|boucle|loop|808|vocal|acapella|sfx|scratch|vinyl|one-shot|one shot': {
      intent: 'category',
      reply: '🥁 Nous avons une grosse bibliothèque de <strong>sample packs</strong> pro — à partir de $5 !\n\n🎁 TONE VAULT, VOID SIGNALS 19GB, GHOST VOICE, RAW ELEMENTS, VINYL BREAKER, NEON PULSE, CONCRETE VAULT, WESTCOAST CHROME, ETNIC RITMIK et plus.',
      actions: [
        { text: 'Explorer tous les kits', href: 'drum-kits.html' }
      ]
    },
    'bundle|pack complet|all vst|tout': {
      intent: 'product',
      reply: '🎁 <strong>ALL VST PACK</strong> — Tous les 5 VST en un seul pack !\n\n✅ <strong>5 VSTs complets :</strong> BIGBASS, Vice City, MATRIX MODULAR, MACHINA + Oriental Instrument\n🔥 <strong>$9.80</strong> au lieu de $49 (code SOLDES80, -80%)\n✅ Tous les presets et manuals inclus',
      actions: [
        { text: 'Voir tous les VST', href: 'vst.html' }
      ]
    },
    'prix|price|cost|combien|tarif': {
      intent: 'info',
      reply: '💰 <strong>Prix (🔥 -80% Summer Sale · code SOLDES80) :</strong>\n\n⚡ <strong>MACHINA</strong> — $3.60\n🎹 <strong>MATRIX MODULAR</strong> — $3.60\n🔊 <strong>BIGBASS</strong> — $5.80\n🌆 <strong>Vice City</strong> — $7.80\n🌙 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)\n🎁 <strong>ALL VST PACK</strong> — $9.80 (les 5 VST)\n🥁 <strong>Sample packs</strong> — à partir de $5',
      actions: [
        { text: 'Voir tous les VST', href: 'vst.html' },
        { text: 'Voir les sample packs', href: 'drum-kits.html' }
      ]
    },
    'code|promo|réduction|reduction|discount|coupon|offre|deal|solde': {
      intent: 'info',
      reply: '🔥 <strong>Summer Sale -80% :</strong>\n\n🎟️ Utilisez le code <strong>SOLDES80</strong> au checkout pour -80% sur tous les VST !\n\n🎁 <strong>ALL VST PACK</strong> — les 5 VST pour $9.80 (au lieu de $49)\n💵 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)',
      actions: [
        { text: 'Voir tous les VST', href: 'vst.html' }
      ]
    },
    'acheter|achat|commander|commande|order|buy|payer|panier|cart': {
      intent: 'action',
      reply: '🛒 Pour commander : ajoutez le produit au panier puis validez — le paiement se fait de façon sécurisée via Gumroad (carte ou PayPal). Le téléchargement est <strong>instantané</strong> après l\'achat, avec votre clé de licence.',
      actions: [
        { text: 'Voir les VST', href: 'vst.html' },
        { text: 'Voir mon panier', onclick: 'openCart()' }
      ]
    },
    'télécharger|telecharger|download|installer|install|installation|activer|licence key|serial': {
      intent: 'info',
      reply: '⬇️ <strong>Téléchargement & installation :</strong>\n\n1. Après l\'achat sur Gumroad, vous recevez un lien de téléchargement instantané + votre clé de licence par email.\n2. Lancez l\'installateur Windows (.exe) ou le DMG macOS.\n3. Ouvrez votre DAW, chargez le VST3 et activez avec votre clé.\n\nUn souci ? Écrivez-nous, on vous aide.',
      actions: [
        { text: 'Nous contacter', href: 'contact.html' }
      ]
    },
    'windows|mac|macos|compatib|format|vst3|standalone|daw|fl studio|ableton|logic|cubase|reaper': {
      intent: 'info',
      reply: '💻 <strong>Compatibilité :</strong>\n\n✅ <strong>Windows 10/11</strong> & <strong>macOS</strong> (64-bit, Intel + Apple Silicon)\n✅ Formats <strong>VST3</strong> et <strong>Standalone</strong>\n✅ Fonctionne dans FL Studio, Ableton, Logic, Cubase, Reaper et tous les DAW compatibles VST3.',
      actions: [
        { text: 'Voir les VST', href: 'vst.html' }
      ]
    },
    'paiement|payment|paypal|carte|securisé|sécurisé|remboursement|refund|facture': {
      intent: 'info',
      reply: '🔒 <strong>Paiement & sécurité :</strong>\n\nLes paiements sont traités par <strong>Gumroad</strong> (carte bancaire ou PayPal), 100% sécurisé. Vous recevez une facture par email. Pour toute question sur une commande ou un remboursement, contactez-nous directement.',
      actions: [
        { text: 'Nous contacter', href: 'contact.html' }
      ]
    },
    'licence|license|royalties|droit': {
      intent: 'info',
      reply: '📋 <strong>Licences disponibles :</strong>\n\n🆓 <strong>Free for profit</strong> — Utilisez dans vos productions commerciales\n💎 <strong>Exclusive license</strong> — Droits exclusifs (sur demande)',
      actions: [
        { text: 'Lire les termes complets', href: 'license.html' },
        { text: 'Contacter pour exclusive', onclick: 'openContactForm()' }
      ]
    },
    'contact|aide|help|support': {
      intent: 'contact',
      reply: '📧 Vous voulez nous contacter ? Je peux vous mettre en relation avec la secrétaire de DJBILBOX.',
      actions: [
        { text: 'Envoyer un message', onclick: 'showContactForm()' }
      ]
    },
    'démo|demo|essayer|try': {
      intent: 'action',
      reply: '🎵 Tous nos produits sont en 🔥 -80% Summer Sale (code SOLDES80) !\n\n🎁 <strong>ALL VST PACK</strong> — les 5 VST pour $9.80\n🌙 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)\n🥁 <strong>Sample packs</strong> — à partir de $5',
      actions: [
        { text: 'Voir tous les VST', href: 'vst.html' },
        { text: 'Voir les sample packs', href: 'drum-kits.html' }
      ]
    }
  },

  match(userText) {
    const text = userText.toLowerCase();
    for (const [keywords, data] of Object.entries(this.responses)) {
      const patterns = keywords.split('|');
      if (patterns.some(p => text.includes(p))) {
        return data;
      }
    }
    return null;
  },

  respond(userText) {
    const matched = this.match(userText);
    if (matched) {
      return matched;
    }
    return {
      intent: 'unknown',
      reply: '🎵 Je vois pas tout, mais je peux vous orienter vers ce qu\'il y a sur DJBILBOX BEATS :\n\n🎛️ <strong>4 VST</strong> — BIGBASS ($5.80), Vice City ($7.80), MATRIX ($3.60), MACHINA ($3.60)\n🌙 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)\n🥁 <strong>Sample packs</strong> — à partir de $5\n🔥 <strong>-80% Summer Sale</strong> — code SOLDES80 !\n\nOu écrivez directement à <strong>djbilboxbeats@gmail.com</strong> — l\'équipe répond sous 24h.',
      actions: [
        { text: 'Tous les produits', href: 'index.html' },
        { text: 'VST & Kits', href: 'vst.html' },
        { text: 'Me contacter', onclick: 'showContactForm()' }
      ]
    };
  }
};

/* Expose helpers to window */
window.sendChatMessage = sendChatMessage;
window.closeChat = closeChat;
window.showContactForm = showContactForm;
window.submitContact = submitContact;
window.openContactForm = openContactForm;

/* ============================================================
   CHAT UI — mount, render messages, handle interactions
   ============================================================ */

function initChat() {
  const chatBox = document.getElementById('aiChat');
  if (!chatBox) return;

  chatBox.innerHTML = `
    <div class="chat-header">
      <strong style="font-family:var(--font-a);text-transform:uppercase;font-size:.9rem">DJBILBOX Assistant</strong>
      <button class="chat-close" onclick="closeChat()" aria-label="Close">✕</button>
    </div>
    <div class="chat-messages" id="chatMessages">
      <div class="chat-msg bot">
        <p>Bonjour! 👋 Je suis l'assistant DJBILBOX. Comment puis-je vous aider aujourd'hui ?</p>
        <p style="font-size:.7rem;margin-top:6px;color:var(--text-4)">Posez une question sur nos VST, kits, prix, ou services...</p>
      </div>
    </div>
    <div class="chat-input-wrap">
      <input type="text" id="chatInput" class="chat-input" placeholder="Votre question..." autocomplete="off">
      <button class="chat-send" onclick="sendChatMessage()" aria-label="Send">
        <i class="fa-solid fa-arrow-up"></i>
      </button>
    </div>`;

  document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  });
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input?.value.trim();
  if (!text) return;

  const messagesDiv = document.getElementById('chatMessages');
  if (!messagesDiv) return;

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerHTML = `<p>${text}</p>`;
  messagesDiv.appendChild(userMsg);

  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Bot response (after short delay)
  setTimeout(() => {
    const resp = CHAT.respond(text);
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot';
    let actionsHtml = '';
    if (resp.actions?.length) {
      actionsHtml = `<div class="chat-actions">
        ${resp.actions.map(a => {
          if (a.onclick) {
            return `<button class="chat-action-btn" onclick="${a.onclick}">${a.text}</button>`;
          } else {
            return `<a href="${a.href}" class="chat-action-btn">${a.text}</a>`;
          }
        }).join('')}
      </div>`;
    }
    botMsg.innerHTML = `<p>${resp.reply}</p>${actionsHtml}`;
    messagesDiv.appendChild(botMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 400);
}

function closeChat() {
  document.getElementById('aiChat')?.classList.remove('open');
}

function showContactForm() {
  const messagesDiv = document.getElementById('chatMessages');
  if (!messagesDiv) return;

  const formMsg = document.createElement('div');
  formMsg.className = 'chat-msg bot';
  formMsg.innerHTML = `
    <p>Excellent ! Laissez vos coordonnées et on vous contactera :</p>
    <form class="chat-contact-form" onsubmit="submitContact(event)">
      <input type="text" placeholder="Votre nom" required style="margin-bottom:8px">
      <input type="email" placeholder="Votre email" required style="margin-bottom:8px">
      <textarea placeholder="Votre message..." required style="margin-bottom:8px;min-height:60px"></textarea>
      <button type="submit" class="chat-action-btn" style="width:100%;background:var(--accent);color:#fff">Envoyer</button>
    </form>`;
  messagesDiv.appendChild(formMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const [nameInput, emailInput, textInput] = form.querySelectorAll('input, textarea');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = textInput.value.trim();

  if (!name || !email || !message) return;

  // Send via FormSubmit
  const formData = new FormData();
  formData.append('_subject', `Nouveau message du chat — ${name}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);

  fetch('https://formsubmit.co/ajax/djbilboxbeats@gmail.com', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(res => res.json()).then(data => {
    if (String(data.success) !== 'true') throw new Error(data.message || 'send failed');
    const messagesDiv = document.getElementById('chatMessages');
    const successMsg = document.createElement('div');
    successMsg.className = 'chat-msg bot';
    successMsg.innerHTML = `<p>✅ <strong>Message envoyé !</strong></p>
      <p style="font-size:.85rem;color:var(--text-3)">L'équipe DJBILBOX vous contactera très bientôt à <strong>${email}</strong></p>`;
    messagesDiv.appendChild(successMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }).catch(err => {
    console.error('Chat form error:', err);
    const messagesDiv = document.getElementById('chatMessages');
    const errMsg = document.createElement('div');
    errMsg.className = 'chat-msg bot';
    errMsg.innerHTML = `<p>⚠️ L'envoi a échoué. Écrivez-nous directement à <strong>djbilboxbeats@gmail.com</strong>.</p>`;
    messagesDiv.appendChild(errMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

function openContactForm() {
  showContactForm();
}

// Mount chat on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initChat);
