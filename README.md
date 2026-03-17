<div align="center">

```
██████╗  █████╗ ██████╗ ██╗  ██╗    ███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗
██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝    ████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝
██║  ██║███████║██████╔╝█████╔╝     ██╔██╗ ██║██║██║  ███╗███████║   ██║   
██║  ██║██╔══██║██╔══██╗██╔═██╗     ██║╚██╗██║██║██║   ██║██╔══██║   ██║   
██████╔╝██║  ██║██║  ██║██║  ██╗    ██║ ╚████║██║╚██████╔╝██║  ██║   ██║   
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
                         ██████╗ ██╗███████╗███████╗███████╗
                         ██╔══██╗██║██╔════╝██╔════╝██╔════╝
                         ██████╔╝██║███████╗█████╗  ███████╗
                         ██╔══██╗██║╚════██║██╔══╝  ╚════██║
                         ██║  ██║██║███████║███████╗███████║
                         ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝
```

# 🌑 DARK NIGHT RISES CTF

### A fully-featured, browser-based Capture The Flag hacking platform

**Created by SOM** · 12 Challenges · 2375 Points · Zero Dependencies · Pure HTML/CSS/JS

---

![Challenges](https://img.shields.io/badge/Challenges-12-00ffe7?style=for-the-badge&logo=target&logoColor=black)
![Points](https://img.shields.io/badge/Total%20Points-2375-ff003c?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Vite%20SPA-00ff41?style=for-the-badge&logo=vite&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-ffb800?style=for-the-badge)
![Made With](https://img.shields.io/badge/Made%20With-Vanilla%20JS-0d1520?style=for-the-badge)

</div>

---

## 🎯 What is this?

**Dark Night Rises** is a self-contained, educational Capture The Flag (CTF) cybersecurity platform. It runs completely locally in your browser as a blazing fast Single Page Application (SPA) powered by Vite.

It simulates **12 real-world web vulnerabilities** in a safe, legal, sandboxed environment. Each challenge teaches one exploitation technique, from beginner reconnaissance to advanced cryptographic attacks.

> ⚠️ **All vulnerabilities are simulated in-browser. This platform does not attack any real server.**

---

## 🚀 Quick Start

### Prerequisites
You will need [Node.js](https://nodejs.org/) installed to run the build pipeline and development server.

### Local Development Server
```bash
git clone https://github.com/someshsompattnaik/dark-night-rises-ctf.git
cd dark-night-rises-ctf
npm install
npm run dev
```
Open → **http://localhost:5173**

### Production Build
To generate a heavily minified, heavily optimized set of static assets ready for deployment on any static file host (like GitHub Pages, Netlify, or AWS S3):
```bash
npm run build
```
This will output the compiled application into a `dist/` directory. You can test the compiled production version locally using:
```bash
npm run preview
```

---

## 🗂️ Repository Structure

```text
dark-night-rises-ctf/
│
├── index.html              ← Main SPA shell container
├── package.json            ← Dependencies and scripts (Vite)
├── vite.config.js          ← (Optional) Build compilation config
│
├── src/
│   ├── main.js             ← Client-side hash router logic
│   ├── style.css           ← Centralized global CSS stylesheet
│   │
│   └── pages/              ← Dynamic page module components
│       ├── index.js        
│       ├── login.js        
│       ├── challenges.js   
│       ├── scoreboard.js   
│       ├── rules.js        
│       │
│       └── challenges/     ← Vulnerability challenge modules
│           ├── level1.js   ← Hidden in Source Code       [Easy   · 50pts]
│           ├── level2.js   ← Cookie Monster              [Easy   · 75pts]
│           ├── level5.js   ← SQL Injection               [Medium · 150pts]
│           └── ... (levels 1 through 12)
```

---

## 🧩 Challenge Overview

| # | Challenge | Difficulty | Points | Technique |
|---|-----------|:----------:|:------:|-----------|
| 01 | Hidden in Source Code | 🟢 Easy | 50 | HTML comment inspection |
| 02 | Cookie Monster | 🟢 Easy | 75 | Browser cookie manipulation |
| 03 | Robots.txt Exposed | 🟢 Easy | 50 | Robots.txt recon |
| 04 | Base64 Maze | 🟢 Easy | 75 | Multi-layer Base64 decoding |
| 05 | SQL Injection | 🟡 Medium | 150 | Classic SQLi login bypass |
| 06 | XSS Injection | 🟡 Medium | 150 | DOM-based Cross-Site Scripting |
| 07 | Directory Traversal | 🟡 Medium | 175 | Path traversal (`../`) |
| 08 | JWT Forgery | 🟡 Medium | 200 | JWT `alg:none` bypass |
| 09 | Broken Auth Chain | 🔴 Hard | 300 | Multi-step auth logic flaw |
| 10 | SSRF Attack | 🔴 Hard | 300 | Server-Side Request Forgery |
| 11 | IDOR Escalation | 🔴 Hard | 350 | Insecure Direct Object Reference |
| 12 | The Final Cipher | 🔴 Hard | 500 | AES-ECB pattern exploitation |
| | **TOTAL** | | **2375** | |

---

## 🖥️ Platform Features

- **Vite SPA Architecture** — seamlessly fast client-side navigation via Javascript modules.
- **Matrix rain** background with animated canvas
- **12 interactive challenge pages** — cleanly code-split dynamically.
- **Simulated terminals**, query panels, network logs, and API explorers
- **Flag submission with success overlays** on every challenge
- **Live scoreboard** with countdown timer and podium display
- **Challenge filter** by difficulty and category
- **Zero backend** — everything runs natively in the browser
- **Dark hacker aesthetic** — Orbitron + Share Tech Mono fonts, cyan/red/amber palette

---

## 🛡️ Vulnerability Categories Covered

```
Recon          →  HTML source inspection, robots.txt enumeration
Encoding       →  Base64 (encoding ≠ encryption)
Injection      →  SQL Injection, XSS (DOM-based)
Path Security  →  Directory / Path Traversal
Authentication →  Cookie auth, JWT algorithm confusion, broken auth chains
Access Control →  IDOR (Insecure Direct Object Reference)
Server-Side    →  SSRF (Server-Side Request Forgery)
Cryptography   →  AES-ECB block pattern analysis
```

---

## 📋 Rules Summary

- Flags follow the format: `FLAG{...}`
- Attack only the challenge pages — not external systems
- Do not share flags with other participants
- Tools like Burp Suite, browser DevTools, and CyberChef are allowed
- Maximum total score: **2375 points**

Full rules: [`rules.html`](rules.html)

---

## 🏆 Scoring

| Difficulty | Challenges | Points Each | Total |
|:----------:|:----------:|:-----------:|:-----:|
| 🟢 Easy | 4 | 50–75 | 250 |
| 🟡 Medium | 4 | 150–200 | 675 |
| 🔴 Hard | 4 | 300–500 | 1450 |
| | **12** | | **2375** |

---

## 🔧 Customisation

Want to fork and modify this for your own event?

1. **Change flags** — search for `FLAG{` in each component file (`src/pages/*.js`) and replace with your own values
2. **Change branding** — update `DARK NIGHT RISES` and `SOM` references in the global `index.html` and components.
3. **Add challenges** — define a new module component in `src/pages/challenges/`, register its path in the `src/main.js` router `routes` object, and link it in the `src/pages/challenges.js` grid.
4. **Timer** — update the countdown initial value in the `src/pages/scoreboard.js` initialization script.
5. **Leaderboard** — edit the `players` array layout logic in `src/pages/scoreboard.js` with real participant data.

---

## 📚 Learning Resources

Each challenge teaches a real OWASP vulnerability class. To learn more:

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — free labs
- [CyberChef](https://gchq.github.io/CyberChef/) — encoding/decoding tool
- [HackTheBox](https://www.hackthebox.com/) — advanced CTF practice
- [TryHackMe](https://tryhackme.com/) — beginner-friendly rooms

---

## ⚠️ Disclaimer

This platform is for **educational purposes only**. All vulnerabilities are simulated entirely in the browser. No real servers, databases, or networks are attacked. Use the techniques you learn here only on systems you own or have explicit permission to test.

---

## 📄 License

MIT License — free to use, fork, and modify. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

**Built with ❤️ and lots of `FLAG{...}` by SOM**

*Dark Night Rises · CTF Platform · Educational Use Only*

⭐ Star this repo if it helped you learn!

</div>
