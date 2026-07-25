# Folder Structure

## Purpose

This document defines the folder architecture for the entire project.

Every file should have a predictable location.

If a new file doesn't clearly belong somewhere, reconsider the architecture before creating it.

Never create random folders.

Always follow this structure.

---

# Root Structure

```
portfolio/
│
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── data/
├── constants/
├── types/
├── public/
├── styles/
├── context/
├── feature-specs/
├── docs/
├── scripts/
├── tests/
├── .github/
│
├── CHANGELOG.md
├── README.md
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

# app/

Contains every route using the Next.js App Router.

Responsibilities

- Layouts
- Pages
- Metadata
- Route groups
- Loading pages
- Error pages
- API routes

Never place reusable UI here.

---

# components/

Contains every reusable React component.

Structure

```
components/

common/
layout/
navigation/
hero/
about/
skills/
projects/
timeline/
github/
resume/
contact/
footer/
animations/
three/
ui/
```

Every folder should contain

```
Component.tsx
types.ts
constants.ts
index.ts
```

when necessary.

---

# hooks/

Contains custom React hooks.

Examples

```
useCursor.ts

useLenis.ts

useTheme.ts

useMusic.ts

useMousePosition.ts

useScrollProgress.ts

useWindowSize.ts
```

Never place UI here.

---

# lib/

Contains reusable utilities.

Examples

```
gsap/

three/

animations/

helpers/

utils/

seo/

performance/
```

Never store React components.

---

# services/

Contains external integrations.

Examples

```
github.ts

spotify.ts

email.ts

analytics.ts
```

Business logic belongs here.

---

# data/

Static project data.

```
projects.json

skills.json

timeline.json

experience.json

socials.json

navigation.json

music.json
```

Never hardcode repeated data inside components.

---

# constants/

Global constants.

Examples

```
routes.ts

colors.ts

fonts.ts

links.ts

config.ts

animations.ts
```

Never duplicate constant values.

---

# types/

Global TypeScript types.

Examples

```
project.ts

github.ts

resume.ts

timeline.ts

common.ts
```

---

# public/

Assets.

```
images/

icons/

music/

models/

videos/

fonts/

favicons/
```

Optimize every asset.

---

# styles/

Global styling.

```
globals.css

variables.css

animations.css

fonts.css
```

Keep styling centralized.

---

# context/

Project documentation.

Source of truth.

Contains

Architecture

Workflow

Rules

Roadmap

Progress

AI Instructions

Every AI must read these files before coding.

---

# feature-specs/

Feature documentation.

One file per feature.

Examples

```
01-hero.md

02-navbar.md

03-about.md
```

Implementation should never begin before the feature specification exists.

---

# docs/

Additional documentation.

Examples

```
API.md

CONTRIBUTING.md

SETUP.md

SECURITY.md

DESIGN.md
```

---

# scripts/

Automation scripts.

Examples

```
generate-icons.ts

optimize-images.ts

generate-sitemap.ts
```

---

# tests/

Testing.

```
unit/

integration/

e2e/
```

---

# .github/

GitHub workflows.

```
workflows/

ISSUE_TEMPLATE/

PULL_REQUEST_TEMPLATE/
```

---

# Naming Rules

Folders

lowercase

Examples

```
components

hooks

services
```

Files

Components

```
HeroSection.tsx
```

Hooks

```
useCursor.ts
```

Utilities

```
animateText.ts
```

Types

```
project.ts
```

Constants

```
routes.ts
```

---

# Import Rules

Order

1. React / Next

2. External packages

3. Internal libraries

4. Components

5. Hooks

6. Utilities

7. Constants

8. Types

9. Styles

---

# File Size Guidelines

Component

<250 lines

Hook

<150 lines

Utility

<100 lines

Split large files.

---

# Forbidden

Never create folders like

```
new/

temp/

misc/

random/

test123/
```

Never duplicate utilities.

Never duplicate components.

Never create multiple implementations of the same feature.

---

# Architecture Principles

Every folder should have one responsibility.

Prefer feature-based organization.

Keep dependencies flowing in one direction.

Avoid circular imports.

---

# Documentation Rule

Whenever a new folder is introduced

1. Update this document

2. Explain why it exists

3. Document what belongs inside it

4. Update architecture.md if necessary

Documentation should always reflect the actual project structure.