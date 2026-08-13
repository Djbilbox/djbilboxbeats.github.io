/* ============================================================
   FREE LICENSE GENERATOR — Auto-generate licenses for free beats
   ============================================================ */

const LicenseGen = {
  generate: function(beatTitle, clientName) {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const licenseHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0; padding: 40px; background: #f5f5f5; }
    .license { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #ff2d2d; padding-bottom: 20px; }
    .logo { font-weight: 700; color: #ff2d2d; font-size: 24px; margin-bottom: 10px; }
    .title { font-size: 28px; font-weight: 700; margin: 20px 0; text-transform: uppercase; }
    .subtitle { color: #666; font-size: 14px; margin: 10px 0; }
    .content { line-height: 1.8; color: #333; }
    .section { margin: 25px 0; }
    .section-title { font-weight: 700; font-size: 14px; text-transform: uppercase; color: #ff2d2d; margin-bottom: 10px; }
    .rights-list { list-style: none; padding: 0; }
    .rights-list li { padding: 8px 0; padding-left: 24px; position: relative; }
    .rights-list li:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: 700; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
    .details-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #ff2d2d; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
    .detail-label { font-weight: 600; }
    @media print { body { background: white; } }
  </style>
</head>
<body>
  <div class="license">
    <div class="header">
      <div class="logo">DJBILBOX BEATS</div>
      <h1 class="title">Free Beat License</h1>
      <p class="subtitle">Non-exclusive, royalty-free license agreement</p>
    </div>

    <div class="content">
      <div class="details-box">
        <div class="detail-row">
          <span class="detail-label">Licensed to:</span>
          <strong>${clientName}</strong>
        </div>
        <div class="detail-row">
          <span class="detail-label">Beat Title:</span>
          <strong>${beatTitle}</strong>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date Issued:</span>
          <strong>${dateStr}</strong>
        </div>
        <div class="detail-row">
          <span class="detail-label">License Type:</span>
          <strong>Free (Non-exclusive)</strong>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Rights Granted</div>
        <p>You are granted a non-exclusive, royalty-free license to use this beat for:</p>
        <ul class="rights-list">
          <li>Radio broadcast and streaming services (YouTube, Spotify, Apple Music, etc.)</li>
          <li>Album releases and commercial recordings</li>
          <li>Promotional use and marketing</li>
          <li>Music distribution across all platforms</li>
          <li>Live performances and concert use</li>
          <li>Television and video production</li>
          <li>Personal and professional projects</li>
        </ul>
      </div>

      <div class="section">
        <div class="section-title">Terms & Conditions</div>
        <p>• You may not resell or redistribute this beat as your own.</p>
        <p>• Credit to DJBILBOX BEATS is appreciated but not required.</p>
        <p>• This license is non-exclusive — the beat may be used by others.</p>
        <p>• DJBILBOX BEATS retains all ownership rights to the original beat.</p>
        <p>• This license is valid indefinitely for all uses listed above.</p>
      </div>

      <div class="section">
        <div class="section-title">Support</div>
        <p>For questions or inquiries: <strong>djbilbox@gmail.com</strong></p>
        <p>Visit: <strong>https://djbilboxbeats.com</strong></p>
      </div>
    </div>

    <div class="footer">
      <p>This license is automatically generated for free beats provided by DJBILBOX BEATS. By using this beat, you agree to these terms.</p>
      <p style="margin-top: 20px;">© ${today.getFullYear()} DJBILBOX BEATS. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    return licenseHTML;
  },

  showLicenseModal: function(beatTitle, callback) {
    // Créer la modale
    const modal = document.createElement('div');
    modal.className = 'license-modal-overlay';
    modal.innerHTML = `
      <div class="license-modal">
        <div class="license-modal-header">
          <h2>Free Beat License</h2>
          <button class="license-modal-close" onclick="this.closest('.license-modal-overlay').remove()">✕</button>
        </div>
        <div class="license-modal-body">
          <p>To receive your free beat license, please enter your name:</p>
          <input type="text" id="licenseClientName" placeholder="Your name" class="license-input" maxlength="100">
          <p class="license-info">📄 A personalized license will be generated with:</p>
          <ul>
            <li>Your name as the licensee</li>
            <li>Beat title: <strong>${beatTitle}</strong></li>
            <li>Full rights for radio, streaming, album releases, live performances</li>
          </ul>
        </div>
        <div class="license-modal-footer">
          <button class="license-btn secondary" onclick="this.closest('.license-modal-overlay').remove()">Cancel</button>
          <button class="license-btn primary" id="generateLicenseBtn">Generate & Download License</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Style la modale
    if (!document.querySelector('#licenseModalStyles')) {
      const style = document.createElement('style');
      style.id = 'licenseModalStyles';
      style.textContent = `
        .license-modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        }
        .license-modal {
          background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 450px; width: 90%; max-height: 80vh; overflow-y: auto;
        }
        .license-modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 24px; border-bottom: 1px solid #eee;
        }
        .license-modal-header h2 { margin: 0; font-size: 20px; }
        .license-modal-close {
          background: none; border: none; font-size: 24px; cursor: pointer; color: #999;
        }
        .license-modal-body {
          padding: 24px;
        }
        .license-modal-body p { margin: 12px 0; color: #333; }
        .license-input {
          width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px;
          font-size: 14px; margin: 16px 0; box-sizing: border-box;
        }
        .license-info { font-size: 13px; color: #666; margin-top: 20px; }
        .license-info ul { margin: 10px 0; padding-left: 20px; }
        .license-info li { margin: 6px 0; }
        .license-modal-footer {
          display: flex; gap: 12px; padding: 20px 24px; border-top: 1px solid #eee;
          justify-content: flex-end;
        }
        .license-btn {
          padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer;
          font-weight: 600; font-size: 14px; transition: 0.2s;
        }
        .license-btn.secondary {
          background: #f0f0f0; color: #333;
        }
        .license-btn.secondary:hover {
          background: #e0e0e0;
        }
        .license-btn.primary {
          background: #10b981; color: white;
        }
        .license-btn.primary:hover {
          background: #059669;
        }
      `;
      document.head.appendChild(style);
    }

    // Handler pour générer la licence
    document.getElementById('generateLicenseBtn').onclick = function() {
      const clientName = document.getElementById('licenseClientName').value.trim();
      if (!clientName) {
        alert('Please enter your name');
        return;
      }

      const licenseHTML = LicenseGen.generate(beatTitle, clientName);
      const blob = new Blob([licenseHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${beatTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-license.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Fermer la modale
      modal.remove();

      // Callback
      if (callback) callback(clientName);
    };

    // Focus sur l'input
    document.getElementById('licenseClientName').focus();
  }
};
