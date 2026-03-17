
export const template = `



<div class="challenge-wrap">
  <div class="breadcrumb"><a href="#/">HOME</a> / <a href="#/challenges">CHALLENGES</a> / LEVEL 03</div>
  <div class="chall-num">// LEVEL 03 OF 12 //</div>
  <div class="chall-badge">
    <span class="badge-diff">EASY</span>
    <span class="badge-pts">50 PTS</span>
    <span class="badge-cat">RECON // DISCOVERY</span>
  </div>
  <h1>ROBOTS.TXT EXPOSED</h1>
  <div class="chall-desc">
    The robots.txt file tells search engine crawlers which pages to ignore. Site administrators use it to prevent indexing of admin panels, backups, and sensitive paths. But by telling crawlers to stay away — they're also telling hackers exactly where to look.
    <br><br>
    Read the robots.txt file below, find the hidden path, and navigate to it.
    <span class="hint">// HINT: Click the disallowed path to "navigate" to it and retrieve the flag</span>
  </div>
  <div class="challenge-target">
    <span class="target-label">// SIMULATED ROBOTS.TXT //</span>
    <div class="file-viewer">
      <div class="fv-bar">GET /robots.txt HTTP/1.1 — 200 OK</div>
      <div class="fv-content">
        <div><span class="comment"># Dark Night Rises CTF — robots.txt</span></div>
        <div><span class="comment"># Managed by SOM Security Labs</span></div>
        <div>&nbsp;</div>
        <div><span class="key">User-agent:</span> <span class="val">*</span></div>
        <div><span class="key">Disallow:</span> <span class="val">/wp-admin/</span></div>
        <div><span class="key">Disallow:</span> <span class="val">/backup/</span></div>
        <div><span class="key">Disallow:</span> <span class="val">/api/internal/</span></div>
        <div><span class="key">Disallow:</span> <span class="val"><span class="secret-path" onclick="revealSecret()">/secret-vault/flag.txt</span></span></div>
        <div><span class="key">Disallow:</span> <span class="val">/tmp/</span></div>
        <div>&nbsp;</div>
        <div><span class="key">Sitemap:</span> <span class="val">https://ctf.som.labs/sitemap.xml</span></div>
      </div>
    </div>
    <div class="secret-box" id="secret-box">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--dim);letter-spacing:3px;margin-bottom:12px;">NAVIGATING TO /secret-vault/flag.txt ...</div>
      <div class="flag-reveal">FLAG{r0b0ts_txt_b3tr4y3d_s0m_s3cr3ts}</div>
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--dim);margin-top:8px;">// DARK NIGHT RISES — SOM // CTF LEVEL 03</div>
    </div>
  </div>
  <div class="flag-submit">
    <h3>SUBMIT FLAG</h3>
    <div class="flag-input-row">
      <input type="text" class="flag-input" id="flagInput" placeholder="FLAG{...}" autocomplete="off">
      <button class="flag-btn" onclick="checkFlag()">SUBMIT</button>
    </div>
    <div class="flag-result flag-correct" id="res-correct">✓ CORRECT FLAG! LEVEL 03 COMPLETE — +50 PTS</div>
    <div class="flag-result flag-wrong" id="res-wrong">✗ INCORRECT FLAG — READ THE ROBOTS</div>
  </div>
  <a href="#/level4" class="next-btn">NEXT CHALLENGE →</a>
</div>




`;

export const init = () => {
    
function revealSecret() {
  document.getElementById('secret-box').style.display = 'block';
  document.querySelector('.secret-path').style.color = '#00ff88';
}
const FLAG = "FLAG{r0b0ts_txt_b3tr4y3d_s0m_s3cr3ts}";
function checkFlag() {
  const input = document.getElementById('flagInput').value.trim();
  const c = document.getElementById('res-correct'), w = document.getElementById('res-wrong');
  c.style.display = 'none'; w.style.display = 'none';
  if (input === FLAG) { c.style.display = 'block'; } else { w.style.display = 'block'; }
}
document.getElementById('flagInput').addEventListener('keydown', e => { if (e.key === 'Enter') checkFlag(); });

};
