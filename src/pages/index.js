
export const template = `




<div class="som-corner">SOM // CTF // DARK NIGHT RISES // SOM // CTF</div>

<!-- NAV -->


<!-- ANNOUNCEMENT -->
<div class="announcement-bar">
  ⚠ &nbsp; CTF ACTIVE &nbsp; // &nbsp; AUTHORIZED PENETRATION TESTING ONLY &nbsp; // &nbsp; ALL ACTIVITY LOGGED &nbsp; // &nbsp; SOM SECURITY LABS
</div>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">// AUTHORIZED HACKING ARENA //</div>
    <h1 class="hero-title">
      <span class="line1">DARK NIGHT</span>
      <span class="line2 glitch" data-text="RISES">RISES</span>
      <span class="line3">by SOM &nbsp;—&nbsp; CTF PLATFORM</span>
    </h1>
    <p class="hero-subtitle">
      Breach the system. Capture the flag. <span>12 challenges</span> across web, crypto, reverse, and forensics.<br>
      From basic recon to advanced exploitation — prove your worth in the dark.
    </p>
    <div class="hero-cta">
      <a href="#/challenges" class="btn-primary">ENTER ARENA</a>
      <a href="#/scoreboard" class="btn-secondary">VIEW SCOREBOARD</a>
    </div>
  </div>

  <svg class="hex-grid" width="500" height="500" viewBox="0 0 500 500">
    <!-- Hex pattern decorative -->
    <defs>
      <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse">
        <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke="#00ffe7" stroke-width="1"></polygon>
        <polygon points="28,52 54,66 54,94 28,108 2,94 2,66" fill="none" stroke="#00ffe7" stroke-width="1"></polygon>
        <polygon points="56,2 82,16 82,44 56,58 30,44 30,16" fill="none" stroke="#00ffe7" stroke-width="1"></polygon>
      </pattern>
    </defs>
    <rect width="500" height="500" fill="url(#hex)"></rect>
  </svg>
</section>

<!-- STATS -->
<div class="stats-bar">
  <div class="stat-item">
    <span class="stat-num" id="s1">00</span>
    <span class="stat-label">Active Players</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">12</span>
    <span class="stat-label">Total Challenges</span>
  </div>
  <div class="stat-item">
    <span class="stat-num" id="s2">00</span>
    <span class="stat-label">Flags Captured</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">72H</span>
    <span class="stat-label">Time Remaining</span>
  </div>
</div>

<!-- CHALLENGES PREVIEW -->
<section class="section">
  <div class="section-header">
    <span class="section-tag">CHALLENGES</span>
    <h2 class="section-title">MISSION OBJECTIVES</h2>
    <div class="section-line"></div>
  </div>

  <div class="challenges-grid">
    <!-- Easy -->
    <a href="#/level1" class="challenge-card">
      <div class="card-corner">01</div>
      <span class="card-difficulty diff-easy">EASY</span>
      <div class="card-title">HIDDEN IN PLAIN SIGHT</div>
      <div class="card-desc">/* Source code holds secrets that eyes ignore */</div>
      <div class="card-meta">
        <span class="card-points">50 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level2" class="challenge-card">
      <div class="card-corner">02</div>
      <span class="card-difficulty diff-easy">EASY</span>
      <div class="card-title">COOKIE MONSTER</div>
      <div class="card-desc">/* Session tokens whisper admin secrets */</div>
      <div class="card-meta">
        <span class="card-points">75 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level3" class="challenge-card">
      <div class="card-corner">03</div>
      <span class="card-difficulty diff-easy">EASY</span>
      <div class="card-title">ROBOTS.TXT EXPOSED</div>
      <div class="card-desc">/* Some paths are hidden for a reason */</div>
      <div class="card-meta">
        <span class="card-points">50 PTS</span>
        <span class="card-category">RECON</span>
      </div>
    </a>
    <a href="#/level4" class="challenge-card">
      <div class="card-corner">04</div>
      <span class="card-difficulty diff-easy">EASY</span>
      <div class="card-title">BASE64 MAZE</div>
      <div class="card-desc">/* Encoded strings guard the gateway */</div>
      <div class="card-meta">
        <span class="card-points">75 PTS</span>
        <span class="card-category">CRYPTO</span>
      </div>
    </a>
    <!-- Medium -->
    <a href="#/level5" class="challenge-card">
      <div class="card-corner">05</div>
      <span class="card-difficulty diff-medium">MEDIUM</span>
      <div class="card-title">SQL INJECTION 101</div>
      <div class="card-desc">/* The database has loose lips when queried right */</div>
      <div class="card-meta">
        <span class="card-points">150 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level6" class="challenge-card">
      <div class="card-corner">06</div>
      <span class="card-difficulty diff-medium">MEDIUM</span>
      <div class="card-title">XSS INJECTION</div>
      <div class="card-desc">/* Scripts that shouldn't execute, do */</div>
      <div class="card-meta">
        <span class="card-points">150 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level7" class="challenge-card">
      <div class="card-corner">07</div>
      <span class="card-difficulty diff-medium">MEDIUM</span>
      <div class="card-title">DIRECTORY TRAVERSAL</div>
      <div class="card-desc">/* The filesystem holds files beyond reach... or does it? */</div>
      <div class="card-meta">
        <span class="card-points">175 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level8" class="challenge-card">
      <div class="card-corner">08</div>
      <span class="card-difficulty diff-medium">MEDIUM</span>
      <div class="card-title">JWT FORGERY</div>
      <div class="card-desc">/* Tokens can be broken if the algorithm is weak */</div>
      <div class="card-meta">
        <span class="card-points">200 PTS</span>
        <span class="card-category">CRYPTO</span>
      </div>
    </a>
    <!-- Hard -->
    <a href="#/level9" class="challenge-card">
      <div class="card-corner">09</div>
      <span class="card-difficulty diff-hard">HARD</span>
      <div class="card-title">BROKEN AUTH CHAIN</div>
      <div class="card-desc">/* Multi-step logic flaws expose admin access */</div>
      <div class="card-meta">
        <span class="card-points">300 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level10" class="challenge-card">
      <div class="card-corner">10</div>
      <span class="card-difficulty diff-hard">HARD</span>
      <div class="card-title">SSRF ATTACK</div>
      <div class="card-desc">/* Make the server request what it shouldn't */</div>
      <div class="card-meta">
        <span class="card-points">300 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level11" class="challenge-card">
      <div class="card-corner">11</div>
      <span class="card-difficulty diff-hard">HARD</span>
      <div class="card-title">IDOR ESCALATION</div>
      <div class="card-desc">/* Object references aren't just numbers */</div>
      <div class="card-meta">
        <span class="card-points">350 PTS</span>
        <span class="card-category">WEB</span>
      </div>
    </a>
    <a href="#/level12" class="challenge-card">
      <div class="card-corner">12</div>
      <span class="card-difficulty diff-hard">HARD</span>
      <div class="card-title">THE FINAL CIPHER</div>
      <div class="card-desc">/* Multi-layer encryption hides the master key */</div>
      <div class="card-meta">
        <span class="card-points">500 PTS</span>
        <span class="card-category">CRYPTO</span>
      </div>
    </a>
  </div>
</section>

<!-- TERMINAL SECTION -->
<div class="terminal-section">
  <div class="terminal">
    <div class="terminal-bar">
      <div class="t-dot t-red"></div>
      <div class="t-dot t-yellow"></div>
      <div class="t-dot t-green"></div>
      <span class="terminal-title">DARK NIGHT RISES — TERMINAL // SOM LABS</span>
    </div>
    <div class="terminal-body" id="terminal-body">
      <!-- dynamically filled -->
    </div>
  </div>
</div>

<!-- LEADERBOARD PREVIEW -->
<section class="section">
  <div class="section-header">
    <span class="section-tag">LIVE</span>
    <h2 class="section-title">SCOREBOARD</h2>
    <div class="section-line"></div>
  </div>

  <div class="leaderboard">
    <div class="lb-header">
      <div>RANK</div>
      <div>OPERATOR</div>
      <div>SCORE</div>
      <div>SOLVED</div>
    </div>
    <div class="lb-row">
      <div class="lb-rank rank-1">01</div>
      <div class="lb-name">gh0st_r00t</div>
      <div class="lb-score">1850</div>
      <div class="lb-solved">8/12</div>
    </div>
    <div class="lb-row">
      <div class="lb-rank rank-2">02</div>
      <div class="lb-name">n3ur0hack</div>
      <div class="lb-score">1625</div>
      <div class="lb-solved">7/12</div>
    </div>
    <div class="lb-row">
      <div class="lb-rank rank-3">03</div>
      <div class="lb-name">z3r0_d4y</div>
      <div class="lb-score">1400</div>
      <div class="lb-solved">6/12</div>
    </div>
    <div class="lb-row">
      <div class="lb-rank rank-other">04</div>
      <div class="lb-name">0xd34db33f</div>
      <div class="lb-score">1200</div>
      <div class="lb-solved">5/12</div>
    </div>
    <div class="lb-row">
      <div class="lb-rank rank-other">05</div>
      <div class="lb-name">cyph3rm4n</div>
      <div class="lb-score">975</div>
      <div class="lb-solved">4/12</div>
    </div>
  </div>
</section>

<!-- FOOTER -->






`;

export const init = () => {
    
// MATRIX RAIN
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01ABCDEF0123456789!@#$%^&*';
const fontSize = 14;
const cols = Math.floor(canvas.width / fontSize);
const drops = Array(cols).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(3,5,8,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ffe7';
  ctx.font = fontSize + 'px Share Tech Mono';
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

setInterval(drawMatrix, 60);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// COUNTER ANIMATION
function animateCount(el, target, duration) {
  let start = 0;
  const step = Math.ceil(target / (duration / 50));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = String(target).padStart(2,'0'); clearInterval(timer); }
    else { el.textContent = String(start).padStart(2,'0'); }
  }, 50);
}
setTimeout(() => {
  animateCount(document.getElementById('s1'), 47, 1500);
  animateCount(document.getElementById('s2'), 183, 1500);
}, 800);

// TERMINAL TYPEWRITER
const lines = [
  { type: 'prompt', text: '~/dark-night-rises $ ', cmd: 'nmap -sV target.ctf.som' },
  { type: 'output', text: 'Starting Nmap 7.94...' },
  { type: 'output', text: 'PORT    STATE  SERVICE  VERSION' },
  { type: 'output', text: '80/tcp  open   http     Apache httpd 2.4.41' },
  { type: 'output', text: '443/tcp open   ssl/http  nginx 1.18.0' },
  { type: 'success', text: '[+] 12 challenge ports identified' },
  { type: 'prompt', text: '~/dark-night-rises $ ', cmd: 'ctf --list challenges' },
  { type: 'success', text: '[*] Loading mission objectives...' },
  { type: 'output', text: '[1-4]  EASY    // Basic web recon & encoding' },
  { type: 'output', text: '[5-8]  MEDIUM  // Injection & auth bypass' },
  { type: 'output', text: '[9-12] HARD    // Advanced exploitation' },
  { type: 'success', text: '[+] Good luck, operator. // SOM' },
];

const tbody = document.getElementById('terminal-body');
let lineIdx = 0, charIdx = 0;

function typeTerminal() {
  if (lineIdx >= lines.length) {
    const cursor = document.createElement('span');
    cursor.className = 't-cursor';
    tbody.appendChild(cursor);
    return;
  }
  const l = lines[lineIdx];
  let lineEl = tbody.querySelector('[data-line="' + lineIdx + '"]');
  if (!lineEl) {
    lineEl = document.createElement('div');
    lineEl.className = 't-line';
    lineEl.dataset.line = lineIdx;
    if (l.type === 'prompt') {
      const pSpan = document.createElement('span');
      pSpan.className = 't-prompt';
      pSpan.textContent = l.text;
      lineEl.appendChild(pSpan);
      const cSpan = document.createElement('span');
      cSpan.className = 't-cmd';
      lineEl.appendChild(cSpan);
    } else {
      lineEl.className = 't-line ' + (l.type === 'success' ? 't-success' : 't-output');
    }
    tbody.appendChild(lineEl);
  }

  if (l.type === 'prompt') {
    const cSpan = lineEl.querySelector('.t-cmd');
    if (charIdx < l.cmd.length) {
      cSpan.textContent += l.cmd[charIdx++];
      setTimeout(typeTerminal, 40);
    } else {
      charIdx = 0; lineIdx++;
      setTimeout(typeTerminal, 300);
    }
  } else {
    if (charIdx < l.text.length) {
      lineEl.textContent += l.text[charIdx++];
      setTimeout(typeTerminal, 18);
    } else {
      charIdx = 0; lineIdx++;
      setTimeout(typeTerminal, 200);
    }
  }
}

setTimeout(typeTerminal, 1200);

};
