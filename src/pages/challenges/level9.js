
export const template = `








<main>
  <div class="breadcrumb"><a href="#/challenges">CHALLENGES</a> / LEVEL 09 / BROKEN AUTH CHAIN</div>

  <div class="challenge-header">
    <div class="badge-row">
      <span class="badge badge-hard">HARD</span>
      <span class="badge badge-300">300 PTS</span>
      <span class="badge badge-hard" style="color:#a855f7;border-color:#a855f7;background:rgba(168,85,247,.08);">AUTH</span>
    </div>
    <h1>BROKEN AUTH CHAIN</h1>
    <p class="desc">The password reset system has a logic flaw. An attacker can reset ANY user's password by exploiting a predictable token and a broken OTP verification flow. Can you hijack the admin account?</p>
  </div>

  <div class="panel">
    <div class="panel-title">// MULTI-STEP ATTACK FLOW</div>
    <div class="steps">
      <div class="step active" id="step1ind"><span class="step-num">01</span>REQUEST RESET</div>
      <div class="step" id="step2ind"><span class="step-num">02</span>INTERCEPT TOKEN</div>
      <div class="step" id="step3ind"><span class="step-num">03</span>BYPASS OTP</div>
      <div class="step" id="step4ind"><span class="step-num">04</span>HIJACK ACCOUNT</div>
    </div>
  </div>

  <!-- STEP 1 -->
  <div class="panel step-section visible" id="section1">
    <div class="panel-title">// STEP 1 — REQUEST PASSWORD RESET</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1.2rem;">Enter admin's email to trigger a password reset. The system sends a reset token to the registered email.</p>
    <div class="form-group">
      <label>TARGET EMAIL:</label>
      <input type="email" id="resetEmail" value="admin@darknightrises.ctf">
    </div>
    <button class="btn" onclick="requestReset()">REQUEST RESET TOKEN</button>
    <div class="response-box" id="resp1">// Waiting for request...</div>
  </div>

  <!-- STEP 2 -->
  <div class="panel step-section" id="section2">
    <div class="panel-title">// STEP 2 — INTERCEPT THE TOKEN</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">The system generated a "secure" token. But look at it... it's just a base64-encoded timestamp!</p>
    <div style="background:#000;padding:1rem;border:1px solid rgba(255,184,0,.3);font-family:'Share Tech Mono',monospace;font-size:.8rem;color:var(--amber);margin-bottom:1rem;" id="interceptedToken">// Token will appear here</div>
    <span class="hint-toggle" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='block'?'none':'block'">▶ DECODE THE TOKEN</span>
    <div class="hint-content">
      The token <code>cmVzZXRfMTcwMDAwMDAwMF9hZG1pbg==</code> decodes to: <code>reset_1700000000_admin</code><br>
      Pattern: <code>reset_{unix_timestamp}_{username}</code><br>
      Predictable tokens = broken security!
    </div>
    <br><br>
    <button class="btn" onclick="proceedStep2()">PROCEED WITH TOKEN ▶</button>
  </div>

  <!-- STEP 3 -->
  <div class="panel step-section" id="section3">
    <div class="panel-title">// STEP 3 — BYPASS OTP VERIFICATION</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">The system asks for an OTP sent to admin's email. You don't have access to their email — but look at how the OTP is verified...</p>
    <div class="hint-box" style="border:1px solid rgba(255,0,60,.2);background:rgba(255,0,60,.04);padding:1rem;font-family:'Share Tech Mono',monospace;font-size:.78rem;color:#ff8080;margin-bottom:1rem;">
      [NETWORK LOG] POST /api/verify-otp<br>
      Body: {"token":"cmVzZXRf...","otp":"XXXX","skip_otp":false}<br><br>
      [SOURCE CODE LEAK] <br>
      if(req.body.skip_otp === true || req.body.otp === stored_otp) { // proceed }<br><br>
      <span style="color:var(--amber)">// The server checks skip_otp but trusts the CLIENT to set it!</span>
    </div>
    <div class="form-group">
      <label>OTP CODE (or exploit the parameter):</label>
      <input type="text" id="otpInput" placeholder="Try: set skip_otp to true in the request">
    </div>
    <div class="form-group">
      <label>SKIP_OTP PARAMETER:</label>
      <select id="skipOtp" style="width:100%;background:#000;border:1px solid rgba(0,255,231,.2);color:var(--cyan);font-family:'Share Tech Mono',monospace;font-size:.8rem;padding:.6rem;outline:none;">
        <option value="false">false (normal flow)</option>
        <option value="true">true ← EXPLOIT THIS</option>
      </select>
    </div>
    <button class="btn" onclick="verifyOtp()">SUBMIT OTP VERIFICATION</button>
    <div class="response-box" id="resp3">// Waiting...</div>
  </div>

  <!-- STEP 4 -->
  <div class="panel step-section" id="section4">
    <div class="panel-title">// STEP 4 — SET NEW PASSWORD</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">OTP bypassed! You now have a valid reset session. Set a new password for the admin account.</p>
    <div class="form-group">
      <label>NEW PASSWORD FOR ADMIN:</label>
      <input type="password" id="newPass" placeholder="Enter your new admin password">
    </div>
    <button class="btn" onclick="setPassword()">SET PASSWORD &amp; LOGIN</button>
    <div class="response-box" id="resp4">// Waiting...</div>
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
    <h2>// AUTH CHAIN BROKEN //</h2>
    <p style="color:#7a8a9a;font-family:'Share Tech Mono',monospace;font-size:.8rem;margin-bottom:1rem;">Multi-step authentication logic flaw exploited.</p>
    <div class="success-flag">FLAG{br0k3n_4uth_ch41n_s0m_pwn3d_4dm1n}</div>
    <p style="color:#4a5a6a;font-family:'Share Tech Mono',monospace;font-size:.7rem;">+300 POINTS AWARDED</p>
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

let currentStep = 1;
function activateStep(n) {
  for(let i=1;i<=4;i++){
    document.getElementById('section'+i).classList.remove('visible');
    const ind = document.getElementById('step'+i+'ind');
    if(i<n) ind.className='step done';
    else if(i===n) ind.className='step active';
    else ind.className='step';
  }
  document.getElementById('section'+n).classList.add('visible');
  currentStep = n;
}

function requestReset() {
  const email = document.getElementById('resetEmail').value;
  const r = document.getElementById('resp1');
  if(!email.includes('@')) {
    r.innerHTML='<span style="color:var(--red)">// ERROR: Invalid email</span>';
    return;
  }
  r.innerHTML='<span style="color:#4a5a6a">// Sending request...</span>';
  setTimeout(()=>{
    r.innerHTML=`<span style="color:var(--green)">// 200 OK — Reset token sent</span>\n{"status":"sent","message":"Password reset link sent to ${email}","note":"Token expires in 10 minutes"}`;
    setTimeout(()=>{
      document.getElementById('interceptedToken').innerHTML = `<span style="color:#4a5a6a">// INTERCEPTED RESET TOKEN:</span>\ncmVzZXRfMTcwMDAwMDAwMF9hZG1pbg==\n\n<span style="color:var(--amber)">// Hmm... this looks like base64. Decode it?</span>`;
      activateStep(2);
    },800);
  },1200);
}

function proceedStep2() { activateStep(3); }

function verifyOtp() {
  const skip = document.getElementById('skipOtp').value;
  const otp = document.getElementById('otpInput').value;
  const r = document.getElementById('resp3');
  if(skip === 'true') {
    r.innerHTML='<span style="color:var(--green)">// 200 OK — OTP BYPASSED</span>\n{"status":"verified","session_token":"reset_session_abc123","message":"OTP verification skipped — admin privileges granted"}';
    setTimeout(()=>activateStep(4), 800);
  } else if(otp === '1234' || otp === '0000') {
    r.innerHTML='<span style="color:var(--red)">// 403 FORBIDDEN</span>\n{"error":"Invalid OTP code"}';
  } else {
    r.innerHTML='<span style="color:var(--red)">// 403 FORBIDDEN</span>\n{"error":"Invalid OTP — hint: try manipulating the skip_otp parameter"}';
  }
}

function setPassword() {
  const pass = document.getElementById('newPass').value;
  const r = document.getElementById('resp4');
  if(!pass || pass.length < 4) {
    r.innerHTML='<span style="color:var(--red)">// ERROR: Password too short</span>';
    return;
  }
  r.innerHTML='<span style="color:#4a5a6a">// Updating password...</span>';
  setTimeout(()=>{
    r.innerHTML=`<span style="color:var(--green)">// 200 OK — PASSWORD CHANGED</span>\n{"status":"success","user":"admin","message":"Password updated. You now control the admin account.","flag":"FLAG{br0k3n_4uth_ch41n_s0m_pwn3d_4dm1n}"}`;
  },1000);
}

function checkFlag() {
  const val = document.getElementById('flagInput').value.trim();
  const msg = document.getElementById('flagMsg');
  if(val === 'FLAG{br0k3n_4uth_ch41n_s0m_pwn3d_4dm1n}') {
    msg.innerHTML='<span style="color:var(--green)">✓ CORRECT FLAG — +300 POINTS</span>';
    document.getElementById('successOverlay').style.display='flex';
  } else {
    msg.innerHTML='<span style="color:var(--red)">✗ INCORRECT FLAG</span>';
  }
}

};
