<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Eli's Portfolio

A terminal-themed, single-page portfolio for **Darl Ellison Floresca (Eli)** — a
software engineer and full-stack developer. The whole site is one scrolling page,
and an interactive command bar pinned to the bottom lets visitors navigate and
run terminal commands from anywhere.

View your app in AI Studio: https://ai.studio/apps/drive/1zMTnyF3eRWAh7tYMmDlX1pU0bZHi9gJP

## Highlights

- **Single scrolling page** with themed sections — Hero, About, Experience,
  Skills, Projects, Certificates, Ask AI, Contact — each introduced by its own
  terminal command prompt (e.g. `eli@portfolio:~$ experience`).
- **Floating command bar** pinned to the bottom of the viewport:
  - Typing a section command (or one of its aliases) smooth-scrolls to that
    section — e.g. `experience`, `projects`, `contact`.
  - Any other command (or a section command **with arguments**, e.g.
    `experience 2`) prints into a collapsible output drawer above the input.
  - Quick-command chips, command history, autocomplete, `Escape` to collapse the
    drawer, and a clear button.
  - Appears once roughly half of the hero has been scrolled past, with a
    spring slide/fade animation on enter and exit.
- **AI assistant** — an "Ask AI" section hosts a Claude-Code-style chat panel
  ("Nova") that answers questions about Eli. It talks to a Gemini-powered
  assistant through the serverless API route (`api/chat.ts`), which retrieves
  portfolio data via function calls. The same assistant is also available from
  the terminal via `nova <question>`.
- **Theme + accent controls** — light/dark mode and six accent colors (green,
  blue, red, orange, purple, gray), both persisted to `localStorage`.
- **Responsive navigation** — full section links on desktop and an animated
  hamburger menu on mobile.
- **Back-to-top button** that fades in after you scroll past the first screen.
- **Expandable project cards** — descriptions are clamped with a
  `read more` / `show less` toggle that only appears when the text overflows.
- Respects `prefers-reduced-motion` via `MotionConfig`.

## Terminal commands

Type these into the floating bar. Bare section commands navigate; everything else
renders in the output drawer.

| Command | Aliases | What it does |
| --- | --- | --- |
| `about` | `me`, `info`, `profile` | Jump to the About section |
| `experience` | `exp`, `career`, `work` | Jump to Experience (add an index, e.g. `experience 2`, for details) |
| `skills` | `stack`, `tech`, `toolchain` | Jump to Skills |
| `projects` | `proj`, `portfolio` | Jump to Projects |
| `certificates` | `certs`, `badges` | Jump to Certificates |
| `nova` | `ai`, `ask`, `chat` | Jump to the Ask AI section (chat with Nova) |
| `contact` | `reach`, `connect`, `socials` | Jump to Contact |
| `whoami`, `neofetch` | — | Profile summary / system-style info card |
| `resume` | `cv`, `view-cv` | Open the résumé PDF |
| `cat` | `more` | Read a data file: `cat aboutme.yaml`, `cat projects.json`, `cat readme`, … |
| `ls` | — | List the readable data files |
| `stats`, `achievements`, `timeline`, `compare` | various | GitHub activity, awards, career timeline, project matrix |
| `nova <question>` | `ai`, `ask`, `ellai` | Answer in the drawer instead of navigating (`nova-reset` to clear) |
| `github`, `linkedin`, `email` | `in`, `mail` | Open the corresponding profile |
| `echo`, `history`, `clear` | `hist`, `cls` | Standard terminal utilities |
| `help` | `?`, `man`, `--help` | List all commands |

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** (build tooling; dev server on port `3000`)
- **Tailwind CSS v4** (`@tailwindcss/vite`), `tw-animate-css`
- **Motion** (`motion` / `framer-motion`) and **GSAP** for animation
- **lucide-react** and **tech-stack-icons** for icons
- **@google/generative-ai** for the `nova` assistant (serverless API route)

## Getting started

**Prerequisites:** Node.js 18 or newer and [pnpm](https://pnpm.io) (a
`pnpm-lock.yaml` is committed). npm/yarn work too, but pnpm is what the lockfile
targets.

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env.local` file (it is gitignored) with:

   ```dotenv
   # Server-side key for the `nova` AI assistant (also injected into the client
   # via Vite's `define` in vite.config.ts)
   GEMINI_API_KEY=your_gemini_api_key

   # Optional — company logos in the Experience section (see .env.example)
   VITE_LOGO_DEV_PUBLIC_KEY=your_logo_dev_public_key
   ```

   Client-exposed variables must be prefixed with `VITE_`.

3. Start the dev server:

   ```bash
   pnpm run dev
   ```

   The app runs at http://localhost:3000.

## Available scripts

| Script | Description |
| --- | --- |
| `pnpm run dev` | Start the Vite dev server on port 3000 |
| `pnpm run build` | Production build (outputs to `dist/`) |
| `pnpm run preview` | Preview the production build locally |

> There is no dedicated lint / typecheck / test script. Types are stripped by
> Vite without checking, so run `tsc --noEmit` separately if you need a type
> check.

## Project structure

```
api/                     Serverless functions (Gemini chat endpoint)
public/                  Static assets (résumé PDF, favicon, …)
src/
├─ App.tsx               Single-page composition
├─ index.tsx             React entry point
├─ globals.css           Tailwind v4 theme, accent variables, terminal styles
├─ components/
│  ├─ layout/            Navbar, Footer, FloatingTerminal, BackToTop
│  ├─ home/              Hero, HeroContent, NotFound
│  ├─ sections/          About / Experience / Skills / Projects / Certificates / Ask AI / Contact
│  ├─ shared/            Shared UI (terminal primitives, NovaMarkdown, TextType, …)
│  └─ ui/                Generic UI primitives
├─ contexts/             Theme + accent providers
├─ terminal/             Command engine (parser, registry, hooks, output blocks)
├─ constants/constants.ts  Portfolio content + SECTIONS / NAV_ITEMS
└─ types/types.ts        Shared TypeScript types
```

Content (experience, projects, skills, certificates, contact) lives in
`src/constants/constants.ts`.

## Deployment

The project is set up to deploy on **Vercel** (`vercel.json` rewrites all routes
to `index.html`, and `api/` is served as serverless functions). Set the
`GEMINI_API_KEY` environment variable in your hosting provider so the `nova`
assistant works in production.

## Recent changes

This README was refreshed to match the current single-page redesign:

- Consolidated the site into a **single scrolling page**; sections now render as
  normal page content instead of terminal-window cards, each led by its command.
- Introduced the **floating command bar** with the hybrid navigate/output-drawer
  behavior, and removed the old full-screen terminal emulator.
- The bar now appears after **half of the hero** is scrolled, with enter/exit
  animations.
- Added a **responsive mobile menu**, a **back-to-top button**, and
  **expandable project descriptions**.
- Added an **"Ask AI" section** — a Claude-Code-style chat panel for the Nova
  assistant — and extracted the shared Markdown renderer (`NovaMarkdown`).
- Switched to a **plain background** and removed the custom cursor.
- Fixed mobile overflow in the Certificates and Contact sections.
