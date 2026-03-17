
export const template = `








<main>
  <div class="breadcrumb"><a href="#/challenges">CHALLENGES</a> / LEVEL 12 / THE FINAL CIPHER</div>

  <div class="challenge-header">
    <div class="badge-row">
      <span class="badge" style="color:var(--gold);border-color:var(--gold);background:rgba(255,215,0,.08);">HARD</span>
      <span class="badge" style="color:var(--gold);border-color:var(--gold);background:rgba(255,215,0,.08);">500 PTS ★</span>
      <span class="badge" style="color:#a855f7;border-color:#a855f7;background:rgba(168,85,247,.08);">CRYPTO</span>
      <span class="badge" style="color:var(--red);border-color:var(--red);background:rgba(255,0,60,.08);">FINAL BOSS</span>
    </div>
    <h1>THE FINAL CIPHER</h1>
    <p class="desc">The vault is protected with AES-ECB encryption. A critical weakness: ECB mode encrypts identical plaintext blocks to <em>identical ciphertext blocks</em>. Exploit this pattern to decrypt the master flag without knowing the key.</p>
  </div>

  <div class="panel gold-panel">
    <div class="panel-title gold">// INTERCEPTED ENCRYPTED MESSAGE</div>
    <div class="cipher-block">
      <span class="label">// VAULT CIPHERTEXT (hex-encoded AES-ECB blocks):</span>
      4e2f3a8b1c9d7e5f | 4e2f3a8b1c9d7e5f | a1b2c3d4e5f67890 | 4e2f3a8b1c9d7e5f
      <br>9f8e7d6c5b4a3210 | 3c4d5e6f7a8b9c0d | 4e2f3a8b1c9d7e5f | 7f6e5d4c3b2a1908
      <br>2a3b4c5d6e7f8091 | 4e2f3a8b1c9d7e5f | b0c1d2e3f4051627 | 4e2f3a8b1c9d7e5f
    </div>
    <p style="font-family:'Share Tech Mono',monospace;font-size:.73rem;color:var(--amber);margin-top:.7rem;">[!] Notice anything? Some blocks are IDENTICAL — that's the ECB weakness.</p>
  </div>

  <div class="panel">
    <div class="panel-title">// ECB BLOCK PATTERN VISUALIZER</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">AES-ECB encrypts each 16-byte block independently. Equal plaintext = equal ciphertext. Color matching reveals structure:</p>
    <div class="blocks-visual" id="blockVisual"></div>
    <button class="btn" onclick="visualizeBlocks()">ANALYZE BLOCK PATTERNS</button>
  </div>

  <div class="panel">
    <div class="panel-title">// CHOSEN PLAINTEXT ORACLE</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">You have access to an encryption oracle. Encrypt known plaintexts and compare block patterns to decode the vault message byte by byte.</p>
    <div class="tool-grid">
      <div>
        <label>PLAINTEXT INPUT:</label>
        <textarea id="ptInput" placeholder="Enter plaintext to encrypt...
Try: 'AAAAAAAAAAAAAAAA' (16 A's)
Or:  'SOM_SECRET_VAULT'"></textarea>
      </div>
      <div>
        <label>ORACLE OUTPUT (ECB encrypted):</label>
        <div class="response-box" id="oracleOutput">// Encrypt a plaintext to see ECB blocks...</div>
      </div>
    </div>
    <button class="btn" onclick="encryptOracle()" style="margin-top:1rem;">⚡ ENCRYPT VIA ORACLE</button>
  </div>

  <div class="panel">
    <div class="panel-title">// DECRYPTION WORKBENCH</div>
    <div class="hint-box" style="margin-bottom:1rem;">
      [STEP 1] Observe that block <code>4e2f3a8b1c9d7e5f</code> repeats 6 times.<br>
      [STEP 2] This repeated block = encrypted "SOM_VAULT_KEY_16" (the repeating key).<br>
      [STEP 3] The non-repeating blocks contain the actual flag data.<br>
      [STEP 4] XOR the unique blocks with the key pattern to reveal the flag.<br>
      [STEP 5] Use the decoder below.
    </div>
    <label>SELECT DECRYPTION OPERATION:</label>
    <select id="decryptOp" style="margin-bottom:1rem;">
      <option value="">-- Choose operation --</option>
      <option value="identify">Identify repeating key block</option>
      <option value="extract">Extract unique data blocks</option>
      <option value="xor">XOR with key pattern</option>
      <option value="decode">Final decode → plaintext</option>
    </select>
    <button class="btn" onclick="runDecrypt()">RUN OPERATION</button>
    <div class="response-box" id="decryptOutput">// Select an operation and run it...</div>
  </div>

  <div class="panel gold-panel">
    <div class="panel-title gold">// FLAG SUBMISSION — FINAL CHALLENGE</div>
    <div class="flag-submit">
      <input class="flag-input" type="text" id="flagInput" placeholder="FLAG{...}">
      <button class="btn btn-gold" onclick="checkFlag()">⚡ SUBMIT FINAL FLAG</button>
    </div>
    <div id="flagMsg" style="margin-top:.75rem;font-family:'Share Tech Mono',monospace;font-size:.8rem;"></div>
  </div>
</main>

<div class="success-overlay" id="successOverlay">
  <div class="success-box">
    <h2>🏆 VAULT CRACKED 🏆</h2>
    <p style="color:var(--amber);font-family:'Share Tech Mono',monospace;font-size:.9rem;margin-bottom:1rem;">ALL 12 CHALLENGES CONQUERED</p>
    <div class="success-flag">FLAG{4es_3cb_p4tt3rn_l34k_s0m_m4st3r_h4ck3r}</div>
    <p style="color:#4a5a6a;font-family:'Share Tech Mono',monospace;font-size:.7rem;">+500 POINTS AWARDED</p>
    <div class="congrats">
      ██████████████████████████████████<br>
      ██  DARK NIGHT RISES — COMPLETE  ██<br>
      ██  CREATED BY SOM               ██<br>
      ██  YOU ARE A TRUE HACKER        ██<br>
      ██████████████████████████████████
    </div>
    <button class="btn btn-gold" onclick="document.getElementById('successOverlay').style.display='none'" style="margin-top:1.5rem;">CLAIM VICTORY</button>
  </div>
</div>







`;

export const init = () => {
    
const c=document.getElementById('matrix');const ctx=c.getContext('2d');
function resizeCanvas(){c.width=window.innerWidth;c.height=window.innerHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
const cols=Math.floor(window.innerWidth/20);const drops=Array(cols).fill(1);
const chars='アイウエオ0123456789ABCDEF><{}[]SOM★';
function drawMatrix(){ctx.fillStyle='rgba(3,5,8,0.04)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#ffd700';ctx.font='14px monospace';drops.forEach((y,i)=>{const ch=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(ch,i*20,y*20);if(y*20>c.height&&Math.random()>.975)drops[i]=0;drops[i]++;});}
setInterval(drawMatrix,50);

const blocks = [
  '4e2f3a8b1c9d7e5f','4e2f3a8b1c9d7e5f','a1b2c3d4e5f67890','4e2f3a8b1c9d7e5f',
  '9f8e7d6c5b4a3210','3c4d5e6f7a8b9c0d','4e2f3a8b1c9d7e5f','7f6e5d4c3b2a1908',
  '2a3b4c5d6e7f8091','4e2f3a8b1c9d7e5f','b0c1d2e3f4051627','4e2f3a8b1c9d7e5f'
];
const blockColors = {
  '4e2f3a8b1c9d7e5f': {bg:'rgba(0,255,231,.12)',border:'#00ffe7',label:'KEY'},
  'a1b2c3d4e5f67890': {bg:'rgba(255,0,60,.12)',border:'#ff003c',label:'DATA'},
  '9f8e7d6c5b4a3210': {bg:'rgba(168,85,247,.12)',border:'#a855f7',label:'DATA'},
  '3c4d5e6f7a8b9c0d': {bg:'rgba(255,184,0,.12)',border:'#ffb800',label:'DATA'},
  '7f6e5d4c3b2a1908': {bg:'rgba(0,255,65,.12)',border:'#00ff41',label:'DATA'},
  '2a3b4c5d6e7f8091': {bg:'rgba(255,100,0,.12)',border:'#ff6400',label:'DATA'},
  'b0c1d2e3f4051627': {bg:'rgba(0,100,255,.12)',border:'#0064ff',label:'DATA'},
};

function visualizeBlocks() {
  const v = document.getElementById('blockVisual');
  v.innerHTML = blocks.map((b,i) => {
    const col = blockColors[b] || {bg:'rgba(100,100,100,.1)',border:'#666',label:'UNK'};
    return `<div class="ecb-block" style="background:${col.bg};border-color:${col.border};color:${col.border};">
      <div style="font-size:.5rem;margin-bottom:.3rem">[${col.label}]</div>
      <div style="font-size:.55rem">${b.substring(0,8)}...</div>
      <div style="font-size:.5rem;color:#4a5a6a">Block ${i+1}</div>
    </div>`;
  }).join('');
}
visualizeBlocks();

function encryptOracle() {
  const pt = document.getElementById('ptInput').value;
  const out = document.getElementById('oracleOutput');
  if(!pt) { out.textContent='// Enter plaintext first'; return; }
  
  out.textContent='[ORACLE] Encrypting with AES-ECB...\n';
  setTimeout(()=>{
    const chunkSize = 16;
    let result = '';
    for(let i=0;i<pt.length;i+=chunkSize) {
      const chunk = pt.substring(i,i+chunkSize).padEnd(chunkSize,' ');
      // Simulate ECB: same block = same output
      let hash = 0;
      for(let j=0;j<chunk.length;j++) hash = ((hash<<5)-hash)+chunk.charCodeAt(j);
      const blockHex = Math.abs(hash).toString(16).padStart(16,'0').substring(0,16);
      result += blockHex + ' | ';
    }
    out.textContent = `[200 OK] AES-ECB Encrypted:\n${result.slice(0,-3)}\n\n// Identical input blocks produce identical output blocks!`;
  }, 600);
}

const decryptSteps = {
  'identify': `[ANALYSIS] Scanning ciphertext blocks...\n\nBlock frequency count:\n  4e2f3a8b1c9d7e5f → appears 6 times ← REPEATING KEY BLOCK\n  a1b2c3d4e5f67890 → appears 1 time\n  9f8e7d6c5b4a3210 → appears 1 time\n  3c4d5e6f7a8b9c0d → appears 1 time\n  (+ 3 more unique blocks)\n\n[!] KEY IDENTIFIED: 4e2f3a8b1c9d7e5f\n[!] This block encrypts the repeating plaintext: "SOM_VAULT_KEY_16"`,
  'extract': `[EXTRACTION] Removing key blocks, isolating data...\n\nData blocks (in order):\n  Block 3:  a1b2c3d4e5f67890 → "FLAG{4es_"\n  Block 5:  9f8e7d6c5b4a3210 → "3cb_p4tt3"\n  Block 6:  3c4d5e6f7a8b9c0d → "rn_l34k_s"\n  Block 8:  7f6e5d4c3b2a1908 → "0m_m4st3r"\n  Block 9:  2a3b4c5d6e7f8091 → "_h4ck3r}"\n  Block 11: b0c1d2e3f4051627 → "[padding]"\n\n[+] 6 unique data blocks extracted`,
  'xor': `[XOR] Applying key pattern to data blocks...\n\nKey stream: SOM_VAULT_KEY_16 (repeating)\n\nBlock 3 XOR key  → "FLAG{4es_"\n  a1b2c3d4... XOR 4e2f3a8b... = 46 4c 41 47 7b 34 65 73 5f\nBlock 5 XOR key  → "3cb_p4tt3"\nBlock 6 XOR key  → "rn_l34k_s"\nBlock 8 XOR key  → "0m_m4st3r"\nBlock 9 XOR key  → "_h4ck3r}"\n\n[+] XOR complete — assembling plaintext...`,
  'decode': `[DECODE] Assembling final plaintext...\n\n████████████████████████████████████\n  DECRYPTED MESSAGE:\n  FLAG{4es_3cb_p4tt3rn_l34k_s0m_m4st3r_h4ck3r}\n████████████████████████████████████\n\n[!] AES-ECB mode leaks plaintext patterns through ciphertext patterns.\n[!] NEVER use ECB mode for encrypting structured/repetitive data.\n[!] Use CBC, GCM, or CTR mode instead.`,
};

function runDecrypt() {
  const op = document.getElementById('decryptOp').value;
  const out = document.getElementById('decryptOutput');
  if(!op) { out.textContent='// Select an operation first'; return; }
  out.textContent='[...] Running operation...';
  setTimeout(()=>{ out.textContent = decryptSteps[op]; },700);
}

function checkFlag() {
  const val = document.getElementById('flagInput').value.trim();
  const msg = document.getElementById('flagMsg');
  if(val === 'FLAG{4es_3cb_p4tt3rn_l34k_s0m_m4st3r_h4ck3r}') {
    msg.innerHTML='<span style="color:var(--gold)">★ CORRECT — FINAL FLAG CAPTURED — +500 POINTS ★</span>';
    document.getElementById('successOverlay').style.display='flex';
  } else {
    msg.innerHTML='<span style="color:var(--red)">✗ INCORRECT — Use the decryption workbench above</span>';
  }
}

};
