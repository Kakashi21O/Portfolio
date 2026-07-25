# Architecture

## Purpose

This document defines the architecture of the entire portfolio.

Every AI agent and developer should understand how the project is organized before implementing new features.

Architecture should remain simple, scalable, modular, and easy to maintain.

The portfolio should be able to grow for years without requiring major rewrites.

---

# System Overview

The portfolio is a modern, interactive developer website built with Next.js.

It combines storytelling, animations, 3D interactions, and structured content while maintaining excellent performance and accessibility.

Everything should be modular.

Every feature should be isolated.

Every section should be reusable.

---

# Technology Stack

| Layer | Technology | Responsibility |
|--------|------------|----------------|
| Framework | Next.js 15 (App Router) | Routing, Rendering, Metadata, Performance |
| Language | TypeScript | Type Safety |
| UI | React | Component Architecture |
| Styling | Tailwind CSS v4 | Styling System |
| Components | shadcn/ui + Radix UI | Accessible UI Components |
| Animation | Framer Motion | UI Animations |
| Advanced Animation | GSAP | Hero & Timeline Animations |
| Smooth Scroll | Lenis | Scroll Experience |
| 3D | Three.js + React Three Fiber + Drei | Interactive 3D Elements |
| Icons | Lucide React + Simple Icons | Icons & Technology Logos |
| Forms | React Hook Form + Zod | Contact Form |
| Analytics | Vercel Analytics | Website Insights |
| Hosting | Vercel | Deployment & CDN |
| Version Control | Git + GitHub | Source Control |

---

# High-Level Architecture

```

User

↓

Next.js App Router

↓

Layouts

↓

Pages

↓

Feature Components

↓

Reusable Components

↓

Hooks / Services / Utilities

↓

Structured JSON Content

↓

Public Assets

```

---

# Project Structure

```

portfolio/

app/
components/
features/
hooks/
services/
lib/
constants/
types/
styles/
data/
public/
context/
feature-specs/
tests/

```

---

# System Boundaries

## app/

Owns

- Routing
- Layouts
- Metadata
- Loading Pages
- Error Pages

Should never contain business logic.

---

## features/

Owns

Feature-specific logic.

Examples

```

hero/
projects/
github/
contact/
timeline/

```

Every feature should be isolated.

---

## components/

Owns reusable UI.

Examples

```

Button

Card

Navbar

Footer

Dialog

```

Components should never know business logic.

---

## hooks/

Owns reusable React hooks.

Examples

```

useCursor()

useTheme()

useMusic()

useScrollProgress()

```

Hooks should never render UI.

---

## services/

Owns

External APIs

Future

GitHub API

Spotify API

Email Service

Analytics

Business logic belongs here.

---

## lib/

Owns

Utilities

Animation helpers

Three.js helpers

SEO

Performance helpers

No UI components.

---

## constants/

Owns

Colors

Routes

Fonts

Animation values

Configuration

Anything reused globally.

---

## types/

Owns

Shared TypeScript interfaces.

Never duplicate types.

---

## styles/

Owns

Global CSS

Variables

Fonts

Animation CSS

---

## data/

Owns

Portfolio content.

Examples

```

projects/

skills/

timeline/

about/

site/

```

Components should only render data.

Never hardcode content.

---

## public/

Owns

Images

Icons

Fonts

Models

Music

Resume

Favicons

---

## context/

Owns

Architecture

Rules

Documentation

Workflow

Progress

AI Instructions

This is the project's source of truth.

---

## feature-specs/

Owns

Feature documentation.

Each feature must have exactly one specification.

---

# Data Flow

```

JSON Data

↓

Feature

↓

Component

↓

User Interface

```

No component should fetch hardcoded portfolio content.

---

# State Management

Default

React State

Context API

No global state library unless required.

---

# Rendering Strategy

Prefer

Server Components

Use Client Components only when

- Animations
- User Interaction
- Three.js
- Browser APIs

---

# Performance Strategy

Lazy load

- Three.js
- GSAP
- Music
- Large Images

Use dynamic imports.

Keep the first load lightweight.

---

# Animation Architecture

Framer Motion

↓

Component Animations

GSAP

↓

Complex Timelines

Lenis

↓

Scrolling

Three.js

↓

Interactive 3D

Each system has one responsibility.

Avoid overlapping responsibilities.

---

# Asset Pipeline

Assets

↓

Optimization

↓

Compression

↓

Lazy Loading

↓

Rendering

Never use unoptimized assets.

---

# Security

No secrets inside the client.

Use environment variables.

Never expose private keys.

---

# Scalability

The architecture should support future additions without major restructuring.

Examples

- Blog
- CMS
- GitHub API
- MDX
- Multi-language
- Admin Panel
- Portfolio CMS

---

# Architecture Rules

Always

✓ Modular

✓ Reusable

✓ Typed

✓ Documented

✓ Performant

✓ Accessible

Never

❌ Mix UI with business logic

❌ Hardcode content

❌ Duplicate utilities

❌ Duplicate components

❌ Ignore documentation

---

# Invariants

These rules must never be violated.

1. Every feature must have a corresponding file in `/feature-specs` before implementation.

2. Every AI agent must read the `/context` folder before making changes.

3. Components may render data but must not own portfolio content.

4. Business logic belongs in `services`, `hooks`, or `lib`, never inside presentation components.

5. Every heavy feature (Three.js, GSAP, Music, GitHub API) must be lazy loaded.

6. Every implementation must preserve accessibility and performance goals.

7. Documentation must always be updated when architecture changes.

8. The portfolio should remain production-ready after every completed feature.

---

# Future Architecture

The architecture should support migration to

- MDX
- Headless CMS
- Database
- GitHub API
- AI Assistant
- Portfolio Dashboard

without requiring a redesign of the existing component architecture.

---

# Definition of Done

The architecture is considered healthy when

✓ Every folder has one responsibility

✓ Components remain reusable

✓ Features remain isolated

✓ Documentation matches implementation

✓ Performance targets are maintained

✓ The project is easy for any future AI agent or developer to understand and continue