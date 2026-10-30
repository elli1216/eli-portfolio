# AGENTS.md

## Dev Commands

- `pnpm run dev` — Start dev server on port 3000
- `pnpm run build` — Production build (outputs to `dist/`)
- `pnpm run preview` — Preview production build locally

No lint, typecheck, or test scripts are configured.

## Environment

- Requires `GEMINI_API_KEY` in `.env.local` for Nova AI assistant
- Requires `VITE_LOGO_DEV_PUBLIC_KEY` in `.env.local` for company logos in Experience section
- Vite injects `GEMINI_API_KEY` into `process.env.GEMINI_API_KEY` via `define` in `vite.config.ts`
- Client-side env vars must be prefixed with `VITE_` (e.g., `VITE_LOGO_DEV_PUBLIC_KEY`) and accessed via `import.meta.env.VITE_*`
- Do not commit `.env.local` — it's gitignored as `*.local`

## Routing

- **React Router v7** handles all page navigation
- Routes defined in `src/routes.tsx`
- Layout wrapper in `src/components/layout/Layout.tsx` provides consistent header/footer across all pages
- All routes render within the Layout component
- 404 handling via NotFound component

## Path Aliases

- `@/*` maps to `src/` (defined in both `tsconfig.json` and `vite.config.ts`)

## Dark/Light & Accent Color

- Dark mode: class-based — add/remove `.dark` on `<html>`
- Accent colors: 6 options (green, blue, red, orange, purple, gray) applied as `.accent-*` class on `<html>`
- Both persist to `localStorage` independently
- CSS variables update based on active theme/accent

## Content

- Experience, projects, skills, and certificates data live in `src/constants/constants.ts`
- Shared TypeScript types are in `src/types/types.ts`
- Page components: `HomePage`, `AboutPage`, `ExperiencePage`, `ProjectsPage`, `SkillsPage`, `CertificatesPage`, `ContactPage`, `ChatPage`
- Shared components: `Navbar`, `Footer`, `Layout`, `BackToTop`, `SectionHeader`

## Pages & Routes

| Route | Component | Description |
| --- | --- | --- |
| `/` | HomePage | Hero with intro and CTA buttons |
| `/about` | AboutPage | Profile info and bio (01) |
| `/experience` | ExperiencePage | Timeline of roles with company logos (02) |
| `/projects` | ProjectsPage | Projects carousel slider (03) |
| `/skills` | SkillsPage | Tech stack with icons (04) |
| `/certificates` | CertificatesPage | Credential gallery (05) |
| `/contact` | ContactPage | Contact form and links (06) |
| `/chat` | ChatPage | Nova AI chat interface (07) |
| `*` | NotFound | 404 fallback |

## Key Features

### Projects Carousel
- Horizontal carousel using `embla-carousel`
- Full-width on mobile, 2-column on desktop
- Navigation: Previous/Next buttons, dot indicators
- Compact card design optimized for slider

### Experience Section
- Dynamic company logos via `logo.dev` API
- Timeline visualization with dots
- Company, location, period, and descriptions

### Skills Section
- Tech stack organized by category
- Icons loaded from `devicons` CDN via jsDelivr
- Responsive grid layout

### Certificates Section
- Card-based gallery with Award icon
- Hover effects and transitions
- Links to credential verification

### Chat (Nova)
- Gemini-powered AI assistant
- Clean, minimalist chat interface
- Suggestion prompts for first-time visitors
- Message history tracking

## Animations

- Smooth scroll via `Lenis` (if integrated)
- Animations via `framer-motion` for entrance effects
- Carousel transitions via `embla-carousel`
- Page transitions on route changes

## Tech Stack

- React 19, TypeScript, Vite
- Tailwind CSS v4, `tw-animate-css`
- Framer Motion, embla-carousel
- Lucide icons, devicons CDN
- @google/generative-ai
- logo.dev API, tech-stack-icons

## External APIs

- **Gemini API** (`@google/generative-ai`) — Nova AI chatbot
- **logo.dev API** — Company logos in Experience section
- **devicons CDN** (jsDelivr) — Tech stack icons in Skills section
