
export const template = `








<main>
  <div class="breadcrumb"><a href="#/challenges">CHALLENGES</a> / LEVEL 11 / IDOR ESCALATION</div>

  <div class="challenge-header">
    <div class="badge-row">
      <span class="badge badge-hard">HARD</span>
      <span class="badge" style="color:var(--cyan);border-color:var(--cyan);background:rgba(0,255,231,.08);">350 PTS</span>
      <span class="badge" style="color:#a855f7;border-color:#a855f7;background:rgba(168,85,247,.08);">IDOR</span>
    </div>
    <h1>IDOR ESCALATION</h1>
    <p class="desc">The user profile API uses sequential integer IDs with no authorization checks. You're logged in as user #1042. Find the admin's profile by enumerating other IDs — the flag is hidden in their private data.</p>
  </div>

  <div class="panel">
    <div class="panel-title">// YOUR CURRENT SESSION</div>
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar">P</div>
        <div>
          <div class="profile-name">player_1042</div>
          <div class="profile-role">ROLE: player | ID: 1042</div>
        </div>
      </div>
      <div class="profile-field"><span class="key">user_id</span><span class="val">1042</span></div>
      <div class="profile-field"><span class="key">email</span><span class="val">player@ctf.som</span></div>
      <div class="profile-field"><span class="key">role</span><span class="val">player</span></div>
      <div class="profile-field"><span class="key">score</span><span class="val">850</span></div>
      <div class="profile-field"><span class="key">private_note</span><span class="val">[your personal notes]</span></div>
    </div>
  </div>

  <div class="panel">
    <div class="panel-title">// USER PROFILE API EXPLORER</div>
    <div class="api-sim">
      <div class="api-url" id="apiUrl">GET /api/users/<span id="urlId">1042</span>/profile</div>
      <div style="color:#4a5a6a;font-size:.7rem;">Authorization: Bearer player_token_xyz (no server-side ID check!)</div>
    </div>
    <div class="id-control">
      <label>USER ID:</label>
      <input type="number" id="userId" value="1042" min="1" max="9999" onchange="updateUrl()">
      <input type="range" id="userSlider" min="1" max="9999" value="1042" oninput="syncSlider(this.value)" style="flex:1;">
      <button class="btn" onclick="fetchProfile()">FETCH PROFILE</button>
    </div>
    <p style="font-family:'Share Tech Mono',monospace;font-size:.72rem;color:#4a5a6a;">Hint: Low IDs (1-10) were created first — who do you think got ID #1?</p>
    <div class="response-box" id="profileResponse">// Click FETCH PROFILE to enumerate users...</div>
  </div>

  <div class="panel">
    <div class="panel-title">// VULNERABILITY INFO</div>
    <div class="hint-box">
      [IDOR] Insecure Direct Object Reference — the API trusts user-supplied IDs.<br>
      [!] The server checks if you're authenticated, but NOT if you own the resource.<br>
      [!] Any authenticated user can read ANY other user's profile.<br>
      [!] Admin accounts are typically created first → low IDs.<br>
      [!] Enumerate IDs 1–10 to find the admin profile.
    </div>
  </div>

  <div class="panel">
    <div class="panel-title">// FLAG SUBMISSION</div>
    <div class="flag-submit">
      <input class="flag-input" type="text" id="flagInput" placeholder="FLAG{...}">
      <button class="btn" onclick="checkFlag()">SUBMIT FLAG</button>
    </div>
    <div id="flagMsg" style="margin-top:.75rem;font-family:'Share Tech Mono',monospace;font-size:.8rem;"></div>
  </div>
</main>

<div class="success-overlay" id="successOverlay">
  <div class="success-box">
    <h2>// IDOR EXPLOITED //</h2>
    <p style="color:#7a8a9a;font-family:'Share Tech Mono',monospace;font-size:.8rem;margin-bottom:1rem;">Admin profile accessed via IDOR enumeration.</p>
    <div class="success-flag">FLAG{1d0r_3num3r4t10n_s0m_f0und_4dm1n}</div>
    <p style="color:#4a5a6a;font-family:'Share Tech Mono',monospace;font-size:.7rem;">+350 POINTS AWARDED</p>
    <button class="btn" onclick="document.getElementById('successOverlay').style.display='none'" style="margin-top:1.5rem;border-color:var(--red);color:var(--red);">CONTINUE</button>
  </div>
</div>







`;

export const init = () => {
    
const c=document.getElementById('matrix');const ctx=c.getContext('2d');
function resizeCanvas(){c.width=window.innerWidth;c.height=window.innerHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
const cols=Math.floor(window.innerWidth/20);const drops=Array(cols).fill(1);
const chars='アイウエオ0123456789ABCDEF><{}[]SOM';
function drawMatrix(){ctx.fillStyle='rgba(3,5,8,0.05)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#00ffe7';ctx.font='14px monospace';drops.forEach((y,i)=>{const ch=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(ch,i*20,y*20);if(y*20>c.height&&Math.random()>.975)drops[i]=0;drops[i]++;});}
setInterval(drawMatrix,50);

function updateUrl() {
  const id = document.getElementById('userId').value;
  document.getElementById('urlId').textContent = id;
  document.getElementById('userSlider').value = id;
}
function syncSlider(v) {
  document.getElementById('userId').value = v;
  document.getElementById('urlId').textContent = v;
}

const profiles = {
  1: { name:'som_admin', role:'SUPER_ADMIN', email:'som@darknightrises.ctf', score:9999, private_note:'FLAG{1d0r_3num3r4t10n_s0m_f0und_4dm1n}', joined:'2024-01-01', avatar:'S' },
  2: { name:'root_user', role:'admin', email:'root@darknightrises.ctf', score:5500, private_note:'System account — do not modify', joined:'2024-01-01', avatar:'R' },
  3: { name:'ctf_manager', role:'admin', email:'manager@darknightrises.ctf', score:4200, private_note:'Challenge creator account', joined:'2024-01-02', avatar:'C' },
};

function fetchProfile() {
  const id = parseInt(document.getElementById('userId').value);
  const box = document.getElementById('profileResponse');
  box.textContent = `[FETCH] GET /api/users/${id}/profile\n[...] Checking auth token... valid\n[...] Fetching record...`;
  
  setTimeout(()=>{
    if(id === 1042) {
      box.textContent = `[200 OK] Your own profile:\n{\n  "user_id": 1042,\n  "username": "player_1042",\n  "role": "player",\n  "email": "player@ctf.som",\n  "score": 850,\n  "private_note": "[your personal notes]"\n}`;
      return;
    }
    if(profiles[id]) {
      const p = profiles[id];
      const isAdmin = p.role.includes('admin') || p.role.includes('ADMIN');
      box.textContent = `[200 OK] Profile retrieved (NO AUTHORIZATION CHECK):\n{\n  "user_id": ${id},\n  "username": "${p.name}",\n  "role": "${p.role}",\n  "email": "${p.email}",\n  "score": ${p.score},\n  "private_note": "${p.private_note}",\n  "joined": "${p.joined}"\n}${isAdmin && id===1 ? '\n\n[!] ADMIN ACCOUNT FOUND — private_note contains the flag!' : ''}`;
      return;
    }
    if(id < 1 || id > 9999) {
      box.textContent = `[400 BAD REQUEST] Invalid user ID range`;
      return;
    }
    // Random users
    const names = ['hacker_','player_','user_','ctf_','ghost_'];
    const n = names[id%names.length] + id;
    box.textContent = `[200 OK]\n{\n  "user_id": ${id},\n  "username": "${n}",\n  "role": "player",\n  "email": "${n}@ctf.som",\n  "score": ${(id*17)%2000},\n  "private_note": "Nothing interesting here"\n}`;
  }, 500);
}

function checkFlag() {
  const val = document.getElementById('flagInput').value.trim();
  const msg = document.getElementById('flagMsg');
  if(val === 'FLAG{1d0r_3num3r4t10n_s0m_f0und_4dm1n}') {
    msg.innerHTML='<span style="color:var(--green)">✓ CORRECT FLAG — +350 POINTS</span>';
    document.getElementById('successOverlay').style.display='flex';
  } else {
    msg.innerHTML='<span style="color:var(--red)">✗ INCORRECT FLAG</span>';
  }
}

};
