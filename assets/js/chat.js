/* ============================================================
   DJBILBOX BEATS — Smart Chat Assistant
   Simple intent-matching chatbot that directs users to products
   or collects contact info for secretary follow-up.
   Replies are in English (site source language) so the language
   switcher (Google Translate) can localise them. Keyword triggers
   keep both English and French terms so input in either works.
   ============================================================ */

window.CHAT = {
  responses: {
    'bonjour|salut|hello|hey|coucou|yo|bonsoir|hi|ça va|ca va|cv|quoi|comment ça|comment ca': {
      intent: 'greeting',
      reply: '👋 Yo! Welcome to <strong>DJBILBOX BEATS</strong>! 🎵\n\nI\'m here to help — whether it\'s finding the perfect VST (BIGBASS, Vice City, Oriental), our pro sample packs, prices, or getting in touch. 🔥 -80% Summer Sale on now (code SOLDES80)!',
      actions: [
        { text: '🎛️ VST plugins', href: 'vst.html' },
        { text: '🥁 Drum Kits', href: 'drum-kits.html' },
        { text: '💰 All prices', href: 'vst.html' }
      ]
    },
    'bigbass|big bass|lowrider|808|basse|low rider': {
      intent: 'product',
      reply: '🔊 <strong>BIGBASS</strong> — our Los Angeles lowrider bass synth: 3 bass engines, 80 presets, VST3 & Standalone for Windows & Mac.\n\n🔥 <strong>$5.80</strong> (instead of $29, code SOLDES80 -80%)',
      actions: [
        { text: 'View details', href: 'product.html?id=bigbass' },
        { text: 'Buy', onclick: 'addToCart("BIGBASS — LA Lowrider Bass","5.80","xaziro")' }
      ]
    },
    oriental: {
      intent: 'product',
      reply: '🎹 Interested in the <strong>Oriental Instrument</strong>? It\'s our Arabic & Oriental rompler with authentic oud, qanun, ney — 280+ instruments.\n\n🔥 <strong>$13.80</strong> (instead of $69, code SOLDES80 -80%)',
      actions: [
        { text: 'View details', href: 'product.html?id=oriental-instrument' },
        { text: 'Buy', onclick: 'buy("oriental-instrument-djbilbox-beats/SOLDES80")' }
      ]
    },
    'vice-city': {
      intent: 'product',
      reply: '🌆 Looking for <strong>Vice City</strong>? Our Synthwave VST3 & Standalone synth — pure 80s neon, 70 presets.\n\n🔥 <strong>$7.80</strong> (instead of $39, code SOLDES80 -80%)',
      actions: [
        { text: 'View details', href: 'product.html?id=vice-city' },
        { text: 'Buy', onclick: 'addToCart("Vice City — VST Plugin","7.80","ykdzli")' }
      ]
    },
    'vst|plugin|synthé|synth|instrument': {
      intent: 'category',
      reply: '🎛️ Looking for a <strong>VST plugin</strong>? 🔥 -80% Summer Sale (code SOLDES80)\n\n🔊 <strong>BIGBASS</strong> — LA lowrider bass ($5.80)\n🌆 <strong>Vice City</strong> — 80s Synthwave synth ($7.80)\n🎹 <strong>MATRIX MODULAR</strong> — stereo modulation ($3.60)\n⚡ <strong>MACHINA</strong> — creative multi-effect ($3.60)\n🌙 <strong>Oriental Instrument</strong> — oud, qanun, percussion ($13.80, 280+ instruments)',
      actions: [
        { text: 'See all VSTs', href: 'vst.html' },
        { text: 'See Drum Kits', href: 'drum-kits.html' }
      ]
    },
    'kit|drum|sample|boucle|loop|808|vocal|acapella|sfx|scratch|vinyl|one-shot|one shot': {
      intent: 'category',
      reply: '🥁 We have a huge library of pro <strong>sample packs</strong> — starting at $5!\n\n🎁 TONE VAULT, VOID SIGNALS 19GB, GHOST VOICE, RAW ELEMENTS, VINYL BREAKER, NEON PULSE, CONCRETE VAULT, WESTCOAST CHROME, ETNIC RITMIK and more.',
      actions: [
        { text: 'Browse all kits', href: 'drum-kits.html' }
      ]
    },
    'bundle|pack complet|all vst|tout': {
      intent: 'product',
      reply: '🎁 <strong>ALL VST PACK</strong> — all 5 VSTs in one pack!\n\n✅ <strong>5 complete VSTs:</strong> BIGBASS, Vice City, MATRIX MODULAR, MACHINA + Oriental Instrument\n🔥 <strong>$9.80</strong> instead of $49 (code SOLDES80, -80%)\n✅ All presets and manuals included',
      actions: [
        { text: 'See all VSTs', href: 'vst.html' }
      ]
    },
    'prix|price|cost|combien|tarif': {
      intent: 'info',
      reply: '💰 <strong>Prices (🔥 -80% Summer Sale · code SOLDES80):</strong>\n\n⚡ <strong>MACHINA</strong> — $3.60\n🎹 <strong>MATRIX MODULAR</strong> — $3.60\n🔊 <strong>BIGBASS</strong> — $5.80\n🌆 <strong>Vice City</strong> — $7.80\n🌙 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)\n🎁 <strong>ALL VST PACK</strong> — $9.80 (all 5 VSTs)\n🥁 <strong>Sample packs</strong> — starting at $5',
      actions: [
        { text: 'See all VSTs', href: 'vst.html' },
        { text: 'See sample packs', href: 'drum-kits.html' }
      ]
    },
    'code|promo|réduction|reduction|discount|coupon|offre|deal|solde|sale': {
      intent: 'info',
      reply: '🔥 <strong>Summer Sale -80%:</strong>\n\n🎟️ Use code <strong>SOLDES80</strong> at checkout for -80% off all VSTs!\n\n🎁 <strong>ALL VST PACK</strong> — all 5 VSTs for $9.80 (instead of $49)\n💵 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)',
      actions: [
        { text: 'See all VSTs', href: 'vst.html' }
      ]
    },
    'acheter|achat|commander|commande|order|buy|payer|panier|cart': {
      intent: 'action',
      reply: '🛒 To order: add the product to your cart and check out — payment is handled securely via Gumroad (card or PayPal). Download is <strong>instant</strong> after purchase, with your license key.',
      actions: [
        { text: 'See the VSTs', href: 'vst.html' },
        { text: 'View my cart', onclick: 'openCart()' }
      ]
    },
    'télécharger|telecharger|download|installer|install|installation|activer|licence key|serial': {
      intent: 'info',
      reply: '⬇️ <strong>Download & installation:</strong>\n\n1. After purchase on Gumroad, you get an instant download link + your license key by email.\n2. Run the Windows installer (.exe) or the macOS DMG.\n3. Open your DAW, load the VST3 and activate with your key.\n\nAny trouble? Write to us and we\'ll help.',
      actions: [
        { text: 'Contact us', href: 'contact.html' }
      ]
    },
    'windows|mac|macos|compatib|format|vst3|standalone|daw|fl studio|ableton|logic|cubase|reaper': {
      intent: 'info',
      reply: '💻 <strong>Compatibility:</strong>\n\n✅ <strong>Windows 10/11</strong> & <strong>macOS</strong> (64-bit, Intel + Apple Silicon)\n✅ <strong>VST3</strong> and <strong>Standalone</strong> formats\n✅ Works in FL Studio, Ableton, Logic, Cubase, Reaper and every VST3-compatible DAW.',
      actions: [
        { text: 'See the VSTs', href: 'vst.html' }
      ]
    },
    'paiement|payment|paypal|carte|securisé|sécurisé|secure|remboursement|refund|facture|invoice': {
      intent: 'info',
      reply: '🔒 <strong>Payment & security:</strong>\n\nPayments are processed by <strong>Gumroad</strong> (bank card or PayPal), 100% secure. You get an invoice by email. For any question about an order or a refund, contact us directly.',
      actions: [
        { text: 'Contact us', href: 'contact.html' }
      ]
    },
    'licence|license|royalties|droit|rights': {
      intent: 'info',
      reply: '📋 <strong>Available licenses:</strong>\n\n🆓 <strong>Free for profit</strong> — use in your commercial productions\n💎 <strong>Exclusive license</strong> — exclusive rights (on request)',
      actions: [
        { text: 'Read full terms', href: 'license.html' },
        { text: 'Ask about exclusive', onclick: 'openContactForm()' }
      ]
    },
    'contact|aide|help|support': {
      intent: 'contact',
      reply: '📧 Want to reach us? I can put you in touch with the DJBILBOX secretary.',
      actions: [
        { text: 'Send a message', onclick: 'showContactForm()' }
      ]
    },
    'démo|demo|essayer|try': {
      intent: 'action',
      reply: '🎵 All our products are in the 🔥 -80% Summer Sale (code SOLDES80)!\n\n🎁 <strong>ALL VST PACK</strong> — all 5 VSTs for $9.80\n🌙 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)\n🥁 <strong>Sample packs</strong> — starting at $5',
      actions: [
        { text: 'See all VSTs', href: 'vst.html' },
        { text: 'See sample packs', href: 'drum-kits.html' }
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
      reply: '🎵 I don\'t catch everything, but I can point you to what\'s on DJBILBOX BEATS:\n\n🎛️ <strong>4 VSTs</strong> — BIGBASS ($5.80), Vice City ($7.80), MATRIX ($3.60), MACHINA ($3.60)\n🌙 <strong>Oriental Instrument</strong> — $13.80 (280+ instruments)\n🥁 <strong>Sample packs</strong> — starting at $5\n🔥 <strong>-80% Summer Sale</strong> — code SOLDES80!\n\nOr write directly to <strong>djbilboxbeats@gmail.com</strong> — the team replies within 24h.',
      actions: [
        { text: 'All products', href: 'index.html' },
        { text: 'VST & Kits', href: 'vst.html' },
        { text: 'Contact me', onclick: 'showContactForm()' }
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
        <p>Hey! 👋 I'm the DJBILBOX assistant. How can I help you today?</p>
        <p style="font-size:.7rem;margin-top:6px;color:var(--text-4)">Ask me about our VSTs, kits, prices, or services...</p>
      </div>
    </div>
    <div class="chat-input-wrap">
      <input type="text" id="chatInput" class="chat-input" placeholder="Your question..." autocomplete="off">
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
    <p>Great! Leave your details and we'll get back to you:</p>
    <form class="chat-contact-form" onsubmit="submitContact(event)">
      <input type="text" placeholder="Your name" required style="margin-bottom:8px">
      <input type="email" placeholder="Your email" required style="margin-bottom:8px">
      <textarea placeholder="Your message..." required style="margin-bottom:8px;min-height:60px"></textarea>
      <button type="submit" class="chat-action-btn" style="width:100%;background:var(--accent);color:#fff">Send</button>
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
  formData.append('_subject', `New chat message — ${name}`);
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
    successMsg.innerHTML = `<p>✅ <strong>Message sent!</strong></p>
      <p style="font-size:.85rem;color:var(--text-3)">The DJBILBOX team will contact you very soon at <strong>${email}</strong></p>`;
    messagesDiv.appendChild(successMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }).catch(err => {
    console.error('Chat form error:', err);
    const messagesDiv = document.getElementById('chatMessages');
    const errMsg = document.createElement('div');
    errMsg.className = 'chat-msg bot';
    errMsg.innerHTML = `<p>⚠️ Sending failed. Write to us directly at <strong>djbilboxbeats@gmail.com</strong>.</p>`;
    messagesDiv.appendChild(errMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

function openContactForm() {
  showContactForm();
}

// Mount chat on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initChat);
