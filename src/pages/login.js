
export const template = `




<!-- 
  =============================================
  DARK NIGHT RISES — CTF by SOM
  FLAG{s0m_h1dd3n_1n_s0urc3_c0d3_2024}
  LEVEL 1 FLAG — Found in HTML comments!
  Good job reading the source code, operator.
  =============================================
-->

<div class="login-container">
  <div class="login-header">
    <div class="login-brand">DARK NIGHT RISES // SOM</div>
    <h1 class="login-title">OPERATOR LOGIN</h1>
    <p class="login-sub">// AUTHORIZED PERSONNEL ONLY //</p>
  </div>
  <div class="login-box">
    <div class="error-msg" id="err">⚠ ACCESS DENIED — INVALID CREDENTIALS</div>
    <div class="success-msg" id="success">✓ ACCESS GRANTED — REDIRECTING...</div>
    <div class="field-group">
      <label class="field-label" for="user">OPERATOR ID</label>
      <input type="text" class="field-input" id="user" placeholder="enter username" autocomplete="off">
    </div>
    <div class="field-group">
      <label class="field-label" for="pass">ACCESS CODE</label>
      <input type="password" class="field-input" id="pass" placeholder="••••••••" autocomplete="off">
    </div>
    <button class="login-btn" onclick="doLogin()">AUTHENTICATE</button>
    <div class="login-hint">Forgot access code? Contact <a href="#">@som_admin</a> // CTF only</div>
  </div>
</div>





`;

export const init = () => {
    
// VULNERABILITY: Client-side auth — credentials in JS source
// CTF Level 2: Inspect this JS to find credentials and admin flag
const USERS = { "admin": "s0m_s3cr3t_p4ss", "player": "ctf2024", "guest": "guest123" };
const ADMIN_FLAG = "FLAG{cl13nt_s1d3_4uth_byp4ss_by_s0m}";

function doLogin() {
  const user = document.getElementById('user').value.trim();
  const pass = document.getElementById('pass').value.trim();
  const err = document.getElementById('err');
  const suc = document.getElementById('success');
  err.style.display = 'none'; suc.style.display = 'none';
  if (USERS[user] && USERS[user] === pass) {
    document.cookie = "auth=true; path=/";
    document.cookie = "role=" + (user === 'admin' ? 'admin' : 'player') + "; path=/";
    document.cookie = "username=" + user + "; path=/";
    if (user === 'admin') {
      document.cookie = "admin_flag=" + ADMIN_FLAG + "; path=/";
      suc.textContent = '✓ ADMIN ACCESS GRANTED — COOKIE FLAG UNLOCKED';
    } else { suc.textContent = '✓ ACCESS GRANTED — WELCOME ' + user.toUpperCase(); }
    suc.style.display = 'block';
    setTimeout(() => { window.location.hash = '#/challenges'; }, 1800);
  } else if (!user || !pass) {
    err.textContent = '⚠ OPERATOR ID AND ACCESS CODE REQUIRED';
    err.style.display = 'block';
  } else { err.style.display = 'block'; }
}
document.getElementById('pass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

};
