
export const template = `








<main>
  <div class="breadcrumb"><a href="#/challenges">CHALLENGES</a> / LEVEL 10 / SSRF ATTACK</div>

  <div class="challenge-header">
    <div class="badge-row">
      <span class="badge badge-hard">HARD</span>
      <span class="badge" style="color:var(--cyan);border-color:var(--cyan);background:rgba(0,255,231,.08);">300 PTS</span>
      <span class="badge" style="color:#a855f7;border-color:#a855f7;background:rgba(168,85,247,.08);">SSRF</span>
    </div>
    <h1>SSRF ATTACK</h1>
    <p class="desc">The image fetching service accepts user-supplied URLs. The server has access to an internal metadata service at <code style="color:var(--red)">http://internal.metadata/</code> — redirect it there to extract the admin flag.</p>
  </div>

  <div class="panel">
    <div class="panel-title">// NETWORK TOPOLOGY</div>
    <div class="network-diagram">
      <div class="net-node">YOU<br><span style="color:#4a5a6a">attacker</span></div>
      <div class="net-arrow">→</div>
      <div class="net-node">IMAGE FETCHER<br><span style="color:#4a5a6a">public:8080</span></div>
      <div class="net-arrow">→?</div>
      <div class="net-node internal">METADATA SVC<br><span>internal only</span></div>
    </div>
    <p style="font-family:'Share Tech Mono',monospace;font-size:.78rem;color:#7a8a9a;line-height:1.7;">The image fetcher makes server-side HTTP requests. If you point it at an internal IP or hostname, the server reaches out on your behalf — Server-Side Request Forgery (SSRF).</p>
  </div>

  <div class="panel">
    <div class="panel-title">// IMAGE FETCHER SERVICE</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">Enter a URL to fetch. The server will retrieve and display the image. <span style="color:var(--amber)">Try redirecting to internal endpoints!</span></p>
    <div class="url-input-group">
      <input type="text" class="url-input" id="fetchUrl" placeholder="https://example.com/image.png" value="https://example.com/logo.png">
      <button class="btn" onclick="fetchUrl()">FETCH</button>
    </div>
    <div class="response-box" id="fetchResponse">// Enter a URL and click FETCH to start...</div>
  </div>

  <div class="panel">
    <div class="panel-title">// RECON — INTERNAL ENDPOINTS</div>
    <p style="font-size:.85rem;color:#7a8a9a;margin-bottom:1rem;">Known internal network ranges. Try navigating these paths through the fetcher:</p>
    <ul class="endpoint-list">
      <li onclick="setUrl('http://127.0.0.1/')"><span>GET</span> http://127.0.0.1/ — localhost root</li>
      <li onclick="setUrl('http://169.254.169.254/latest/meta-data/')"><span>GET</span> http://169.254.169.254/ — AWS metadata (classic)</li>
      <li onclick="setUrl('http://internal.metadata/')"><span>GET</span> http://internal.metadata/ — internal metadata service</li>
      <li onclick="setUrl('http://internal.metadata/admin')"><span>GET</span> http://internal.metadata/admin — admin endpoint</li>
      <li onclick="setUrl('http://internal.metadata/admin/flag')"><span>GET</span> http://internal.metadata/admin/flag — 🎯 target</li>
    </ul>
  </div>

  <div class="panel">
    <div class="panel-title">// HINT</div>
    <div class="hint-box">
      [!] Start by fetching a normal URL to understand the service.<br>
      [!] Then try 127.0.0.1 — does the server block it?<br>
      [!] The internal hostname <code>internal.metadata</code> is only reachable from within the server network.<br>
      [!] Navigate to /admin/flag to retrieve the secret.
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
    <h2>// SSRF SUCCESSFUL //</h2>
    <p style="color:#7a8a9a;font-family:'Share Tech Mono',monospace;font-size:.8rem;margin-bottom:1rem;">Internal metadata service accessed via SSRF.</p>
    <div class="success-flag">FLAG{ssrf_1nt3rn4l_m3t4d4t4_s0m_r0ck3t}</div>
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

function setUrl(url) {
  document.getElementById('fetchUrl').value = url;
}

const responses = {
  'external': `[FETCH] Retrieving external URL...\n[200 OK] Content-Type: image/png\n[OK] Image loaded successfully (42KB)\n\n// Nothing interesting here — try internal endpoints`,
  '127.0.0.1': `[FETCH] Connecting to 127.0.0.1...\n[200 OK] Content-Type: text/html\n\n<html><body><h1>Internal Server</h1><p>Dark Night Rises - Internal Web Server</p><ul><li><a href="/admin">/admin</a></li><li><a href="/status">/status</a></li></ul></body></html>\n\n// The server can reach localhost! Try /admin`,
  '169.254.169.254': `[FETCH] Connecting to 169.254.169.254...\n[200 OK] Content-Type: text/plain\n\nlatest/\nmeta-data/\nuser-data/\n\nmeta-data/ami-id: ami-0a1b2c3d\nmeta-data/instance-type: t3.medium\nmeta-data/iam/security-credentials/\n  > role: ctf-server-role\n  > AccessKeyId: AKIA...\n  > SecretAccessKey: [REDACTED]\n\n// Interesting! Now try the internal hostname`,
  'internal.metadata': `[FETCH] Connecting to internal.metadata...\n[200 OK] Content-Type: application/json\n\n{\n  "service": "DNR Internal Metadata API",\n  "version": "2.1.0",\n  "endpoints": [\n    "/health",\n    "/config",\n    "/admin",\n    "/admin/users",\n    "/admin/flag"\n  ]\n}\n\n// Getting warmer! Navigate to /admin/flag`,
  'internal.metadata/admin': `[FETCH] Connecting to internal.metadata/admin...\n[200 OK] Content-Type: application/json\n\n{\n  "admin_panel": "Dark Night Rises Internal Admin",\n  "users": 47,\n  "challenges_solved": 183,\n  "restricted_routes": ["/admin/flag", "/admin/config"],\n  "note": "This endpoint is not accessible from the public internet"\n}\n\n// ONE MORE STEP — /admin/flag`,
  'internal.metadata/admin/flag': `[FETCH] Connecting to internal.metadata/admin/flag...\n[200 OK] Content-Type: application/json\n\n{\n  "status": "RETRIEVED",\n  "source": "internal-only endpoint",\n  "accessed_via": "SSRF",\n  "flag": "FLAG{ssrf_1nt3rn4l_m3t4d4t4_s0m_r0ck3t}",\n  "note": "By SOM — SSRF allows attackers to make the server request internal resources on their behalf"\n}`,
};

function fetchUrl() {
  const url = document.getElementById('fetchUrl').value.trim();
  const box = document.getElementById('fetchResponse');
  box.textContent = '[FETCH] Initiating request to: ' + url + '\n[...] Establishing connection...';
  
  setTimeout(()=>{
    let key = 'external';
    if(url.includes('127.0.0.1')) key = '127.0.0.1';
    else if(url.includes('169.254.169.254')) key = '169.254.169.254';
    else if(url.includes('internal.metadata/admin/flag')) key = 'internal.metadata/admin/flag';
    else if(url.includes('internal.metadata/admin')) key = 'internal.metadata/admin';
    else if(url.includes('internal.metadata')) key = 'internal.metadata';
    
    box.textContent = responses[key];
  }, 800);
}

function checkFlag() {
  const val = document.getElementById('flagInput').value.trim();
  const msg = document.getElementById('flagMsg');
  if(val === 'FLAG{ssrf_1nt3rn4l_m3t4d4t4_s0m_r0ck3t}') {
    msg.innerHTML='<span style="color:var(--green)">✓ CORRECT FLAG — +300 POINTS</span>';
    document.getElementById('successOverlay').style.display='flex';
  } else {
    msg.innerHTML='<span style="color:var(--red)">✗ INCORRECT FLAG</span>';
  }
}

};
