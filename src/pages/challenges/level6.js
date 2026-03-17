
export const template = `



<div class="challenge-wrap">
  <div class="breadcrumb"><a href="#/">HOME</a> / <a href="#/challenges">CHALLENGES</a> / LEVEL 06</div>
  <div class="chall-num">// LEVEL 06 OF 12 //</div>
  <div class="chall-badge">
    <span class="badge-diff">MEDIUM</span>
    <span class="badge-pts">150 PTS</span>
    <span class="badge-cat">WEB // XSS</span>
  </div>
  <h1>XSS INJECTION</h1>
  <div class="chall-desc">
    Cross-Site Scripting (XSS) occurs when user input is rendered directly into the DOM without sanitization. An attacker can inject &lt;script&gt; tags to execute arbitrary JavaScript in the victim's browser.
    <br><br>
    This comment box reflects your input directly. Inject a script tag to trigger the hidden flag alert.
    <span class="hint">// HINT: Try submitting: <code>&lt;script&gt;alert('xss')&lt;/script&gt;</code> — the page will execute it and reveal the flag</span>
  </div>
  <div class="vuln-app">
    <div class="app-bar">
      <span class="app-title">MISSION FEEDBACK BOARD</span>
    </div>
    <div class="app-body">
      <div class="comment-form">
        <h3>LEAVE A COMMENT</h3>
        <div class="form-field">
          <label class="form-label">OPERATOR NAME</label>
          <input type="text" class="form-input" id="cname" placeholder="your callsign" value="">
        </div>
        <div class="form-field">
          <label class="form-label">MESSAGE</label>
          <textarea class="form-textarea" id="cmsg" placeholder="Enter your message..."></textarea>
        </div>
        <button class="form-btn" onclick="postComment()">POST COMMENT</button>
        <div class="comments-section">
          <div class="comments-title">// RECENT COMMENTS</div>
          <div class="comment-item">
            <div class="comment-author">gh0st_r00t // 2 hours ago</div>
            <div class="comment-body">This CTF is incredible. SOM built something special here. Already on level 9!</div>
          </div>
          <div class="comment-item">
            <div class="comment-author">n3ur0hack // 4 hours ago</div>
            <div class="comment-body">The SQL injection challenge was a good warm-up for this one.</div>
          </div>
          <div id="comments-live"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="flag-submit">
    <h3>SUBMIT FLAG</h3>
    <div class="flag-input-row">
      <input type="text" class="flag-input" id="flagInput" placeholder="FLAG{...}" autocomplete="off">
      <button class="flag-btn" onclick="checkFlag()">SUBMIT</button>
    </div>
    <div class="flag-result flag-correct" id="res-correct">✓ CORRECT FLAG! LEVEL 06 COMPLETE — +150 PTS</div>
    <div class="flag-result flag-wrong" id="res-wrong">✗ INCORRECT FLAG — INJECT HARDER</div>
  </div>
  <a href="#/level7" class="next-btn">NEXT CHALLENGE →</a>
</div>

<div id="xss-overlay" style="display:none" class="xss-alert-overlay">
  <h2>⚡ XSS TRIGGERED</h2>
  <div style="font-family:var(--font-mono);font-size:12px;color:var(--dim);margin-bottom:12px;">Your script executed in the DOM context.</div>
  <div class="xss-flag">FLAG{xss_d0m_1nj3ct10n_s0m_approved}</div>
  <div style="font-family:var(--font-mono);font-size:10px;color:var(--dim);">// DARK NIGHT RISES — SOM // CTF LVL-06</div>
  <button class="xss-close" onclick="document.getElementById('xss-overlay').style.display='none'">CLOSE</button>
</div>





`;

export const init = () => {
    
const XSS_FLAG = 'FLAG{xss_d0m_1nj3ct10n_s0m_approved}';
window.alert = function(msg) {
  document.getElementById('xss-overlay').style.display = 'block';
};
window.onerror = null;

function postComment() {
  const name = document.getElementById('cname').value || 'Anonymous';
  const msg = document.getElementById('cmsg').value;
  if (!msg) return;
  const container = document.getElementById('comments-live');
  const div = document.createElement('div');
  div.className = 'comment-item';
  div.innerHTML = `<div class="comment-author">${name} // just now</div><div class="comment-body">${msg}</div>`;
  container.insertBefore(div, container.firstChild);
  // Check for script injection
  if (msg.toLowerCase().includes('<script') || msg.toLowerCase().includes('onerror') || msg.toLowerCase().includes('onload') || msg.toLowerCase().includes('javascript:')) {
    setTimeout(() => { document.getElementById('xss-overlay').style.display = 'block'; }, 400);
  }
  document.getElementById('cmsg').value = '';
}
const FLAG = "FLAG{xss_d0m_1nj3ct10n_s0m_approved}";
function checkFlag() {
  const input = document.getElementById('flagInput').value.trim();
  const c = document.getElementById('res-correct'), w = document.getElementById('res-wrong');
  c.style.display='none'; w.style.display='none';
  if (input === FLAG) { c.style.display='block'; } else { w.style.display='block'; }
}
document.getElementById('flagInput').addEventListener('keydown', e => { if (e.key==='Enter') checkFlag(); });

};
