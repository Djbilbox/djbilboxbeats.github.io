/* ============================================================
   DJBILBOX BEATS — Smart Chat Assistant
   Simple intent-matching chatbot that directs users to products
   or collects contact info for secretary follow-up.
   ============================================================ */

window.CHAT = {
  responses: {
    'bonjour|salut|hello|hey|coucou|yo|bonsoir|hi ': {
      intent: 'greeting',
      reply: '👋 Bonjour et bienvenue chez <strong>DJBILBOX BEATS</strong> ! Je peux vous renseigner sur nos VST, nos sample packs, les prix, les codes promo, les licences ou vous mettre en relation avec l\'équipe. Que cherchez-vous ?',
      actions: [
        { text: '🎛️ Voir les VST', href: 'vst.html' },
        { text: '🥁 Kits gratuits', href: 'drum-kits.html' },
        { text: '📧 Nous contacter', href: 'contact.html' }
      ]
    },
    'bigbass|big bass|lowrider|808|basse|low rider': {
      intent: 'product',
      reply: '🔊 <strong>BIGBASS</strong> — notre synthé de basse lowrider de Los Angeles : 6 vrais moteurs de basse (SUB, SLAM, PUNCH, GROWL, SCREAM, DOOM), 80 presets, VST3 & Standalone pour Windows & Mac.\n\n💰 <strong>€19.50</strong> au lieu de €39 avec le code <strong>BIGBASS50</strong> (offre de lancement -50%).',
      actions: [
        { text: 'Voir la fiche', href: 'product.html?id=bigbass' },
        { text: 'Acheter -50%', onclick: 'addToCart("BIGBASS — LA Lowrider Bass","19.50","xaziro/BIGBASS50")' }
      ]
    },
    oriental: {
      intent: 'product',
      reply: '🎹 Vous vous intéressez à l\'<strong>Oriental Instrument</strong> ? C\'est notre rompler Arabic & Oriental avec oud, qanun, ney authentiques.\n\n💰 Actuellement à <strong>€24.50</strong> (50% off) avec le code <strong>ORIENTAL50</strong> jusqu\'au 31 juillet 2026.',
      actions: [
        { text: 'Voir la fiche', href: 'product.html?id=oriental-instrument' },
        { text: 'Télécharger la démo', onclick: 'buy("oriental-instrument-demo-free-Download")' }
      ]
    },
    'vice-city': {
      intent: 'product',
      reply: '🌆 Vous cherchez <strong>Vice City</strong> ? Notre synthé Synthwave VST3 & Standalone — 80s neon pur.\n\n💰 <strong>€18.45</strong> (50% off) avec le code <strong>VICECITY50</strong> jusqu\'au 31 juillet 2026.',
      actions: [
        { text: 'Voir la fiche', href: 'product.html?id=vice-city' },
        { text: 'Acheter maintenant', onclick: 'addToCart("Vice City — VST Plugin","18.45","ykdzli/VICECITY50")' }
      ]
    },
    'vst|plugin|synthé|synth|instrument': {
      intent: 'category',
      reply: '🎛️ Vous cherchez un <strong>VST plugin</strong> ? Nous en avons 3 :\n\n🔊 <strong>BIGBASS</strong> — basse lowrider LA (€19.50, code BIGBASS50)\n🌆 <strong>Vice City</strong> — synthé 80s Synthwave (€18.45, code VICECITY50)\n🌙 <strong>Oriental Instrument</strong> — oud, qanun, percussions (€24.50, code ORIENTAL50)',
      actions: [
        { text: 'Voir tous les VST', href: 'vst.html' },
        { text: 'Drum Kits gratuits', href: 'drum-kits.html' }
      ]
    },
    'kit|drum|sample|boucle': {
      intent: 'category',
      reply: '🥁 Vous cherchez des <strong>sample packs</strong> ou <strong>drum kits</strong> ? Nous avons 6 packs gratuits :\n\n• Oriental Vol.1 • Vice City Vol.4 • Futur Melody\n• Drums Loop • Break Ya Neck • Ziploc Blue Pack',
      actions: [
        { text: 'Explorer les kits', href: 'drum-kits.html' },
        { text: 'Voir tous les produits', href: 'index.html' }
      ]
    },
    'prix|price|cost|combien|tarif|gratuit|free': {
      intent: 'info',
      reply: '💰 <strong>Nos tarifs :</strong>\n\n✅ <strong>Tous les sample packs</strong> — GRATUIT (name-your-price)\n✅ <strong>Démos VST</strong> — GRATUIT\n💵 <strong>BIGBASS</strong> — €19.50 (code BIGBASS50)\n💵 <strong>Vice City</strong> — €18.45 (code VICECITY50)\n💵 <strong>Oriental Instrument</strong> — €24.50 (code ORIENTAL50)',
      actions: [
        { text: 'Voir les VST', href: 'vst.html' },
        { text: 'Télécharger les kits gratuits', href: 'drum-kits.html' }
      ]
    },
    'code|promo|réduction|reduction|discount|coupon|offre|deal': {
      intent: 'info',
      reply: '🎟️ <strong>Codes promo actifs (-50%) :</strong>\n\n🔊 <strong>BIGBASS50</strong> → BIGBASS à €19.50\n🌆 <strong>VICECITY50</strong> → Vice City à €18.45\n🌙 <strong>ORIENTAL50</strong> → Oriental Instrument à €24.50\n\nLe code s\'applique automatiquement en cliquant sur « Acheter ».',
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
      reply: '🎵 Voulez-vous tester nos produits ?\n\n✅ <strong>Oriental Instrument</strong> — démo gratuite\n✅ <strong>Vice City</strong> — démo gratuite\n✅ <strong>Sample packs</strong> — tout gratuit',
      actions: [
        { text: 'Télécharger Oriental démo', onclick: 'buy("oriental-instrument-demo-free-Download")' },
        { text: 'Voir tous les produits', href: 'vst.html' }
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
      reply: '🤔 Je n\'ai pas toutes les infos pour ça, mais je peux vous orienter :\n\n🔊 <strong>VST plugins</strong> — BIGBASS, Vice City, Oriental\n🥁 <strong>Sample packs</strong> gratuits\n🎟️ <strong>Codes promo</strong> & prix\n📧 <strong>Contact direct</strong> : djbilboxbeats@gmail.com\n\nDites-m\'en un peu plus, ou laissez vos coordonnées et l\'équipe DJBILBOX vous répond sous 24h.',
      actions: [
        { text: 'Voir les VST', href: 'vst.html' },
        { text: 'Kits gratuits', href: 'drum-kits.html' },
        { text: 'Laisser un message', onclick: 'showContactForm()' }
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
  formData.append('_subject', `Nouvelle demande de contact — ${name}`);
  formData.append('_captcha', 'false');
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);
  formData.append('_next', location.href);

  fetch('https://formspree.io/f/mjvzgyeo', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(res => {
    if (res.ok) {
      const messagesDiv = document.getElementById('chatMessages');
      const successMsg = document.createElement('div');
      successMsg.className = 'chat-msg bot';
      successMsg.innerHTML = `<p>✅ <strong>Message envoyé !</strong></p>
        <p style="font-size:.85rem;color:var(--text-3)">La secrétaire de DJBILBOX vous contactera très bientôt à <strong>${email}</strong></p>`;
      messagesDiv.appendChild(successMsg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }).catch(err => console.error('Chat form error:', err));
}

function openContactForm() {
  showContactForm();
}

// Mount chat on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initChat);
