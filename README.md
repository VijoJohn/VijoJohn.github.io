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

## Files

| File | Status |
|---|---|
| `index.html` | The entire site (self-contained) |
| `resume.pdf` | Linked from the hero "Download Resume" button |
| `README.md` | This file |
| `.gitignore` | Excludes OS/editor junk, `*.log`, `.env*`, `node_modules/` |
| `styles.css`, `script.js` | **Legacy / unused** — leftovers from an earlier gamified version, no longer referenced by `index.html`. Safe to delete. |

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
