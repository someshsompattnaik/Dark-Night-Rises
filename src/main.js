// SPA Router mapping hash paths to dynamic page component imports
const routes = {
    '/': 'index',
    '/challenges': 'challenges',
    '/scoreboard': 'scoreboard',
    '/rules': 'rules',
    '/login': 'login',
    '/level1': 'level1',
    '/level2': 'level2',
    '/level3': 'level3',
    '/level4': 'level4',
    '/level5': 'level5',
    '/level6': 'level6',
    '/level7': 'level7',
    '/level8': 'level8',
    '/level9': 'level9',
    '/level10': 'level10',
    '/level11': 'level11',
    '/level12': 'level12'
};

const appDiv = document.getElementById('app');

// Clean up logic from previous pages if they set global intervals
let activeIntervals = [];
window.registerInterval = (fn, ms) => {
    const id = setInterval(fn, ms);
    activeIntervals.push(id);
    return id;
};

const cleanup = () => {
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];
};

const router = async () => {
    cleanup();
    let hash = window.location.hash.slice(1);
    if (!hash) hash = '/';
    
    // update active nav links
    document.querySelectorAll('.route-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + hash) {
            link.classList.add('active');
        }
    });

    const pageName = routes[hash] || 'index';
    
    try {
        let pageModule;
        if (pageName.startsWith('level')) {
            pageModule = await import(`./pages/challenges/${pageName}.js`);
        } else {
            pageModule = await import(`./pages/${pageName}.js`);
        }
        appDiv.innerHTML = pageModule.template;
        if (typeof pageModule.init === 'function') {
            // Need to wrap intervals nicely if the page uses raw setInterval
            const originalSetInterval = window.setInterval;
            window.setInterval = window.registerInterval;
            try {
                pageModule.init();
            } catch (e) {
                console.error("Error executing page init script:", e);
            } finally {
                window.setInterval = originalSetInterval;
            }
        }
    } catch (err) {
        console.error("Failed to load route:", err);
        appDiv.innerHTML = `<div style="text-align: center; margin-top: 100px; color: red;"><h1>404 NOT FOUND</h1><p>${err.message}</p></div>`;
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Global Setup: Matrix background (run only once globally instead of per-page)
const initGlobalMatrix = () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const fontSize = 14;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array(cols).fill(1);
    
    // Re-initialize drops if screen grows
    window.addEventListener('resize', () => {
        const newCols = Math.floor(canvas.width / fontSize);
        if (newCols > cols) {
            drops = drops.concat(Array(newCols - cols).fill(1));
        }
        cols = newCols;
    });

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01ABCDEF0123456789!@#$%^&*';
    
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
};

// Start the global background animation
initGlobalMatrix();
