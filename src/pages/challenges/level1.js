
export const template = `




<div class="challenge-wrap">
  <div class="breadcrumb"><a href="#/">HOME</a> / <a href="#/challenges">CHALLENGES</a> / LEVEL 01</div>
  
  <div class="chall-num">// LEVEL 01 OF 12 //</div>
  <div class="chall-badge">
    <span class="badge-diff">EASY</span>
    <span class="badge-pts">50 PTS</span>
    <span class="badge-cat">WEB // RECON</span>
  </div>
  <h1>HIDDEN IN PLAIN SIGHT</h1>
  
  <div class="chall-desc">
    Every web page has a story beneath its surface. Browsers render the visual — but developers often leave notes, flags, and secrets in the HTML source that casual visitors never see.
    <br><br>
    Your mission: find what's hidden on <strong style="color:#fff;">this very page</strong>. No tools required — just your browser.
    <span class="hint">// HINT: Right-click → View Page Source. Or press Ctrl+U (Windows) / Cmd+Opt+U (Mac)</span>
  </div>

  <div class="challenge-target">
    <span class="target-label">// MISSION OBJECTIVE //</span>
    <div class="target-content">
      <p>Welcome to the Dark Night Rises CTF, operated by SOM Security Labs.</p>
      <p>This challenge tests your ability to perform basic web reconnaissance. Real penetration testers always begin by reading the source code of their target — you'd be surprised what developers leave behind.</p>
      <p>Classified data has been embedded in this page. Locate it, extract it, and submit the flag below.</p>
      <p>The flag format is: <strong style="color:var(--accent);">FLAG{...}</strong></p>
      <p class="redacted">[ CLASSIFIED SECTION — AUTHORIZATION: SOM-LEVEL-1 ]</p>
    </div>
  </div>

  <div class="flag-submit">
    <h3>SUBMIT FLAG</h3>
    <div class="flag-input-row">
      <input type="text" class="flag-input" id="flagInput" placeholder="FLAG{...}" autocomplete="off">
      <button class="flag-btn" onclick="checkFlag()">SUBMIT</button>
    </div>
    <div class="flag-result flag-correct" id="res-correct">✓ CORRECT FLAG! LEVEL 01 COMPLETE — +50 PTS</div>
    <div class="flag-result flag-wrong" id="res-wrong">✗ INCORRECT FLAG — KEEP HUNTING, OPERATOR</div>
  </div>

  <a href="#/level2" class="next-btn">NEXT CHALLENGE →</a>
</div>





`;

export const init = () => {
    
const FLAG = "FLAG{s0urc3_c0d3_n3v3r_l13s_s0m}";
function checkFlag() {
  const input = document.getElementById('flagInput').value.trim();
  const c = document.getElementById('res-correct');
  const w = document.getElementById('res-wrong');
  c.style.display = 'none'; w.style.display = 'none';
  if (input === FLAG) {
    c.style.display = 'block';
    document.querySelector('.flag-input').style.borderColor = '#00ff88';
  } else { w.style.display = 'block'; }
}
document.getElementById('flagInput').addEventListener('keydown', e => { if (e.key === 'Enter') checkFlag(); });

};
