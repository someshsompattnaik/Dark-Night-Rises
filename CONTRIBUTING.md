# Contributing to Dark Night Rises CTF

Thanks for your interest in contributing! Here's how to get involved.

## Ways to Contribute

- 🐛 **Bug reports** — something broken? Open an issue
- 💡 **New challenge ideas** — suggest a vulnerability class
- 🎨 **UI improvements** — better visuals, animations, accessibility
- 📚 **Documentation** — clearer hints, better explanations
- 🌐 **Translations** — port the platform to other languages

## Adding a New Challenge

1. Copy an existing challenge module (e.g. `src/pages/challenges/level5.js`) as a template
2. Keep the same structure: export a `template` string and an `init()` function with your logic
3. Add your challenge to the grid in `src/pages/challenges.js`
4. Register the new route hash mapping in `src/main.js`
5. Follow the flag format: `FLAG{your_flag_here}`
6. Submit a pull request with a description of the vulnerability being taught

## Code Style

- Vanilla JS Modules with Vite — no heavyweight frameworks (React/Vue/Angular)
- CSS variables for all colours (defined in `:root` inside `src/style.css`)
- Share Tech Mono for code/terminal elements, Orbitron for headings
- Dark theme only — background `#030508`, accent `#00ffe7`

## Ground Rules

- All challenges must be **purely educational** and simulate vulnerabilities in-browser only
- No real exploits against live systems
- Keep it beginner-friendly — every challenge should have a hint path

## Reporting Issues

Open a GitHub Issue with:
- Which challenge/page is affected
- What browser and OS you're using
- Steps to reproduce the problem
