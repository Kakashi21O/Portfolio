# Mantu Yadav - Personal Portfolio

A sleek, modern developer portfolio built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Features interactive 3D hero elements, smooth Lenis scrolling, dynamic GitHub activity feeds, project showcases, audio player, certificate explorer, and an OTP-verified contact system.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Static Export)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [tw-animate-css](https://github.com/), [lucide-react](https://lucide.dev/)
- **Components & Primitives**: [@base-ui/react](https://base-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Animations & 3D**: [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/) with [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Contact & Email**: [Resend](https://resend.com/) for email delivery & [Upstash Redis](https://upstash.com/) for OTP rate-limiting and storage

---

## Project Structure

```text
├── .github/workflows/    # CI/CD deployment workflows (GitHub Pages)
├── data/                 # Static data snapshots (GitHub stats, projects)
├── public/
│   ├── images/           # Avatar, certificate previews, and project mockups (WebP/JPG)
│   ├── music/            # Ambient soundtrack tracks for built-in audio player
│   ├── resume/           # Downloadable PDF resume
│   ├── CNAME             # Custom domain configuration (mantuyadav.dev)
│   └── robots.txt        # Search engine crawler directives
├── src/
│   ├── app/              # Next.js App Router pages, layout, globals, sitemap, API routes
│   │   ├── api/contact/  # OTP-verified contact form endpoints (request, verify, resend)
│   │   ├── certificates/ # Dedicated certificates gallery page
│   │   ├── layout.tsx    # Root layout with font and cursor providers
│   │   └── page.tsx      # Main portfolio single-page application
│   ├── components/       # Feature-organized UI components
│   │   ├── about/        # About section, avatar, timeline, facts, code window
│   │   ├── animations/   # Smooth scroll wrapper
│   │   ├── certificates/ # Certificates modal and view components
│   │   ├── contact/      # Contact form with OTP verification modal
│   │   ├── cursor/       # Interactive custom cursor context and effects
│   │   ├── footer/       # Footer section
│   │   ├── github/       # GitHub repositories, stats cards, and activity feed
│   │   ├── hero/         # 3D canvas object, typewriter text, animated background
│   │   ├── loading/      # Hydration-safe loading screen and provider
│   │   ├── music/        # Ambient music player
│   │   ├── navbar/       # Floating navigation bar
│   │   ├── projects/     # Project showcase cards, filters, and modal
│   │   ├── resume/       # Resume preview and download section
│   │   ├── skills/       # Technical skills and expertise cards
│   │   ├── timeline/     # Career and education timeline
│   │   └── ui/           # Reusable UI primitives (TechIcon, Card, Tooltip)
│   ├── data/             # Frontend data definitions (certificates, etc.)
│   ├── hooks/            # Custom React hooks (useGitHubData, useIsMobile, etc.)
│   └── lib/              # Utilities, email transport, OTP verification, rate limiting
└── next.config.ts        # Next.js export & basePath configurations
```

---

## Getting Started

### 1. Prerequisites
- Node.js `20.x` or later
- npm, yarn, pnpm, or bun

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Kakashi21O/Portfolio.git
cd Portfolio
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):

```bash
cp .env.example .env.local
```

Configure your credentials:
- `RESEND_API_KEY`: API key from [Resend](https://resend.com)
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST Token
- `CONTACT_EMAIL`: Your inbox where verified messages are sent
- `EMAIL_FROM`: Verified sender address on Resend (e.g. `"Portfolio <onboarding@resend.dev>"`)
- `NEXT_PUBLIC_GITHUB_TOKEN`: *(Optional)* GitHub personal access token for higher API rate limits

### 4. Development Server
Start the local Next.js Turbopack development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **`dev`** | `next dev` | Starts local development server with Turbopack |
| **`build`** | `next build` | Compiles TypeScript and builds production static export into `/out` |
| **`start`** | `next start` | Runs production server (when using node server runtime) |
| **`lint`** | `eslint` | Runs ESLint over project source code |

---

## Deployment

The repository is configured for automated static export deployment to **GitHub Pages** via `.github/workflows/deploy.yml` upon push to `master`.

To produce a production static export manually:

```bash
npm run build
```

The static output is generated in the `out/` directory.

---

## License

This project is licensed under the [MIT License](LICENSE) (or private use by Mantu Yadav).
