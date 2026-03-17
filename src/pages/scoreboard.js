
export const template = `








  <h1>// SCOREBOARD</h1>
  <p class="subtitle">LIVE RANKINGS — DARK NIGHT RISES CTF BY SOM — UPDATED EVERY 60 SECONDS</p>

  <div class="stats-row">
    <div class="stat-card"><div class="stat-num" id="s1">47</div><div class="stat-label">PLAYERS</div></div>
    <div class="stat-card"><div class="stat-num" id="s2">183</div><div class="stat-label">FLAGS CAPTURED</div></div>
    <div class="stat-card"><div class="stat-num" id="s3">12</div><div class="stat-label">CHALLENGES</div></div>
    <div class="stat-card"><div class="stat-num" id="s4">71:42:11</div><div class="stat-label">TIME REMAINING</div></div>
  </div>

  <div class="podium" id="podium"></div>

  <div class="leaderboard">
    <div class="lb-header">
      <span>RANK</span><span>PLAYER</span><span>SCORE</span><span>SOLVED</span><span>LAST FLAG</span>
    </div>
    <div id="lbRows"></div>
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

const players = [
  {name:'d4rk_h4ck3r', score:2750, solved:11, last:'2m ago', badge:'ELITE', bc:'#ff003c'},
  {name:'n1ght_0wl', score:2450, solved:10, last:'15m ago', badge:'PRO', bc:'#a855f7'},
  {name:'cyb3r_ghost', score:2100, solved:9, last:'42m ago', badge:'PRO', bc:'#a855f7'},
  {name:'r00t_k1t', score:1875, solved:8, last:'1h ago', badge:'', bc:''},
  {name:'xss_queen', score:1650, solved:7, last:'1h ago', badge:'', bc:''},
  {name:'s0m_fan', score:1450, solved:7, last:'2h ago', badge:'', bc:''},
  {name:'null_byte', score:1200, solved:6, last:'3h ago', badge:'', bc:''},
  {name:'shell_shck', score:950, solved:5, last:'4h ago', badge:'', bc:''},
  {name:'h4x0r_99', score:750, solved:4, last:'5h ago', badge:'', bc:''},
  {name:'newb13_pwn', score:500, solved:3, last:'6h ago', badge:'', bc:''},
];

function buildPodium() {
  const p = document.getElementById('podium');
  const tops = players.slice(0,3);
  const order = [tops[1],tops[0],tops[2]];
  const places = ['2nd','1st','3rd'];
  const crowns = ['🥈','👑','🥉'];
  const cls = ['podium-2','podium-1','podium-3'];
  p.innerHTML = order.map((pl,i)=>`
    <div class="podium-place">
      <div class="podium-card ${cls[i]}">
        <span class="crown">${crowns[i]}</span>
        <div class="podium-rank">${places[i]}</div>
        <div class="podium-name">${pl.name}</div>
        <div class="podium-score">${pl.score.toLocaleString()} pts</div>
        <div class="podium-solved">${pl.solved}/12 solved</div>
      </div>
    </div>
  `).join('');
}

function buildLeaderboard() {
  const container = document.getElementById('lbRows');
  const maxScore = players[0].score;
  container.innerHTML = players.map((pl,i)=>{
    const rankClass = i===0?'rank-1':i===1?'rank-2':i===2?'rank-3':'';
    const badge = pl.badge ? `<span class="player-badge" style="color:${pl.bc};border-color:${pl.bc}">${pl.badge}</span>` : '';
    return `<div class="lb-row">
      <span class="rank ${rankClass}">#${i+1}</span>
      <span class="player-name">${pl.name} ${badge}</span>
      <span class="score">${pl.score.toLocaleString()}</span>
      <span class="solved">${pl.solved}/12</span>
      <span class="time">${pl.last}</span>
    </div>`;
  }).join('');
}

buildPodium();
buildLeaderboard();

// Live countdown
let secs = 71*3600+42*60+11;
function tick(){
  secs--;
  const h=Math.floor(secs/3600);
  const m=Math.floor((secs%3600)/60);
  const s=secs%60;
  document.getElementById('s4').textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(tick,1000);

};
