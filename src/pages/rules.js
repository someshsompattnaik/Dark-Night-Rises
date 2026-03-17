
export const template = `








  <h1>// RULES &amp; GUIDELINES</h1>
  <p class="subtitle">READ CAREFULLY BEFORE COMPETING — DARK NIGHT RISES CTF BY SOM</p>

  <div class="rule-section">
    <h2>01. FLAG FORMAT</h2>
    <p style="color:#7a8a9a;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin-bottom:1rem;">All flags follow a consistent format. Submit exactly as found — case sensitive.</p>
    <div class="flag-format">FLAG{s4mpl3_fl4g_f0rm4t_h3r3}</div>
    <p style="font-family:'Share Tech Mono',monospace;font-size:.78rem;color:#4a5a6a;">Flags consist of: <em>FLAG{</em> + alphanumeric characters + underscores + <em>}</em></p>
  </div>

  <div class="rule-section">
    <h2>02. GENERAL RULES</h2>
    <div class="rule-item"><span class="rule-num">01.</span><p class="rule-text">This is a <em>legal, educational</em> CTF platform. All vulnerabilities are simulated and contained within this environment.</p></div>
    <div class="rule-item"><span class="rule-num">02.</span><p class="rule-text">Attack <em>only</em> the provided challenge infrastructure. Do not attempt to attack the hosting server, other players, or external systems.</p></div>
    <div class="rule-item"><span class="rule-num">03.</span><p class="rule-text">Do <em>not share flags</em> with other players. Flag sharing results in disqualification for both parties.</p></div>
    <div class="rule-item"><span class="rule-num">04.</span><p class="rule-text">Do not attempt to brute-force or DoS any challenge endpoints beyond what is necessary to solve the challenge.</p></div>
    <div class="rule-item"><span class="rule-num">05.</span><p class="rule-text"><em>Have fun</em> and learn! The goal is education — understanding web vulnerabilities protects real systems.</p></div>
  </div>

  <div class="rule-section">
    <h2>03. WHAT'S ALLOWED</h2>
    <div class="allowed-grid">
      <div class="allowed-col yes">
        <h3>✓ ALLOWED</h3>
        <ul>
          <li>Source code analysis</li>
          <li>Browser dev tools</li>
          <li>Cookie manipulation</li>
          <li>URL/parameter tampering</li>
          <li>Using Burp Suite / OWASP ZAP</li>
          <li>Scripting solutions</li>
          <li>Collaborating on strategy</li>
          <li>Using online decoders</li>
          <li>Reading writeups (after CTF)</li>
        </ul>
      </div>
      <div class="allowed-col no">
        <h3>✗ NOT ALLOWED</h3>
        <ul>
          <li>Sharing flags/solutions</li>
          <li>Attacking other players</li>
          <li>Automated brute force at scale</li>
          <li>Attacking external servers</li>
          <li>Multiple accounts per player</li>
          <li>Exploiting platform bugs</li>
          <li>Disrupting other players</li>
          <li>Posting solutions publicly</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="rule-section">
    <h2>04. POINT VALUES</h2>
    <table class="points-table">
      <thead><tr><th>LEVEL</th><th>CHALLENGE</th><th>DIFFICULTY</th><th>POINTS</th><th>CATEGORY</th></tr></thead>
      <tbody>
        <tr><td>01</td><td>Hidden in Source</td><td class="diff-easy">EASY</td><td>50</td><td>Recon</td></tr>
        <tr><td>02</td><td>Cookie Monster</td><td class="diff-easy">EASY</td><td>75</td><td>Web</td></tr>
        <tr><td>03</td><td>Robots.txt Exposed</td><td class="diff-easy">EASY</td><td>50</td><td>Recon</td></tr>
        <tr><td>04</td><td>Base64 Maze</td><td class="diff-easy">EASY</td><td>75</td><td>Crypto</td></tr>
        <tr><td>05</td><td>SQL Injection</td><td class="diff-medium">MEDIUM</td><td>150</td><td>Web</td></tr>
        <tr><td>06</td><td>XSS Injection</td><td class="diff-medium">MEDIUM</td><td>150</td><td>Web</td></tr>
        <tr><td>07</td><td>Directory Traversal</td><td class="diff-medium">MEDIUM</td><td>175</td><td>Web</td></tr>
        <tr><td>08</td><td>JWT Forgery</td><td class="diff-medium">MEDIUM</td><td>200</td><td>Auth</td></tr>
        <tr><td>09</td><td>Broken Auth Chain</td><td class="diff-hard">HARD</td><td>300</td><td>Auth</td></tr>
        <tr><td>10</td><td>SSRF Attack</td><td class="diff-hard">HARD</td><td>300</td><td>SSRF</td></tr>
        <tr><td>11</td><td>IDOR Escalation</td><td class="diff-hard">HARD</td><td>350</td><td>IDOR</td></tr>
        <tr><td>12</td><td>The Final Cipher</td><td class="diff-hard">HARD ★</td><td>500</td><td>Crypto</td></tr>
        <tr style="border-top:2px solid rgba(0,255,231,.2)"><td colspan="3" style="color:var(--cyan);font-family:'Orbitron',monospace;">TOTAL POSSIBLE</td><td style="color:var(--cyan);font-family:'Orbitron',monospace;">2375</td><td></td></tr>
      </tbody>
    </table>
  </div>

  <div class="rule-section" style="border-color:rgba(0,255,231,.3);text-align:center;">
    <h2 style="text-align:center;color:#fff;">CREATED BY SOM</h2>
    <p style="font-family:'Share Tech Mono',monospace;font-size:.85rem;color:#7a8a9a;line-height:1.8;margin-top:1rem;">
      Dark Night Rises is an educational CTF platform built to teach<br>
      real-world web vulnerability concepts in a safe, legal environment.<br><br>
      <span style="color:var(--cyan)">// Every challenge represents a real vulnerability class //</span><br>
      <span style="color:#4a5a6a">Learn. Hack. Grow. Repeat.</span>
    </p>
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

};
