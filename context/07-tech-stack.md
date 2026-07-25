# Tech Stack

## Purpose

This document defines every technology used in the project and the reasoning behind each choice.

Every dependency should have a clear purpose.

Never install packages "just in case."

If a package is added, update this document.

---

# Core Philosophy

The stack should be

- Modern
- Fast
- Production Ready
- Maintainable
- Type Safe
- Scalable
- Developer Friendly

Choose technologies that improve developer experience without sacrificing performance.

---

# Frontend Framework

## Next.js (App Router)

Purpose

- Server Components
- Routing
- Metadata
- SEO
- Performance
- Static Generation
- Dynamic Rendering

Why

Next.js provides an excellent balance between performance, developer experience, and scalability.

Rules

- Prefer Server Components
- Use Client Components only when required
- Keep routes organized
- Use Metadata API
- Use Image Optimization
- Use Font Optimization

---

# Language

## TypeScript

Purpose

Type safety across the entire application.

Rules

- Strict Mode
- No `any`
- Explicit public types
- Reusable interfaces
- Utility types where appropriate

---

# UI Library

## React

Purpose

Build reusable, component-based interfaces.

Rules

- Functional Components only
- Hooks instead of classes
- Keep components small
- Single Responsibility Principle

---

# Styling

## Tailwind CSS

Purpose

Fast, consistent styling.

Rules

- Utility-first
- Avoid duplicate class patterns
- Extract reusable UI components
- Use CSS variables for colors
- Mobile-first development

Never use inline styles unless absolutely necessary.

---

# UI Components

## shadcn/ui

Purpose

Accessible, customizable UI components.

Rules

- Extend using composition
- Never modify library internals
- Maintain accessibility
- Keep components theme-aware

---

# Animations

## Framer Motion

Use For

- Component animations
- Page transitions
- Hover effects
- Entrance animations

---

## GSAP

Use For

- Timeline animations
- Advanced sequencing
- Complex interactions
- Scroll-triggered animations

Avoid using GSAP for simple fades.

---

## Lenis

Purpose

Smooth scrolling.

Rules

- Maintain natural scrolling
- Avoid scroll hijacking
- Preserve accessibility
- Respect reduced motion preferences

---

# 3D Graphics

## Three.js

Purpose

Interactive 3D experiences.

Use For

- Hero Scene
- Background Elements
- Floating Objects

Rules

- Keep scenes lightweight
- Dispose resources properly
- Lazy load
- Avoid excessive polygons

---

## React Three Fiber

Purpose

React integration for Three.js.

Use For

- Declarative scene management
- Reusable 3D components
- Better React workflow

---

## @react-three/drei

Purpose

Common helpers for React Three Fiber.

Examples

- Environment
- Orbit Controls
- Float
- Html
- Contact Shadows

---

# Smooth Interactions

## Motion One (Optional)

May be used for lightweight micro-interactions where Framer Motion is unnecessary.

---

# Icons

## Lucide React

Purpose

Consistent iconography.

Rules

- One icon family throughout the project
- Keep icon sizes consistent
- Avoid mixing icon libraries

---

# Fonts

Preferred

- Geist
- Inter

Fallback

System Fonts

Rules

- Maximum two font families
- Optimize loading
- Use variable fonts when possible

---

# Data Management

Project data should be stored separately from components.

Examples

```
skills.json
projects.json
timeline.json
socials.json
```

Never hardcode repeated content inside components.

---

# State Management

Default

React State

Context API

Only introduce external state libraries if truly necessary.

---

# Forms

Preferred

React Hook Form

Validation

Zod

Purpose

- Better performance
- Type-safe validation
- Cleaner form logic

---

# Email

Preferred

Resend

Alternative

EmailJS

Purpose

Portfolio contact form.

---

# GitHub Integration

Use

GitHub REST API

or

GitHub GraphQL API

Display

- Pinned Repositories
- Contribution Activity
- Recent Commits
- Languages
- Repository Statistics

---

# Images

Use

Next.js Image Component

Formats

- WebP
- AVIF
- SVG

Rules

Lazy load everything.

---

# SEO

Use

Next.js Metadata API

Generate

- Open Graph
- Twitter Cards
- Sitemap
- robots.txt
- Structured Data (JSON-LD)

---

# Analytics

Preferred

Vercel Analytics

Optional

Google Analytics

Use analytics only if needed.

---

# Hosting

## Vercel

Reason

- Native Next.js support
- Fast deployments
- Preview Deployments
- Edge Network
- Built-in Analytics

---

# Development Tools

Package Manager

pnpm (Preferred)

Alternative

npm

Editor

VS Code

Version Control

Git

Repository

GitHub

---

# Code Quality

ESLint

Prettier

Husky

lint-staged

Purpose

Maintain consistent code quality before every commit.

---

# Performance Goals

Lighthouse

95+

Core Web Vitals

Pass

Animation

60 FPS

Initial Load

Fast

Minimal JavaScript

Tree Shaking

Enabled

Lazy Loading

Enabled

---

# Accessibility Goals

WCAG AA

Keyboard Navigation

Screen Reader Support

Visible Focus States

Semantic HTML

---

# Security

Never expose secrets.

Use environment variables.

Validate all external data.

Sanitize user input.

Keep dependencies updated.

---

# Future Technologies

These may be introduced later if needed.

- MDX
- Framer CMS
- Contentlayer
- Motion One
- Playwright
- Vitest
- Storybook

Do not add them until there is a clear use case.

---

# Dependency Rules

Before installing a package, ask:

- Does this solve a real problem?
- Can an existing package do this?
- Is it actively maintained?
- Does it affect performance?
- Does it increase bundle size unnecessarily?

If the answer is "No," don't install it.

---

# Guiding Principle

Every technology should improve one or more of the following:

- Developer Experience
- User Experience
- Performance
- Accessibility
- Maintainability
- Scalability

If it doesn't, it doesn't belong in the project.