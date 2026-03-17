
export const template = `




<div class="page-header">
  <div class="page-tag">12 MISSIONS</div>
  <h1 class="page-title">CHALLENGE BOARD</h1>
  <p class="page-desc">// SELECT YOUR TARGET. BREACH THE SYSTEM. CAPTURE THE FLAG. //</p>
</div>

<div class="filter-bar">
  <button class="filter-btn active" onclick="filter('all',this)">ALL</button>
  <button class="filter-btn" onclick="filter('web',this)">WEB</button>
  <button class="filter-btn" onclick="filter('crypto',this)">CRYPTO</button>
  <button class="filter-btn" onclick="filter('recon',this)">RECON</button>
  <button class="filter-btn" onclick="filter('easy',this)">EASY</button>
  <button class="filter-btn" onclick="filter('medium',this)">MEDIUM</button>
  <button class="filter-btn" onclick="filter('hard',this)">HARD</button>
</div>

<div class="main">
  <div class="total-bar">
    <div class="total-item"><span class="total-num">0</span><span class="total-label">Your Score</span></div>
    <div class="total-item"><span class="total-num">0/12</span><span class="total-label">Solved</span></div>
    <div class="total-item"><span class="total-num">72H</span><span class="total-label">Remaining</span></div>
    <div class="total-item"><span class="total-num">2000</span><span class="total-label">Max Score</span></div>
  </div>

  <!-- EASY -->
  <div class="section-divider"><span class="diff-indicator di-easy">EASY</span> BEGINNER TERRITORY // START HERE</div>
  <div class="challenges-grid" id="grid-easy">
    <a href="#/level1" class="chal-card" data-cat="web" data-diff="easy">
      <div class="chal-num">01</div>
      <div class="chal-cat">WEB // RECON</div>
      <div class="chal-title">HIDDEN IN PLAIN SIGHT</div>
      <div class="chal-desc">Developers sometimes leave secrets visible. Read carefully, operator — the flag is right in front of you.</div>
      <div class="chal-footer"><span class="chal-pts">50 PTS</span><span class="solves-count">142 solves</span></div>
    </a>
    <a href="#/level2" class="chal-card" data-cat="web" data-diff="easy">
      <div class="chal-num">02</div>
      <div class="chal-cat">WEB // AUTH</div>
      <div class="chal-title">COOKIE MONSTER</div>
      <div class="chal-desc">Session cookies carry more data than you think. Check what the server sets after authentication.</div>
      <div class="chal-footer"><span class="chal-pts">75 PTS</span><span class="solves-count">98 solves</span></div>
    </a>
    <a href="#/level3" class="chal-card" data-cat="recon" data-diff="easy">
      <div class="chal-num">03</div>
      <div class="chal-cat">RECON // DISCOVERY</div>
      <div class="chal-title">ROBOTS.TXT EXPOSED</div>
      <div class="chal-desc">Web crawlers must be told where NOT to go. That list of restricted paths is public knowledge.</div>
      <div class="chal-footer"><span class="chal-pts">50 PTS</span><span class="solves-count">167 solves</span></div>
    </a>
    <a href="#/level4" class="chal-card" data-cat="crypto" data-diff="easy">
      <div class="chal-num">04</div>
      <div class="chal-cat">CRYPTO // ENCODING</div>
      <div class="chal-title">BASE64 MAZE</div>
      <div class="chal-desc">The encoded string is layered. Decode once, twice, three times — follow the rabbit hole down.</div>
      <div class="chal-footer"><span class="chal-pts">75 PTS</span><span class="solves-count">121 solves</span></div>
    </a>
  </div>

  <!-- MEDIUM -->
  <div class="section-divider"><span class="diff-indicator di-medium">MEDIUM</span> INTERMEDIATE ZONE // KNOW YOUR TOOLS</div>
  <div class="challenges-grid" id="grid-medium">
    <a href="#/level5" class="chal-card" data-cat="web" data-diff="medium">
      <div class="chal-num">05</div>
      <div class="chal-cat">WEB // INJECTION</div>
      <div class="chal-title">SQL INJECTION 101</div>
      <div class="chal-desc">The login query trusts your input too much. Break the logic, read the database, claim the flag.</div>
      <div class="chal-footer"><span class="chal-pts">150 PTS</span><span class="solves-count">63 solves</span></div>
    </a>
    <a href="#/level6" class="chal-card" data-cat="web" data-diff="medium">
      <div class="chal-num">06</div>
      <div class="chal-cat">WEB // XSS</div>
      <div class="chal-title">XSS INJECTION</div>
      <div class="chal-desc">The comment box reflects your input directly. Inject a script — find what the page reveals when executed.</div>
      <div class="chal-footer"><span class="chal-pts">150 PTS</span><span class="solves-count">58 solves</span></div>
    </a>
    <a href="#/level7" class="chal-card" data-cat="web" data-diff="medium">
      <div class="chal-num">07</div>
      <div class="chal-cat">WEB // FILE INCLUSION</div>
      <div class="chal-title">DIRECTORY TRAVERSAL</div>
      <div class="chal-desc">The file reader parameter isn't validated. Navigate up the path and read files you shouldn't be able to.</div>
      <div class="chal-footer"><span class="chal-pts">175 PTS</span><span class="solves-count">44 solves</span></div>
    </a>
    <a href="#/level8" class="chal-card" data-cat="crypto" data-diff="medium">
      <div class="chal-num">08</div>
      <div class="chal-cat">CRYPTO // JWT</div>
      <div class="chal-title">JWT FORGERY</div>
      <div class="chal-desc">The JWT uses algorithm "none" mode. Modify the payload, remove the signature, impersonate the admin.</div>
      <div class="chal-footer"><span class="chal-pts">200 PTS</span><span class="solves-count">31 solves</span></div>
    </a>
  </div>

  <!-- HARD -->
  <div class="section-divider"><span class="diff-indicator di-hard">HARD</span> EXPERT DOMAIN // ELITE OPERATORS ONLY</div>
  <div class="challenges-grid" id="grid-hard">
    <a href="#/level9" class="chal-card" data-cat="web" data-diff="hard">
      <div class="chal-num">09</div>
      <div class="chal-cat">WEB // AUTH CHAIN</div>
      <div class="chal-title">BROKEN AUTH CHAIN</div>
      <div class="chal-desc">A multi-step password reset with logic flaws. Chain the vulnerabilities together to take over the admin account.</div>
      <div class="chal-footer"><span class="chal-pts">300 PTS</span><span class="solves-count">19 solves</span></div>
    </a>
    <a href="#/level10" class="chal-card" data-cat="web" data-diff="hard">
      <div class="chal-num">10</div>
      <div class="chal-cat">WEB // SSRF</div>
      <div class="chal-title">SSRF ATTACK</div>
      <div class="chal-desc">The image fetcher makes server-side requests. Redirect it to internal endpoints and exfiltrate the flag.</div>
      <div class="chal-footer"><span class="chal-pts">300 PTS</span><span class="solves-count">14 solves</span></div>
    </a>
    <a href="#/level11" class="chal-card" data-cat="web" data-diff="hard">
      <div class="chal-num">11</div>
      <div class="chal-cat">WEB // ACCESS CONTROL</div>
      <div class="chal-title">IDOR ESCALATION</div>
      <div class="chal-desc">User profile IDs are sequential integers. Enumerate them to find the admin profile and its hidden flag.</div>
      <div class="chal-footer"><span class="chal-pts">350 PTS</span><span class="solves-count">11 solves</span></div>
    </a>
    <a href="#/level12" class="chal-card" data-cat="crypto" data-diff="hard">
      <div class="chal-num">12</div>
      <div class="chal-cat">CRYPTO // CIPHER</div>
      <div class="chal-title">THE FINAL CIPHER</div>
      <div class="chal-desc">AES-ECB with a repeating key weakness. Analyze the ciphertext patterns, derive the key, decrypt the master flag.</div>
      <div class="chal-footer"><span class="chal-pts">500 PTS</span><span class="solves-count">5 solves</span></div>
    </a>
  </div>
</div>







`;

export const init = () => {
    
function filter(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.chal-card').forEach(card => {
    const cat = card.dataset.cat, diff = card.dataset.diff;
    if (type === 'all' || cat === type || diff === type) card.style.display = 'block';
    else card.style.display = 'none';
  });
}

};
