
export const template = `



<div class="challenge-wrap">
  <div class="breadcrumb"><a href="#/">HOME</a> / <a href="#/challenges">CHALLENGES</a> / LEVEL 05</div>
  <div class="chall-num">// LEVEL 05 OF 12 //</div>
  <div class="chall-badge">
    <span class="badge-diff">MEDIUM</span>
    <span class="badge-pts">150 PTS</span>
    <span class="badge-cat">WEB // INJECTION</span>
  </div>
  <h1>SQL INJECTION 101</h1>
  <div class="chall-desc">
    This login form builds its database query by concatenating user input directly. A classic SQL injection vulnerability. Break the WHERE clause logic to bypass authentication and dump the admin record containing the flag.
    <br><br>
    The backend query looks like: <code style="color:#ffb800;">SELECT * FROM users WHERE username='INPUT' AND password='INPUT'</code>
    <span class="hint">// HINT: Try username: <code>admin' --</code> (the -- comments out the rest of the query)</span>
  </div>
  <div class="vuln-app">
    <div class="app-bar">
      <span class="app-title">VULNERABLE LOGIN PORTAL</span>
      <span class="app-url">http://ctf.som.labs/login.php</span>
    </div>
    <div class="app-body">
      <div class="login-form">
        <h3>SYSTEM LOGIN</h3>
        <div class="form-field">
          <label class="form-label">USERNAME</label>
          <input type="text" class="form-input" id="sqli-user" placeholder="username" value="">
        </div>
        <div class="form-field">
          <label class="form-label">PASSWORD</label>
          <input type="password" class="form-input" id="sqli-pass" placeholder="password" value="">
        </div>
        <button class="form-btn" onclick="doSQLi()">LOGIN</button>
        <div class="code-hint">
          <div>// Backend query (you can see this because it's a CTF):</div>
          <div><span>SELECT</span> * <span>FROM</span> users <span>WHERE</span></div>
          <div>&nbsp;&nbsp;username='<span id="q-user">...</span>'</div>
          <div>&nbsp;&nbsp;<span>AND</span> password='<span id="q-pass">...</span>'</div>
        </div>
        <div class="db-result" id="db-result"></div>
      </div>
    </div>
  </div>
  <div class="flag-submit">
    <h3>SUBMIT FLAG</h3>
    <div class="flag-input-row">
      <input type="text" class="flag-input" id="flagInput" placeholder="FLAG{...}" autocomplete="off">
      <button class="flag-btn" onclick="checkFlag()">SUBMIT</button>
    </div>
    <div class="flag-result flag-correct" id="res-correct">✓ CORRECT FLAG! LEVEL 05 COMPLETE — +150 PTS</div>
    <div class="flag-result flag-wrong" id="res-wrong">✗ INCORRECT FLAG — REFINE YOUR INJECTION</div>
  </div>
  <a href="#/level6" class="next-btn">NEXT CHALLENGE →</a>
</div>




`;

export const init = () => {
    
// Simulated DB
const DB = [
  { id: 1, username: 'guest', password: 'guest123', flag: null },
  { id: 2, username: 'player', password: 'ctf2024', flag: null },
  { id: 3, username: 'admin', password: 'n0t_3asy_t0_gu3ss', flag: 'FLAG{sql_1nj3ct10n_m4st3r_s0m}' },
];

// Update query display
['sqli-user', 'sqli-pass'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    document.getElementById('q-user').textContent = document.getElementById('sqli-user').value || '...';
    document.getElementById('q-pass').textContent = document.getElementById('sqli-pass').value || '...';
  });
});

function doSQLi() {
  const user = document.getElementById('sqli-user').value;
  const pass = document.getElementById('sqli-pass').value;
  const result = document.getElementById('db-result');
  result.style.display = 'block';
  result.innerHTML = '';

  // Show the query
  const queryEl = document.createElement('div');
  queryEl.className = 'db-query';
  queryEl.textContent = `SELECT * FROM users WHERE username='${user}' AND password='${pass}'`;
  result.appendChild(queryEl);

  // Simulate SQL injection
  const isSQLi = user.includes("'") || user.includes('--') || user.includes('OR') || user.includes('or') || user.includes('1=1') || user.includes('#');
  const bypassComment = user.includes('--') || user.includes('#');
  const userPart = user.replace(/'.*/,'').trim();

  if (isSQLi && bypassComment) {
    // Injection successful - dump all rows after injected username
    const injectedUser = userPart;
    const matchedRows = injectedUser === '' ? DB : DB.filter(r => r.username === injectedUser);
    const rowsToShow = matchedRows.length > 0 ? matchedRows : DB; // if admin' -- show admin
    const adminMatch = DB.find(r => r.username === injectedUser || injectedUser === 'admin');
    const showRows = adminMatch ? [adminMatch] : DB;
    let html = `<div style="color:#00ff88;font-size:11px;margin-bottom:8px;">✓ INJECTION SUCCESSFUL — QUERY RETURNED ${showRows.length} ROW(S)</div>`;
    showRows.forEach(r => {
      html += `<div class="db-row ${r.flag ? 'admin-row' : ''}">`;
      html += `id=${r.id} | username=${r.username} | password=${r.password}`;
      if (r.flag) html += `<div class="db-flag">FLAG: ${r.flag}</div>`;
      html += '</div>';
    });
    result.innerHTML += html;
  } else if (isSQLi) {
    result.innerHTML += '<div style="color:#ffb800;">⚠ SYNTAX ISSUE — Try commenting out the rest with --</div>';
  } else {
    const match = DB.find(r => r.username === user && r.password === pass);
    if (match) {
      result.innerHTML += `<div class="db-row">LOGIN OK — Welcome ${match.username}</div>`;
    } else {
      result.innerHTML += '<div style="color:var(--accent2);">✗ INVALID CREDENTIALS</div>';
    }
  }
}
const FLAG = "FLAG{sql_1nj3ct10n_m4st3r_s0m}";
function checkFlag() {
  const input = document.getElementById('flagInput').value.trim();
  const c = document.getElementById('res-correct'), w = document.getElementById('res-wrong');
  c.style.display='none'; w.style.display='none';
  if (input === FLAG) { c.style.display='block'; } else { w.style.display='block'; }
}
document.getElementById('flagInput').addEventListener('keydown', e => { if (e.key==='Enter') checkFlag(); });
document.getElementById('sqli-pass').addEventListener('keydown', e => { if (e.key==='Enter') doSQLi(); });

};
