
export const template = `



<div class="challenge-wrap">
  <div class="breadcrumb"><a href="#/">HOME</a> / <a href="#/challenges">CHALLENGES</a> / LEVEL 07</div>
  <div class="chall-num">// LEVEL 07 OF 12 //</div>
  <div class="chall-badge">
    <span class="badge-diff">MEDIUM</span>
    <span class="badge-pts">175 PTS</span>
    <span class="badge-cat">WEB // FILE INCLUSION</span>
  </div>
  <h1>DIRECTORY TRAVERSAL</h1>
  <div class="chall-desc">
    A file reader endpoint accepts a filename parameter but doesn't restrict path traversal. Using <code>../</code> sequences, you can escape the intended directory and access files elsewhere on the filesystem — including sensitive config files and the flag.
    <br><br>
    The endpoint serves files from <code style="color:#ffb800;">/var/www/html/files/</code> — but can you escape it?
    <span class="hint">// HINT: Try the file parameter: <code>../../../etc/passwd</code> or <code>../../../../secret/flag.txt</code></span>
  </div>
  <div class="vuln-app">
    <div class="app-bar">
      <span class="app-title">FILE READER</span>
    </div>
    <div class="app-body">
      <div class="allowed-files">
        <div class="af-title">AVAILABLE FILES (intended)</div>
        <div class="af-item" onclick="loadFile('readme.txt')">readme.txt</div>
        <div class="af-item" onclick="loadFile('info.txt')">info.txt</div>
        <div class="af-item" onclick="loadFile('mission.txt')">mission.txt</div>
      </div>
      <div class="file-selector">
        <label class="fs-label">FILE PATH PARAMETER (?file=)</label>
        <input type="text" class="fs-input" id="filepath" placeholder="readme.txt" value="">
        <button class="fs-btn" onclick="loadFile()">▶ READ FILE</button>
      </div>
      <div class="file-output" id="file-output">// FILE CONTENTS WILL APPEAR HERE</div>
    </div>
  </div>
  <div class="flag-submit">
    <h3>SUBMIT FLAG</h3>
    <div class="flag-input-row">
      <input type="text" class="flag-input" id="flagInput" placeholder="FLAG{...}" autocomplete="off">
      <button class="flag-btn" onclick="checkFlag()">SUBMIT</button>
    </div>
    <div class="flag-result flag-correct" id="res-correct">✓ CORRECT FLAG! LEVEL 07 COMPLETE — +175 PTS</div>
    <div class="flag-result flag-wrong" id="res-wrong">✗ INCORRECT FLAG — TRAVERSE DEEPER</div>
  </div>
  <a href="#/level8" class="next-btn">NEXT CHALLENGE →</a>
</div>




`;

export const init = () => {
    
const FILES = {
  'readme.txt': 'DARK NIGHT RISES — File Server v2.1\nManaged by SOM Security Labs\n\nThis directory contains mission briefs and public documentation.\nFor internal files, contact your supervisor.',
  'info.txt': 'Server: Apache 2.4.41\nOS: Ubuntu 20.04\nWebroot: /var/www/html\nFiles dir: /var/www/html/files\n\nMaintained by SOM // DNR CTF',
  'mission.txt': 'MISSION BRIEF — DARK NIGHT RISES CTF\nCurrent active challenges: 12\nDifficulty range: EASY to HARD\nCreated by SOM Security Labs\n\nGood luck, operators.',
  '../../../etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nsom:x:1000:1000:SOM Admin:/home/som:/bin/bash\nctf:x:1001:1001:CTF User:/home/ctf:/bin/bash',
  '../../etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nsom:x:1000:1000:SOM Admin:/home/som:/bin/bash',
  '../../../secret/flag.txt': '// DARK NIGHT RISES — SOM SECURITY LABS\n// DIR TRAVERSAL FLAG\n\nFLAG{d1r_tr4v3rs4l_3sc4p3d_s0m}\n\n// Nice work, operator. You escaped the webroot.',
  '../../../../secret/flag.txt': '// DARK NIGHT RISES — SOM SECURITY LABS\n\nFLAG{d1r_tr4v3rs4l_3sc4p3d_s0m}\n\n// CTF by SOM',
  '../secret/flag.txt': '// DARK NIGHT RISES — SOM SECURITY LABS\n\nFLAG{d1r_tr4v3rs4l_3sc4p3d_s0m}',
  '../../secret/flag.txt': '// DARK NIGHT RISES — SOM SECURITY LABS\n\nFLAG{d1r_tr4v3rs4l_3sc4p3d_s0m}',
};

function loadFile(preset) {
  const path = preset || document.getElementById('filepath').value;
  if (preset) document.getElementById('filepath').value = preset;
  const out = document.getElementById('file-output');
  if (FILES[path]) {
    out.style.color = 'var(--text)';
    out.textContent = `// GET /files?file=${path}\n// HTTP 200 OK\n\n` + FILES[path];
    if (path.includes('..')) { out.style.color = '#00ff88'; }
  } else if (path.includes('..')) {
    out.style.color = 'var(--accent2)';
    out.textContent = `// GET /files?file=${path}\n// HTTP 403 Forbidden\n\nPath traversal detected — try a different sequence.\nCommon sequences: ../ ../../ ../../../`;
  } else {
    out.style.color = 'var(--accent2)';
    out.textContent = `// GET /files?file=${path}\n// HTTP 404 Not Found\n\nFile not found: /var/www/html/files/${path}`;
  }
}

const FLAG = "FLAG{d1r_tr4v3rs4l_3sc4p3d_s0m}";
function checkFlag() {
  const input = document.getElementById('flagInput').value.trim();
  const c = document.getElementById('res-correct'), w = document.getElementById('res-wrong');
  c.style.display='none'; w.style.display='none';
  if (input === FLAG) { c.style.display='block'; } else { w.style.display='block'; }
}
document.getElementById('flagInput').addEventListener('keydown', e => { if (e.key==='Enter') checkFlag(); });

};
