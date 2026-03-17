
export const template = `








<main>
  <div class="breadcrumb"><a href="#/challenges">CHALLENGES</a> / LEVEL 08 / JWT FORGERY</div>

  <div class="challenge-header">
    <div class="badge-row">
      <span class="badge badge-medium">MEDIUM</span>
      <span class="badge badge-200">200 PTS</span>
      <span class="badge badge-web">WEB</span>
      <span class="badge badge-web" style="color:#00ffe7;border-color:#00ffe7;background:rgba(0,255,231,.08);">AUTH</span>
    </div>
    <h1>JWT FORGERY</h1>
    <p class="desc">A JWT-based authentication system protects the admin panel. The developers thought signing with "none" was clever. Forge a token that grants admin access and retrieve the flag.</p>
  </div>

  <div class="panel">
    <div class="panel-title">// INTERCEPTED TOKEN</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">You've intercepted this JWT from a guest user's session. Examine its structure:</p>
    <div class="token-display" id="tokenDisplay">
      <span class="token-part token-header" onclick="decodeSection('header')">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span><span class="token-dot">.</span><span class="token-part token-payload" onclick="decodeSection('payload')">eyJ1c2VyIjoiZ3Vlc3QiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE3MDAwMDAwMDB9</span><span class="token-dot">.</span><span class="token-part token-sig" onclick="decodeSection('sig')">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
    </div>
    <p style="font-size:.72rem;color:#4a5a6a;margin-top:.5rem;font-family:'Share Tech Mono',monospace;">↑ Click on each colored section to decode it</p>
    <div class="decoded-box" id="decodedBox">// Click a token section to decode...</div>
  </div>

  <div class="panel">
    <div class="panel-title">// VULNERABILITY HINT</div>
    <div class="hint-box">
      [!] The server accepts the algorithm specified in the JWT header itself.<br>
      [!] What happens if you set "alg" to "none"?<br>
      [!] A token with alg=none requires NO signature — just drop it.<br>
      [!] Modify the payload role to "admin" and forge the token.
    </div>
  </div>

  <div class="panel">
    <div class="panel-title">// TOKEN FORGE WORKBENCH</div>
    <div class="forge-area">
      <div>
        <label>HEADER (JSON):</label>
        <textarea id="headerJson">{"alg":"HS256","typ":"JWT"}</textarea>
      </div>
      <div>
        <label>PAYLOAD (JSON):</label>
        <textarea id="payloadJson">{"user":"guest","role":"guest","iat":1700000000}</textarea>
      </div>
    </div>
    <div style="margin-top:1rem;">
      <label>ALGORITHM OVERRIDE:</label>
      <select id="algSelect" onchange="updateAlg()">
        <option value="HS256">HS256 (HMAC-SHA256) — requires secret key</option>
        <option value="RS256">RS256 (RSA) — requires private key</option>
        <option value="none">none — NO SIGNATURE REQUIRED ⚠️</option>
      </select>
    </div>
    <button class="btn" onclick="forgeToken()">⚡ FORGE TOKEN</button>
    <button class="btn btn-red" onclick="submitForged()" style="margin-left:1rem;">▶ SUBMIT TO SERVER</button>
    <div class="output-box" id="forgeOutput">// Forged token will appear here...</div>
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
    <h2>// ACCESS GRANTED //</h2>
    <p style="color:#7a8a9a;font-family:'Share Tech Mono',monospace;font-size:.8rem;margin-bottom:1rem;">JWT algorithm confusion exploited successfully.</p>
    <div class="success-flag">FLAG{jwt_4lg_n0n3_byp4ss_s0m_0wns_y0u}</div>
    <p style="color:#4a5a6a;font-family:'Share Tech Mono',monospace;font-size:.7rem;">+200 POINTS AWARDED</p>
    <button class="btn" onclick="document.getElementById('successOverlay').style.display='none'" style="margin-top:1.5rem;">CONTINUE</button>
  </div>
</div>







`;

export const init = () => {
    
// Matrix rain
const c=document.getElementById('matrix');const ctx=c.getContext('2d');
function resizeCanvas(){c.width=window.innerWidth;c.height=window.innerHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
const cols=Math.floor(window.innerWidth/20);const drops=Array(cols).fill(1);
const chars='アイウエオカキクケコ0123456789ABCDEF><{}[]SOM';
function drawMatrix(){ctx.fillStyle='rgba(3,5,8,0.05)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#00ffe7';ctx.font='14px monospace';drops.forEach((y,i)=>{const ch=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(ch,i*20,y*20);if(y*20>c.height&&Math.random()>.975)drops[i]=0;drops[i]++;});}
setInterval(drawMatrix,50);

const headerData = {"alg":"HS256","typ":"JWT"};
const payloadData = {"user":"guest","role":"guest","iat":1700000000};

function decodeSection(part) {
  const box = document.getElementById('decodedBox');
  if(part === 'header') {
    box.innerHTML = `<span style="color:#ff003c">// HEADER DECODED:</span>\n${JSON.stringify(headerData, null, 2)}`;
  } else if(part === 'payload') {
    box.innerHTML = `<span style="color:#ffb800">// PAYLOAD DECODED:</span>\n${JSON.stringify(payloadData, null, 2)}\n\n<span style="color:#4a5a6a">// Note: role = "guest" — can you change this?</span>`;
  } else {
    box.innerHTML = `<span style="color:#7a8a9a">// SIGNATURE:</span>\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\n\n<span style="color:#4a5a6a">// HMAC-SHA256 signed — but what if alg was "none"?</span>`;
  }
}

function updateAlg() {
  const alg = document.getElementById('algSelect').value;
  try {
    const h = JSON.parse(document.getElementById('headerJson').value);
    h.alg = alg;
    document.getElementById('headerJson').value = JSON.stringify(h, null, 2);
  } catch(e){}
}

function b64url(obj) {
  return btoa(JSON.stringify(obj)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
}

function forgeToken() {
  try {
    const header = JSON.parse(document.getElementById('headerJson').value);
    const payload = JSON.parse(document.getElementById('payloadJson').value);
    const alg = header.alg;
    const h = b64url(header);
    const p = b64url(payload);
    let token;
    if(alg === 'none') {
      token = `${h}.${p}.`;
    } else {
      token = `${h}.${p}.REQUIRES_SECRET_KEY_CANNOT_FORGE`;
    }
    document.getElementById('forgeOutput').innerHTML = `<span style="color:#4a5a6a">// FORGED TOKEN:</span>\n<span style="color:#00ffe7">${token}</span>`;
  } catch(e) {
    document.getElementById('forgeOutput').innerHTML = `<span style="color:#ff003c">// ERROR: Invalid JSON in header or payload</span>`;
  }
}

function submitForged() {
  try {
    const header = JSON.parse(document.getElementById('headerJson').value);
    const payload = JSON.parse(document.getElementById('payloadJson').value);
    const alg = header.alg;
    const box = document.getElementById('forgeOutput');

    if(alg !== 'none') {
      box.innerHTML = `<span style="color:#ff003c">// SERVER RESPONSE 401:</span>\n{"error":"Invalid signature — cannot verify token"}`;
      return;
    }
    if(payload.role !== 'admin') {
      box.innerHTML = `<span style="color:#ffb800">// SERVER RESPONSE 403:</span>\n{"error":"Insufficient privileges — role must be admin"}`;
      return;
    }
    // SUCCESS
    box.innerHTML = `<span style="color:#00ff41">// SERVER RESPONSE 200:</span>\n{"status":"ok","message":"Welcome, admin!","flag":"FLAG{jwt_4lg_n0n3_byp4ss_s0m_0wns_y0u}","note":"Algorithm confusion is a critical JWT vulnerability"}`;
  } catch(e) {
    document.getElementById('forgeOutput').innerHTML = `<span style="color:#ff003c">// ERROR: Forge the token first</span>`;
  }
}

function checkFlag() {
  const val = document.getElementById('flagInput').value.trim();
  const msg = document.getElementById('flagMsg');
  if(val === 'FLAG{jwt_4lg_n0n3_byp4ss_s0m_0wns_y0u}') {
    msg.innerHTML = '<span style="color:#00ff41">✓ CORRECT FLAG — +200 POINTS</span>';
    document.getElementById('successOverlay').style.display = 'flex';
  } else if(val.startsWith('FLAG{')) {
    msg.innerHTML = '<span style="color:#ff003c">✗ INCORRECT FLAG — Keep trying</span>';
  } else {
    msg.innerHTML = '<span style="color:#ffb800">⚠ Format: FLAG{...}</span>';
  }
}

};
