# 🎮 Vijo John — Gamified Portfolio

A retro-futuristic, RPG-themed portfolio site for **Vijo John** — *Agentic AI Architect*.
Live data is fetched from the GitHub API on page load.

## Files

| File | Purpose |
|---|---|
| `index.html` | Markup — player profile, lore, quest log, achievements, party invite |
| `styles.css` | Neon RPG/CRT theme — scanlines, glitch text, animated bars |
| `script.js` | Live GitHub fetch + typewriter + clock + Konami easter egg |

## What's live from GitHub

On page load, `script.js` calls the public GitHub API (no auth, cached in `sessionStorage` for 10 min):

- **`/users/VijoJohn`** → avatar image, bio (overrides lore intro if set), public-repo count → `LVL`, follower count → `XP` bar.
- **`/repos/VijoJohn/<slug>`** for each pinned quest → real description, primary language, star/fork counts, "updated Nd ago".

If the API is rate-limited or offline, the static fallback content (already personalized) shows instead.

## Featured quests

1. [mutual-fund-soi-review-agent](https://github.com/VijoJohn/mutual-fund-soi-review-agent) — *Legendary*
2. [nav-break-investigation-agent](https://github.com/VijoJohn/nav-break-investigation-agent) — *Epic*
3. [ai-timesheet-intelligence](https://github.com/VijoJohn/ai-timesheet-intelligence) — *Epic*
4. [agentic-rag-coverletter-app](https://github.com/VijoJohn/agentic-rag-coverletter-app) — *Rare*
5. [enterprise-ethics](https://github.com/VijoJohn/enterprise-ethics) — *Rare*

To swap or reorder: edit the `<a class="quest" data-repo="...">` blocks in `index.html`. The `data-repo` attribute is what the script uses to hit the API.

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Launch portfolio"
git branch -M main
git remote add origin https://github.com/VijoJohn/VijoJohn.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` / `(root)`**.

> Tip: naming the repo `VijoJohn.github.io` serves it at **https://vijojohn.github.io** (root URL, no path prefix).

If you'd rather host it under an existing repo (e.g. `VijoJohn/portfolio`), it'll deploy to `https://vijojohn.github.io/portfolio/` instead — both work.

## Easter egg

Type the Konami code on the page: ↑ ↑ ↓ ↓ ← → ← → B A 🏆
