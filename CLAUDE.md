# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A modern, minimalist multi-page portfolio for Darl Ellison Floresca — a BSIT graduate and Custom Software Engineer at Accenture. Built with React 19, TypeScript, Vite, Tailwind CSS v4, and React Router v7. Features a horizontal carousel for projects, dynamic company logos via logo.dev API, and a Gemini AI chat assistant (Nova).

## Commands

```bash
pnpm run dev        # Dev server on http://localhost:3000
pnpm run build      # Production build → dist/
pnpm run preview    # Preview production build locally
```

No lint, typecheck, or test scripts are configured. Prettier is available via IDE integration (100 char width, 2-space tabs, single quotes, semicolons).

## Environment Variables

Set in `.env.local` (gitignored):

- `GEMINI_API_KEY` — Required for the Nova AI chat assistant. Injected into `process.env` via Vite `define` in `vite.config.ts`.
- `VITE_LOGO_DEV_PUBLIC_KEY` — Used for company logos in the Experience section. Accessed via `import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY`.

## Architecture

### Multi-Page Routing (React Router v7)

The application uses React Router v7 for multi-page navigation instead of a single-page hash-based approach:

- Routes defined in `src/routes.tsx`
- Layout wrapper in `src/components/layout/Layout.tsx` provides consistent header/footer across all pages
- Each page is a dedicated component in `src/pages/`
- Smooth page transitions with Framer Motion

### Routes

```
/ → Home (hero with CTA)
/about → About (01) - Profile and bio
/experience → Experience (02) - Timeline with company logos
/projects → Projects (03) - Carousel slider
/skills → Skills (04) - Tech stack with icons
/certificates → Certificates (05) - Credential gallery
/contact → Contact (06) - Contact form
/chat → Chat (07) - Nova AI assistant
```

### Component Organization

```
src/
├── pages/                 # Route components (one per route)
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ExperiencePage.tsx
│   ├── ProjectsPage.tsx
│   ├── SkillsPage.tsx
│   ├── CertificatesPage.tsx
│   ├── ContactPage.tsx
│   └── ChatPage.tsx
├── components/
│   ├── layout/            # Global layout: Navbar, Footer, Layout, BackToTop
│   ├── home/              # Home page components: Hero, HeroContent
│   ├── shared/            # Reusable: SectionHeader, NovaMarkdown, TextType
│   └── ui/                # shadcn components (buttons, etc.)
├── routes.tsx             # Route definitions
├── contexts/              # ThemeContext, AccentContext
├── constants/constants.ts # All data: experience, projects, skills, certificates
├── types/types.ts         # TypeScript interfaces
└── globals.css            # Tailwind theme, accent variables, typography
```

### Data Separation

All portfolio content lives in `src/constants/constants.ts`. Page components are purely presentational — they consume data from constants via props or hooks. When adding or updating portfolio content, edit `constants.ts`, not the components.

### Theming System

Two independent contexts, both persisted to `localStorage`:

- **ThemeContext** — Dark/light mode via `.dark` class on `<html>`. Defaults to system preference.
- **AccentContext** — Six accent colors applied as `.accent-*` class on `<html>`. Defaults to green.

Custom CSS variables in `globals.css` use these classes to define accent-aware colors.

### Animation Stack

- **Framer Motion** — Component enter/exit animations, page transitions, staggered reveals
- **embla-carousel** — Smooth project carousel with keyboard and touch support
- **Lenis** (optional) — Smooth scrolling between pages

### Carousel (Projects Page)

Projects showcase uses `embla-carousel` with:

- Horizontal slide navigation
- Previous/Next buttons (disabled when at start/end)
- Dot indicators for quick selection
- Touch gestures on mobile
- Full-width on mobile, 2-column layout on desktop
- Smooth, performant transitions

### External APIs

1. **logo.dev** — Fetches company logos dynamically in Experience section
   - API key via `VITE_LOGO_DEV_PUBLIC_KEY` env var
   - URL pattern: `https://api.logo.dev/logo?domain=accenture.com&apikey=YOUR_KEY`
   - Graceful fallback if logo fails to load

2. **devicons CDN** (jsDelivr) — Tech stack icons in Skills section
   - Icons loaded from `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/`
   - Normalized tech names to icon paths
   - Fallback on load failure

3. **Gemini API** — Nova AI chat assistant
   - Endpoint: `/api/chat` (serverless function)
   - Rate-limited: 5 messages/minute per IP
   - System instructions and tool definitions in `api/utils.ts`

### Path Aliases

`@/*` maps to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`). Always use `@/` imports rather than relative paths.

### Build Configuration

- Vite with `@vitejs/plugin-react` and `@tailwindcss/vite`
- `tech-stack-icons` isolated into its own chunk for code splitting
- `vercel.json` rewrites all routes to `index.html` for SPA support

## Code Conventions

- **Single Responsibility**: One export per file. Split complex functions into atomic units.
- **Logic/UI Separation**: State management and calculations stay out of UI components. Pass data via props or hooks.
- **Modularity**: Reusable utilities go in `src/lib/`. Avoid large files.
- **TypeScript**: All new code in TypeScript. Types in `src/types/types.ts`.
- **Styling**: Tailwind CSS v4 utility classes. Custom CSS only in `globals.css`. Use `cn()` from `@/lib/utils` for conditional class merging.
- **Minimalism**: No unnecessary abstractions or premature optimizations. Keep it simple.

## Removed Features

The portfolio no longer uses:

- Terminal UI (floating command bar, terminal prompts, command system)
- Single-page hash navigation
- Old "sections" component architecture
- Terminal-themed styling
- ASCII art backgrounds
- Terminal buttons and badges

All removed code (~4,300 lines) has been deleted to keep the codebase clean.

## Recent Improvements

- **Multi-page routing** — React Router v7 for dedicated pages
- **Carousel projects** — embla-carousel for smooth browsing
- **Dynamic logos** — logo.dev API integration
- **Dynamic icons** — devicons CDN for tech stack
- **Minimalist design** — Inspired by Bryl Lim, numbered sections (01–07)
- **Code cleanup** — Removed terminal system and old components
- **Better performance** — 19% CSS bundle reduction
- **Enhanced semantics** — Clear page components, no cryptic section wrappers

## Next Steps for Contributors

When making changes:

1. **Adding content** → Edit `src/constants/constants.ts`
2. **Styling changes** → Use Tailwind utilities, custom CSS in `globals.css` only
3. **New components** → Keep one export per file, use `@/` imports
4. **Pages** → Add new routes in `src/routes.tsx`, create page component in `src/pages/`
5. **Types** → Add TypeScript types to `src/types/types.ts`
6. **Testing** → Run `pnpm run build` to verify no errors, test pages in dev server
