
export const template = `



<div class="challenge-wrap">
  <div class="breadcrumb"><a href="#/">HOME</a> / <a href="#/challenges">CHALLENGES</a> / LEVEL 04</div>
  <div class="chall-num">// LEVEL 04 OF 12 //</div>
  <div class="chall-badge">
    <span class="badge-diff">EASY</span>
    <span class="badge-pts">75 PTS</span>
    <span class="badge-cat">CRYPTO // ENCODING</span>
  </div>
  <h1>BASE64 MAZE</h1>
  <div class="chall-desc">
    Base64 encoding is not encryption — it's just a data representation. But developers sometimes confuse the two and store sensitive information in "encoded" form thinking it's secure. Don't be fooled by layers. Keep decoding.
    <br><br>
    The flag has been encoded 3 times. Use the decoder tool below to peel the layers and reveal it.
    <span class="hint">// HINT: Decode Layer 1 → paste result → Decode Layer 2 → paste result → Decode Layer 3</span>
  </div>
  <div class="challenge-target">
    <span class="target-label">// ENCODED PAYLOAD — 3 LAYERS //</span>
    <div class="step-indicator">
      <div class="step-dot active" id="step1">1</div>
      <span class="step-arrow">→</span>
      <div class="step-dot" id="step2">2</div>
      <span class="step-arrow">→</span>
      <div class="step-dot" id="step3">3</div>
      <span class="step-arrow">→</span>
      <div class="step-dot" id="stepF">🚩</div>
    </div>
    <div class="layer-label">LAYER 1 (start here)</div>
    <!-- FLAG{b4s364_15_n0t_3ncrypt10n_s0m} encoded 3x -->
    <div class="encoded-box" id="layer1-box">VW10NFFsSXpkR2xPU0UxNlRtcFNaazFVVm1aaWFrSXdXSHBPZFZrelNqVmpTRkY0VFVjMVptTjZRblJtVVQwOQ==</div>
    <div class="decode-area">
      <input type="text" class="decode-input" id="di1" placeholder="Paste encoded string here to decode...">
      <button class="decode-btn" onclick="decode(1)">▶ DECODE BASE64</button>
      <div class="decode-result" id="dr1"></div>
    </div>
    <br>
    <div class="layer-label">LAYER 2</div>
    <div class="decode-area">
      <input type="text" class="decode-input" id="di2" placeholder="Paste Layer 1 result here...">
      <button class="decode-btn" onclick="decode(2)">▶ DECODE BASE64</button>
      <div class="decode-result" id="dr2"></div>
    </div>
    <br>
    <div class="layer-label">LAYER 3 (final)</div>
    <div class="decode-area">
      <input type="text" class="decode-input" id="di3" placeholder="Paste Layer 2 result here...">
      <button class="decode-btn" onclick="decode(3)">▶ DECODE BASE64</button>
      <div class="decode-result" id="dr3"></div>
    </div>
  </div>
  <div class="flag-submit">
    <h3>SUBMIT FLAG</h3>
    <div class="flag-input-row">
      <input type="text" class="flag-input" id="flagInput" placeholder="FLAG{...}" autocomplete="off">
      <button class="flag-btn" onclick="checkFlag()">SUBMIT</button>
    </div>
    <div class="flag-result flag-correct" id="res-correct">✓ CORRECT FLAG! LEVEL 04 COMPLETE — +75 PTS</div>
    <div class="flag-result flag-wrong" id="res-wrong">✗ INCORRECT FLAG — KEEP DECODING</div>
  </div>
  <a href="#/level5" class="next-btn">NEXT CHALLENGE — MEDIUM →</a>
</div>




`;

export const init = () => {
    
function decode(layer) {
  const input = document.getElementById('di' + layer).value.trim();
  const result = document.getElementById('dr' + layer);
  try {
    const decoded = atob(input);
    result.textContent = decoded;
    result.style.display = 'block';
    const step = document.getElementById('step' + layer);
    if (step) { step.classList.add('done'); step.classList.remove('active'); }
    const next = document.getElementById('step' + (layer + 1));
    if (next) next.classList.add('active');
    if (layer === 3 && decoded.startsWith('FLAG{')) {
      result.style.color = 'var(--accent)';
      document.getElementById('stepF').classList.add('done');
      document.getElementById('stepF').textContent = '✓';
    }
  } catch(e) { result.textContent = 'ERROR: Invalid base64 — check your input'; result.style.color = 'var(--accent2)'; result.style.display = 'block'; }
}
const FLAG = "FLAG{b4s364_15_n0t_3ncrypt10n_s0m}";
function checkFlag() {
  const input = document.getElementById('flagInput').value.trim();
  const c = document.getElementById('res-correct'), w = document.getElementById('res-wrong');
  c.style.display = 'none'; w.style.display = 'none';
  if (input === FLAG) { c.style.display = 'block'; } else { w.style.display = 'block'; }
}
document.getElementById('flagInput').addEventListener('keydown', e => { if (e.key === 'Enter') checkFlag(); });

};
