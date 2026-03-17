
export const template = `




<div class="challenge-wrap">
  <div class="breadcrumb"><a href="#/">HOME</a> / <a href="#/challenges">CHALLENGES</a> / LEVEL 02</div>
  <div class="chall-num">// LEVEL 02 OF 12 //</div>
  <div class="chall-badge">
    <span class="badge-diff">EASY</span>
    <span class="badge-pts">75 PTS</span>
    <span class="badge-cat">WEB // AUTH</span>
  </div>
  <h1>COOKIE MONSTER</h1>
  
  <div class="chall-desc">
    When you log into a web application, the server often sends back cookies to maintain your session. These cookies can contain sensitive data — sometimes even the flag itself, poorly protected.
    <br><br>
    This system has already "logged you in" as a guest. But admin cookies have been set in your browser. Find them.
    <span class="hint">// HINT: Open DevTools → Application → Cookies. Or type in console: document.cookie</span>
  </div>

  <div class="challenge-target">
    <span class="target-label">// COOKIE INSPECTOR //</span>
    <div class="cookie-panel-title">CURRENT SESSION COOKIES</div>
    <div class="cookie-panel" id="cookie-display">
      <div style="font-family:var(--font-mono);font-size:12px;color:var(--dim);letter-spacing:1px;">Loading session data...</div>
    </div>
    <button class="cookie-tool-btn" onclick="readCookies()">▶ READ MY COOKIES</button>
  </div>

  <div class="flag-submit">
    <h3>SUBMIT FLAG</h3>
    <div class="flag-input-row">
      <input type="text" class="flag-input" id="flagInput" placeholder="FLAG{...}" autocomplete="off">
      <button class="flag-btn" onclick="checkFlag()">SUBMIT</button>
    </div>
    <div class="flag-result flag-correct" id="res-correct">✓ CORRECT FLAG! LEVEL 02 COMPLETE — +75 PTS</div>
    <div class="flag-result flag-wrong" id="res-wrong">✗ INCORRECT FLAG — CHECK YOUR COOKIES</div>
  </div>

  <a href="#/level3" class="next-btn">NEXT CHALLENGE →</a>
</div>





`;

export const init = () => {
    
// Plant the flag cookie when page loads
document.cookie = "session=guest_token_abc123; path=/";
document.cookie = "role=guest; path=/";
document.cookie = "username=operator; path=/";
// VULNERABILITY: Flag stored in cookie
document.cookie = "admin_secret=FLAG%7Bc00k13_m0nst3r_s0m_w4s_h3r3%7D; path=/";
document.cookie = "system=dark_night_rises_v1; path=/";

function readCookies() {
  const panel = document.getElementById('cookie-display');
  const cookies = document.cookie.split(';');
  let html = '';
  cookies.forEach(c => {
    const [name, val] = c.trim().split('=');
    const isSecret = name && name.includes('admin');
    html += `<div class="cookie-row"><span class="ck-name">${name || '?'}</span><span class="ck-val${isSecret ? ' redacted' : ''}" title="Hover to reveal">${decodeURIComponent(val || '')}</span></div>`;
  });
  panel.innerHTML = html || '<div style="color:var(--dim)">No cookies found</div>';
}

const FLAG = "FLAG{c00k13_m0nst3r_s0m_w4s_h3r3}";
function checkFlag() {
  const input = document.getElementById('flagInput').value.trim();
  const c = document.getElementById('res-correct');
  const w = document.getElementById('res-wrong');
  c.style.display = 'none'; w.style.display = 'none';
  if (input === FLAG) { c.style.display = 'block'; }
  else { w.style.display = 'block'; }
}
document.getElementById('flagInput').addEventListener('keydown', e => { if (e.key === 'Enter') checkFlag(); });

};
