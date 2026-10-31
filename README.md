# Mantu Yadav — Personal Portfolio

A sleek, modern developer portfolio built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Features interactive 3D hero elements, smooth Lenis scrolling, dynamic GitHub project cards, skills showcase, audio player, certificate explorer, and an OTP-verified contact system.

🌐 **Live:** [mantuyadav.dev](https://kakashi21o.github.io/Portfolio)

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) — App Router, Turbopack, Static Export |
| **UI & Styling** | React 19, Tailwind CSS v4, lucide-react |
| **Components** | shadcn/ui, @base-ui/react |
| **Animations & 3D** | Framer Motion, Three.js, @react-three/fiber, @react-three/drei |
| **Smooth Scroll** | Lenis |
| **Contact & Email** | Resend (email delivery) + Upstash Redis (OTP rate-limiting) |

---

## Features

- **3D Hero** — Interactive wireframe sphere with animated typewriter text
- **Dynamic Projects** — Live GitHub API feed with category filters, search, and explicit starring/ordering; clicking a card opens the GitHub repo directly
- **Skills Showcase** — ExpertiseCard-style tilt + glow cards with category accent colors
- **About & Journey** — Career timeline and interesting facts section
- **Certificates** — Dedicated gallery page with certificate previews
- **GitHub Stats** — Live repositories, contribution stats, and activity feed
- **Music Player** — Ambient background audio player
- **OTP Contact** — Email verified contact form via Resend + Upstash Redis
- **Custom Cursor** — Interactive cursor with magnetic effects
- **Custom Favicon** — 3D metallic MY logo (chrome M + glowing blue Y) on dark navy background

---

## Project Structure

```text
├── .github/workflows/    # CI/CD — automated deploy to GitHub Pages on push to master
├── data/                 # Static fallback snapshots (GitHub stats, projects)
├── public/
│   ├── images/           # Avatar, certificate previews
│   ├── music/            # Ambient soundtrack tracks
│   ├── resume/           # Downloadable PDF resume
│   ├── icon.png          # High-res MY brand icon (256×256)
│   ├── favicon.ico       # Browser tab favicon
│   ├── favicon.svg       # SVG favicon
│   ├── CNAME             # Custom domain (mantuyadav.dev)
│   └── robots.txt        # Search engine crawler directives
├── src/
│   ├── app/
│   │   ├── api/contact/  # OTP endpoints (request-otp, verify-otp, resend-otp)
│   │   ├── certificates/ # Certificates gallery page
│   │   ├── icon.png      # Next.js auto-served /icon.png (top-priority favicon)
│   │   ├── favicon.ico   # App-level favicon
│   │   ├── layout.tsx    # Root layout — metadata, fonts, providers
│   │   └── page.tsx      # Main single-page portfolio
│   ├── components/
│   │   ├── about/        # About, avatar, timeline, facts, code window
│   │   ├── animations/   # Smooth scroll wrapper
│   │   ├── certificates/ # Certificates modal and conditional navbar
│   │   ├── contact/      # OTP-verified contact form
│   │   ├── cursor/       # Custom cursor context and magnetic effects
│   │   ├── footer/       # Footer section
│   │   ├── github/       # GitHub repos, stats cards, activity feed
│   │   ├── hero/         # 3D canvas, typewriter, animated background
│   │   ├── loading/      # Hydration-safe loading screen
│   │   ├── music/        # Ambient music player
│   │   ├── navbar/       # Floating nav bar with section tracking
│   │   ├── projects/     # Project cards (skills-style), filters, data
│   │   ├── resume/       # Resume preview and download
│   │   ├── skills/       # ExpertiseCard tilt+glow cards and tech tiles
│   │   └── ui/           # Reusable primitives (TechIcon, Card, Tooltip)
│   ├── hooks/            # useGitHubData, useProjectsData, useIsMobile
│   └── lib/              # Utils, email, OTP logic, rate limiting
└── next.config.ts        # Static export & basePath config
```

---

## Getting Started

### 1. Prerequisites
- Node.js `20.x` or later

### 2. Clone & Install

```bash
git clone https://github.com/Kakashi21O/Portfolio.git
cd Portfolio
npm install
```

### 3. Environment Variables

Create `.env.local`:

```env
RESEND_API_KEY=           # Resend API key
UPSTASH_REDIS_REST_URL=   # Upstash Redis REST URL
UPSTASH_REDIS_REST_TOKEN= # Upstash Redis REST Token
CONTACT_EMAIL=            # Your inbox for contact form messages
EMAIL_FROM=               # Verified sender on Resend
NEXT_PUBLIC_GITHUB_TOKEN= # (Optional) GitHub PAT for higher API rate limits
```

### 4. Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev` | Dev server with Turbopack |
| `build` | `next build` | Production static export → `/out` |
| `start` | `next start` | Production server (node runtime) |
| `lint` | `eslint` | Lint source code |

---

## Deployment

Automated via **GitHub Actions** (`.github/workflows/deploy.yml`) — pushes to `master` trigger a build and deploy to **GitHub Pages**.

Manual build:

```bash
npm run build
# Static output → out/
```

---

## License

Private use by **Mantu Yadav**. All rights reserved.
