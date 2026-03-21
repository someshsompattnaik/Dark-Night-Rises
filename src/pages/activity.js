// src/pages/activity.js
export const template = `
<style>
/* Heatmap Scoped Styles for Batman/Cyber Theme */
.hm-wrapper {
    max-width: 1100px;
    margin: 40px auto;
    font-family: 'Share Tech Mono', monospace;
    color: #a0aec0;
}
.hm-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
}
.hm-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: #fff;
    margin: 0;
    letter-spacing: 2px;
    font-family: 'Orbitron', sans-serif;
}
.hm-title span { color: #00ffe7; text-shadow: 0 0 10px rgba(0, 255, 231, 0.4); }

.hm-form {
    display: flex;
    gap: 12px;
    background: #0d1219;
    padding: 10px;
    border: 1px solid #1a2332;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    align-items: center;
}
.hm-input {
    background: #030508;
    border: 1px solid #1a2332;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
    width: 140px;
}
.hm-input:focus { border-color: #00ffe7; }
.hm-btn {
    background: #00ffe7;
    color: #000;
    border: none;
    padding: 8px 24px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.1s;
    font-family: 'Orbitron', sans-serif;
}
.hm-btn:active { transform: scale(0.95); }

.hm-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}
.hm-stat-card {
    background: #0d1219;
    border: 1px solid #1a2332;
    padding: 24px 16px;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.2s;
}
.hm-stat-card:hover { transform: translateY(-4px); border-color: #00ffe7; }
.hm-stat-card.highlight {
    background: rgba(0, 255, 231, 0.05);
    border-color: rgba(0, 255, 231, 0.3);
}
.hm-stat-title {
    font-size: 0.75rem;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
}
.hm-stat-val {
    font-size: 2rem;
    color: #fff;
    font-weight: 700;
}
.hm-stat-card.highlight .hm-stat-val {
    color: #00ffe7;
    text-shadow: 0 0 10px rgba(0, 255, 231, 0.3);
}

.hm-board {
    background: #0d1219;
    border: 1px solid #1a2332;
    padding: 30px;
    border-radius: 16px;
    overflow-x: auto;
    position: relative;
}
.hm-board-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.hm-board-title { color: #fff; font-weight: bold; font-family: 'Orbitron', sans-serif;}
.hm-select {
    background: #030508;
    color: #a0aec0;
    border: 1px solid #1a2332;
    padding: 4px 12px;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
}

.hm-grid-container {
    display: flex;
    gap: 12px;
    padding-bottom: 10px;
    min-width: max-content;
}
.hm-labels {
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    gap: 6px;
    font-size: 0.7rem;
    color: #4a5568;
    text-align: right;
    padding-right: 8px;
    margin-top: 2px;
}
.hm-labels span { display: flex; align-items: center; height: 14px; }
.hm-labels span.hidden { opacity: 0; }

.hm-cells {
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-auto-flow: column;
    gap: 6px;
}
.hm-cell {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: #141b26;
    border: 1px solid rgba(255,255,255,0.02);
    cursor: crosshair;
    transition: all 0.2s;
    position: relative;
}
.hm-cell:hover {
    transform: scale(1.4);
    z-index: 10;
    border-color: #fff;
}

/* Colors matching the rest of the CTF site */
.hm-c0 { background: #141b26; border-color: rgba(255,255,255,0.02); }
.hm-c1 { background: #013a30; border-color: #014d40; }
.hm-c2 { background: #008f77; border-color: #00a88c; }
.hm-c3 { background: #00ffe7; border-color: #5cffea; box-shadow: 0 0 8px rgba(0,255,231,0.5); }

.hm-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #1a2332;
    font-size: 0.8rem;
    color: #718096;
}
.hm-legend {
    display: flex;
    align-items: center;
    gap: 8px;
}
.hm-legend-box {
    width: 14px; height: 14px; border-radius: 3px;
}
.hm-actions { display: flex; gap: 20px; }
.hm-action-btn {
    background: none; border: none; color: #a0aec0;
    cursor: pointer; transition: color 0.2s; font-family: inherit;
}
.hm-action-btn:hover { color: #fff; }
.hm-action-btn.danger:hover { color: #f56565; }

/* Tooltip floating over DOM */
.hm-tooltip {
    position: absolute;
    background: #000;
    border: 1px solid #1a2332;
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 11px;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, -100%);
    transition: opacity 0.15s;
    z-index: 9999;
    box-shadow: 0 10px 25px rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: inherit;
}
.hm-tooltip.show { opacity: 1; }
.hm-tt-date { color: #00ffe7; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 4px;}
.hm-tt-val { color: #a0aec0; }
</style>

<div class="hm-wrapper">
    <div class="hm-header">
        <div>
            <h1 class="hm-title">ACTIVITY <span>HEATMAP</span></h1>
            <div style="color: #4a6070; margin-top: 4px; font-size: 0.85rem; letter-spacing: 1px;">// TRACK YOUR HACKING & STUDY HOURS</div>
        </div>
        
        <form id="hmForm" class="hm-form">
            <input type="number" id="hmInput" class="hm-input" step="0.5" min="0" placeholder="Hours today?" required>
            <button type="submit" class="hm-btn">LOG</button>
        </form>
    </div>

    <div class="hm-stats">
        <div class="hm-stat-card"><div class="hm-stat-title">Total Hours</div><div class="hm-stat-val" id="stTotal">0.0</div></div>
        <div class="hm-stat-card"><div class="hm-stat-title">Daily Avg</div><div class="hm-stat-val" id="stAvg">0.0h</div></div>
        <div class="hm-stat-card"><div class="hm-stat-title">Last 7 Days</div><div class="hm-stat-val" id="stWeek">0.0h</div></div>
        <div class="hm-stat-card highlight"><div class="hm-stat-title">Current Streak</div><div class="hm-stat-val" id="stCStreak">0 <span style="color:#00ffe7">🔥</span></div></div>
        <div class="hm-stat-card"><div class="hm-stat-title">Longest Streak</div><div class="hm-stat-val" id="stLStreak">0 🚀</div></div>
    </div>

    <div class="hm-board">
        <div class="hm-board-top">
            <div class="hm-board-title">ACTIVITY MATRIX</div>
            <select id="hmFilter" class="hm-select">
                <option value="3">Past 3 Months</option>
                <option value="6">Past 6 Months</option>
                <option value="12" selected>Past Year</option>
            </select>
        </div>

        <div class="hm-grid-container">
            <div class="hm-labels">
                <span>Sun</span><span class="hidden">Mon</span><span>Tue</span><span class="hidden">Wed</span><span>Thu</span><span class="hidden">Fri</span><span>Sat</span>
            </div>
            <div id="hmCells" class="hm-cells">
                <!-- Javascript will populate cells -->
            </div>
        </div>

        <div class="hm-footer">
            <div class="hm-legend">
                <span>Less</span>
                <div class="hm-legend-box hm-c0"></div>
                <div class="hm-legend-box hm-c1"></div>
                <div class="hm-legend-box hm-c2"></div>
                <div class="hm-legend-box hm-c3"></div>
                <span>More</span>
            </div>
            <div class="hm-actions">
                <button id="hmExport" class="hm-action-btn">↓ Export JSON</button>
                <button id="hmReset" class="hm-action-btn danger">× Reset Data</button>
            </div>
        </div>
        
        <!-- Tooltip -->
        <div id="hmTooltip" class="hm-tooltip">
            <div id="hmTtDate" class="hm-tt-date"></div>
            <div id="hmTtVal" class="hm-tt-val"></div>
        </div>
    </div>
</div>
`;

export const init = () => {
    // Utility functions naturally embedded
    const getLocalStr = (dObj) => {
        const y = dObj.getFullYear();
        const m = String(dObj.getMonth() + 1).padStart(2, '0');
        const d = String(dObj.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const getColorClass = (h) => {
        if (!h || h === 0) return 'hm-c0';
        if (h > 0 && h <= 2) return 'hm-c1';
        if (h > 2 && h <= 5) return 'hm-c2';
        return 'hm-c3';
    };

    const generateDays = (monthsBack) => {
        const dList = [];
        const today = new Date();
        const start = new Date();
        start.setMonth(today.getMonth() - monthsBack);

        // Pad back to Sunday
        while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

        // Pad forward to Saturday
        const end = new Date();
        while (end.getDay() !== 6) end.setDate(end.getDate() + 1);

        const curr = new Date(start);
        while (curr <= end) {
            dList.push(getLocalStr(curr));
            curr.setDate(curr.getDate() + 1);
        }
        return dList;
    };

    const calcStats = (dataObj) => {
        const dates = Object.keys(dataObj).filter(d => dataObj[d] > 0).sort();
        let total = 0, cStrk = 0, lStrk = 0, week = 0;
        const today = new Date();
        const weekAgo = new Date(); weekAgo.setDate(today.getDate() - 7);

        dates.forEach(ds => {
            const h = dataObj[ds];
            total += h;
            const d = new Date(ds);
            if (d > weekAgo && d <= today) week += h;
        });

        const setDates = new Set(dates);
        if (dates.length > 0) {
            let tmp = 0;
            const cur = new Date(dates[0]);
            while (cur <= today) {
                if (setDates.has(getLocalStr(cur))) {
                    tmp++; lStrk = Math.max(lStrk, tmp);
                } else tmp = 0;
                cur.setDate(cur.getDate() + 1);
            }

            const trk = new Date();
            const todayStr = getLocalStr(today);
            while (true) {
                const fs = getLocalStr(trk);
                if (setDates.has(fs)) {
                    cStrk++; trk.setDate(trk.getDate() - 1);
                } else if (fs === todayStr) {
                    trk.setDate(trk.getDate() - 1);
                } else break;
            }
        }

        const first = dates.length > 0 ? new Date(dates[0]) : new Date();
        const diffD = Math.max(1, Math.ceil(Math.abs(today - first) / (1000 * 3600 * 24)));
        const avg = dates.length > 0 ? (total / diffD).toFixed(1) : "0.0";

        return { total, cStrk, lStrk, avg, week };
    };

    // State Variables
    let data = JSON.parse(localStorage.getItem('ctfHeatmapData') || '{}');
    let filterMonths = 12;

    // DOM Elements
    const cellsCont = document.getElementById('hmCells');
    const tooltip = document.getElementById('hmTooltip');
    const ttDate = document.getElementById('hmTtDate');
    const ttVal = document.getElementById('hmTtVal');
    const sTotal = document.getElementById('stTotal');
    const sAvg = document.getElementById('stAvg');
    const sWeek = document.getElementById('stWeek');
    const sCStrk = document.getElementById('stCStreak');
    const sLStrk = document.getElementById('stLStreak');

    const updateUI = () => {
        const stats = calcStats(data);
        sTotal.textContent = stats.total.toFixed(1);
        sAvg.textContent = stats.avg + 'h';
        sWeek.textContent = stats.week.toFixed(1) + 'h';
        sCStrk.innerHTML = stats.cStrk + ' <span style="color:#00ffe7"></span>';
        sLStrk.innerHTML = stats.lStrk + ' <span style="color:#a855f7"></span>';

        // Rebuild Board
        const days = generateDays(filterMonths);
        let html = '';
        days.forEach(d => {
            const h = data[d] || 0;
            const color = getColorClass(h);
            html += `<div class="hm-cell ${color}" data-date="${d}" data-val="${h}"></div>`;
        });
        cellsCont.innerHTML = html;

        // Re-attach tooltip listeners to cells
        const cells = cellsCont.querySelectorAll('.hm-cell');
        cells.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const r = e.target.getBoundingClientRect();
                const dText = e.target.getAttribute('data-date');
                const vText = parseFloat(e.target.getAttribute('data-val'));

                ttDate.textContent = dText;
                ttVal.textContent = vText > 0 ? vText + ' hours logged' : 'No activity on this date';

                tooltip.style.left = (r.left + r.width / 2 + window.scrollX) + 'px';
                tooltip.style.top = (r.top + window.scrollY - 8) + 'px';
                tooltip.classList.add('show');
            });
            el.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    };

    // Initialize View
    updateUI();

    // Event Listeners
    document.getElementById('hmForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const inp = document.getElementById('hmInput');
        const h = parseFloat(inp.value);
        if (isNaN(h) || h < 0) return;

        const today = getLocalStr(new Date());
        data[today] = h; // Overwrite current day with latest input just like the react version

        localStorage.setItem('ctfHeatmapData', JSON.stringify(data));
        inp.value = '';
        updateUI();
    });

    document.getElementById('hmFilter').addEventListener('change', (e) => {
        filterMonths = parseInt(e.target.value);
        updateUI();
    });

    document.getElementById('hmExport').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `ctf-activity-${getLocalStr(new Date())}.json`;
        a.click();
    });

    document.getElementById('hmReset').addEventListener('click', () => {
        if (window.confirm('Wipe all activity traces from the mainframe?')) {
            data = {};
            localStorage.removeItem('ctfHeatmapData');
            updateUI();
        }
    });

    // We must manually hide tooltip on router unmount or click away
    window.addEventListener('hashchange', () => {
        if (tooltip) tooltip.classList.remove('show');
    }, { once: true });
};
