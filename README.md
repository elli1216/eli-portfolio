<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Eli's Portfolio

A modern, minimalist multi-page portfolio for **Darl Ellison Floresca (Eli)** — a
software engineer and full-stack developer. Built with React Router v7 for smooth
navigation between dedicated pages, featuring a clean design inspired by Bryl Lim's
aesthetic with numbered section progression (01–07).

## Highlights

- **Multi-page routing architecture** — React Router v7 with dedicated routes for each section:
  - `/` — Home (hero with CTA buttons)
  - `/about` — About (01) - Profile and introduction
  - `/experience` — Experience (02) - Timeline of roles with company logos
  - `/projects` — Projects (03) - **Horizontal carousel slider** showcasing featured work
  - `/skills` — Skills (04) - Tech stack with dynamic icons
  - `/certificates` — Certificates (05) - Credential gallery
  - `/contact` — Contact (06) - Contact form and social links
  - `/chat` — Ask AI (07) - Nova assistant chat interface

- **Projects as horizontal carousel** — Browse projects via smooth slide navigation:
  - Previous/Next arrow navigation
  - Dot indicators for quick selection
  - Full-width slides on mobile, 2-column on desktop
  - Compact card design with image, tech stack, and links

- **Minimalist modern design**:
  - Clean, spacious layout with ample whitespace
  - Numbered section headers (01, 02, etc.) for visual continuity
  - Monochromatic with selective accent colors
  - Smooth page transitions and animations
  - No terminal UI or unnecessary chrome

- **Rich project showcase**:
  - Full project descriptions with problem statements
  - Architecture breakdowns for technical projects
  - Key features and results metrics
  - Tech stack badges and links (Demo, Repository)
  - Dynamic company logos via logo.dev API
  - Tech stack icons via devicons CDN

- **AI assistant** — "Ask AI" section with Nova, a Gemini-powered chatbot:
  - Clean, minimalist chat interface
  - Suggestion prompts for first-time visitors
  - Queries about background, projects, skills, and contact
  - Accessible from the dedicated `/chat` route

- **Theme + accent controls** — Light/dark mode and six accent colors (green,
  blue, red, orange, purple, gray), both persisted to `localStorage`.

- **Responsive design** — Mobile-first approach:
  - Hamburger menu navigation on mobile
  - Adaptive layouts for all screen sizes
  - Touch-friendly controls and spacing
  - Smooth scrolling between sections

- **Back-to-top button** — Fades in after scrolling, smooth scroll to top.

- **Smooth animations** — Entrance animations for page elements, carousel transitions.

- Respects `prefers-reduced-motion` via `MotionConfig`.

## Tech stack

- **React 19** + **TypeScript**
- **React Router v7** for multi-page navigation
- **Vite 6** (build tooling; dev server on port `3000`)
- **Tailwind CSS v4** (`@tailwindcss/vite`), `tw-animate-css`
- **Framer Motion** for animations
- **embla-carousel** for smooth project carousel
- **Lucide icons** and **devicons CDN** for icons
- **@google/generative-ai** for the Nova AI assistant
- **logo.dev API** for dynamic company logos

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
   # Server-side key for the Nova AI assistant
   GEMINI_API_KEY=your_gemini_api_key

   # Optional — company logos in the Experience section
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
├─ App.tsx               React Router setup with layout wrapper
├─ index.tsx             React entry point
├─ routes.tsx            Route definitions for all pages
├─ globals.css           Tailwind v4 theme, accent variables, typography
├─ components/
│  ├─ layout/            Navbar, Footer, Layout, BackToTop
│  ├─ home/              Hero, HeroContent, NotFound
│  ├─ shared/            Shared UI (SectionHeader, NovaMarkdown, TextType, …)
│  └─ ui/                Generic UI primitives (shadcn components)
├─ pages/                Page components (Home, About, Experience, Projects, Skills, Certificates, Contact, Chat)
├─ contexts/             Theme + accent providers
├─ constants/constants.ts  Portfolio content (experience, projects, skills, certificates)
└─ types/types.ts        Shared TypeScript types
```

Content (experience, projects, skills, certificates, contact) lives in
`src/constants/constants.ts`.

## Deployment

The project is set up to deploy on **Vercel** (`vercel.json` rewrites all routes
to `index.html`, and `api/` is served as serverless functions). Set the
`GEMINI_API_KEY` environment variable in your hosting provider so the Nova
assistant works in production.

## Recent changes

The portfolio has been redesigned from a single-page terminal-themed site to a **modern, multi-page architecture**:

- **Switched to React Router v7** — Dedicated routes for each section instead of hash navigation on a single page.
- **Removed all terminal UI** — No floating terminal bar, terminal prompts, or command system. Clean, minimalist interface.
- **Projects carousel** — Horizontal slider carousel for browsing projects instead of a scrolling list.
- **Improved visual design** — Minimalist aesthetic inspired by Bryl Lim, with numbered sections (01–07) and better typography.
- **Enhanced project showcase** — Rich project cards with architecture, features, results metrics, and tech stack.
- **Dynamic company logos** — Integrated logo.dev API for company logos in the Experience section.
- **Dynamic tech icons** — Skill icons loaded from devicons CDN for accurate technology representations.
- **Redesigned chat interface** — Clean, modern Nova AI chat without terminal styling.
- **Code cleanup** — Removed ~4,300 lines of unused terminal and old component code, reducing bundle size by 19%.
- **Better performance** — Optimized bundle, removed unnecessary dependencies, cleaner architecture.

## Browser support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Respects system dark mode preference
