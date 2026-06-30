/* ============================================================
   DJBILBOX BEATS — Smart Chat Assistant
   Simple intent-matching chatbot that directs users to products
   or collects contact info for secretary follow-up.
   ============================================================ */

window.CHAT = {
  responses: {
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
    'vst|plugin|synthé': {
      intent: 'category',
      reply: '🎛️ Vous cherchez un <strong>VST plugin</strong> ? Nous en avons 2 :\n\n🌙 <strong>Oriental Instrument</strong> — oud, qanun, percussions orientales\n🌆 <strong>Vice City</strong> — synthé 80s Synthwave',
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
    'prix|price|cost|gratuit|free': {
      intent: 'info',
      reply: '💰 <strong>Nos tarifs :</strong>\n\n✅ <strong>Tous les sample packs</strong> — GRATUIT (name-your-price)\n✅ <strong>Démos VST</strong> — GRATUIT\n💵 <strong>VST complets</strong> — à partir de €18.45 (50% off jusqu\'au 31 juil 2026)',
      actions: [
        { text: 'Voir les VST', href: 'vst.html' },
        { text: 'Télécharger les kits gratuits', href: 'drum-kits.html' }
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
      reply: '🤔 Je ne suis pas sûr de comprendre votre demande. Je vous mets en relation avec la secrétaire de DJBILBOX qui pourra mieux vous aider.',
      actions: [
        { text: 'Parler à la secrétaire', onclick: 'showContactForm()' },
        { text: 'Explorer le site', href: 'index.html' }
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
