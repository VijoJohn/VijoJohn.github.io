# Vijo John — Executive AI Transformation Portfolio

A professional, single-page portfolio for **Vijo John** — finance transformation
leader building practical Agentic AI systems for the modern CFO office, finance
operations, fund administration, and enterprise controls.

**Live site:** https://vijojohn.github.io

## Overview

The site is a **single self-contained `index.html`** — all CSS lives in an inline
`<style>` block and the only script sets the copyright year. No build step, no
dependencies, no external CSS/JS to load (Inter is the only web font). Just open
the file and it works.

Theme: deep-navy background with gold/blue accents, sticky nav, responsive grid
layouts down to mobile.

### Page sections

| Section | Content |
|---|---|
| **Hero** | Headline, positioning statement (18+ yrs finance + Agentic AI), CTAs, credibility chips, live "Transformation System Online" status card with key metrics |
| **Executive Builder Profile** | "Who I Am" and "What I Build" cards |
| **AI Finance Missions** | 6 project cards, each framed as business problem → AI solution → finance-control opportunity, with tech stack chips and GitHub links |
| **Impact Dashboard** | Business-first outcome metrics (review-reduction %, prototype count, years, CFO focus) |
| **Capability Matrix** | Finance Leadership · Fund Administration · Agentic AI · Enterprise Controls |
| **Contact** | GitHub, LinkedIn, and email CTAs in the footer |

## Featured AI missions

| # | Project | Repo |
|---|---|---|
| 01 | AI Finance OS | [AI_FINANCE_OS_PRODUCTION](https://github.com/VijoJohn/AI_FINANCE_OS_PRODUCTION) |
| 02 | NAV Break Investigation Agent | [nav-break-investigation-agent](https://github.com/VijoJohn/nav-break-investigation-agent) |
| 03 | SOI Review Agent | [mutual-fund-soi-review-agent](https://github.com/VijoJohn/mutual-fund-soi-review-agent) |
| 04 | Timesheet Intelligence | [ai-timesheet-intelligence](https://github.com/VijoJohn/ai-timesheet-intelligence) |
| 05 | Agentic RAG Cover Letter App | [agentic-rag-coverletter-app](https://github.com/VijoJohn/agentic-rag-coverletter-app) |
| 06 | Enterprise Ethics | [enterprise-ethics](https://github.com/VijoJohn/enterprise-ethics) |

`resume.pdf` is served directly from the **Download Resume** button in the hero.

## Editing

Everything is in `index.html`:

- **Copy / metrics** — edit the relevant section markup directly.
- **Missions** — duplicate or edit an `<article class="card mission">` block; update
  the `<h3>`, description, `.stack` chips, and the GitHub `href`.
- **Theme colors** — change the CSS custom properties in `:root { ... }` at the top
  of the inline `<style>` block (`--accent`, `--blue`, `--bg`, etc.).
- **Resume** — replace `resume.pdf` in this folder (keep the filename).

## Resume download gate (Formspree)

The **Download Resume** button opens a modal asking for the visitor's name +
email before the download starts, and notifies you by email on every download.

**One-time setup (required for notifications):**

1. Sign up free at <https://formspree.io> (free tier = 50 submissions/month).
2. Create a new form; copy its endpoint — it looks like
   `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find this line in the inline `<script>` and paste your
   endpoint in place of the placeholder:

   ```js
   var FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // <-- REPLACE THIS
   ```

4. Commit + push. On the **first** real submission, Formspree emails you a
   one-time confirmation link — click it to activate notifications.

**Behaviour:**

- Until the endpoint is configured, the modal still appears and the download
  still works — you just won't get notified (a console warning is logged).
- This is a **soft gate**: it captures leads and notifies you, but because the
  site is static and public, the raw `resume.pdf` URL is still directly
  reachable by anyone who guesses it. True hard-blocking would require a
  serverless backend (out of scope for GitHub Pages).
- If JavaScript is disabled, the link falls back to opening `resume.pdf`
  directly (graceful degradation).

## Files

| File | Status |
|---|---|
| `index.html` | The entire site (self-contained) |
| `resume.pdf` | Linked from the hero "Download Resume" button |
| `README.md` | This file |
| `.gitignore` | Excludes OS/editor junk, `*.log`, `.env*`, `node_modules/` |

## Deploy (GitHub Pages)

Already configured. To publish updates:

```bash
git add -A
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages serves the repo (`VijoJohn/VijoJohn.github.io`) at the root URL:
**https://vijojohn.github.io**

> First-time setup only: in the repo, **Settings → Pages → Source: `main` / `(root)`**.
