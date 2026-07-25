# Code Standards

## Purpose

This document defines the coding standards for the entire project.

Every AI and developer must follow these standards.

Code should always prioritize readability, maintainability, scalability, and performance over cleverness.

---

# General Principles

Write code as if another developer will maintain it for years.

Every file should have a clear purpose.

Every function should solve one problem.

Every component should have one responsibility.

Always prefer clarity over complexity.

---

# Production Quality

Every piece of code must be production-ready.

Avoid temporary solutions unless explicitly marked as experimental.

Never leave unfinished code without a TODO comment explaining why.

---

# TypeScript

Always use strict TypeScript.

Never use:

- any
- @ts-ignore
- unnecessary type assertions

Prefer:

- interfaces
- utility types
- generics
- inferred types when appropriate

Every exported function should have explicit types.

---

# React

Use modern React.

Prefer

- Functional Components
- Hooks
- Server Components where appropriate
- Client Components only when necessary

Avoid unnecessary state.

Avoid unnecessary rerenders.

---

# Component Architecture

Every component should have one responsibility.

Prefer many small reusable components instead of one large component.

Maximum component size:

~250 lines

Split components when they become difficult to understand.

---

# Folder Structure

Group files by feature rather than file type.

Example

/components
    /hero
    /projects
    /timeline
    /contact

instead of

/components
/pages
/styles

when feature grouping makes more sense.

---

# Naming Conventions

Use descriptive names.

Good

HeroSection

ProjectCard

AnimatedBackground

GithubStats

LoadingScreen

Bad

Hero2

CardNew

TestComponent

abc.tsx

---

# File Naming

Components

PascalCase.tsx

Hooks

useSomething.ts

Utilities

camelCase.ts

Constants

UPPER_CASE.ts

Types

types.ts

---

# Functions

Functions should do one thing.

Prefer

getGithubRepositories()

Avoid

handleEverything()

Maximum function size:

~40 lines

Split large functions.

---

# Comments

Write comments only when necessary.

Do not explain obvious code.

Instead explain

Why

not

What

Bad

// Increment index

Good

// Delay rendering until hydration to avoid mismatch

---

# Styling

Use Tailwind CSS.

Avoid inline styles.

Avoid duplicated utility classes.

Create reusable components when patterns repeat.

Use CSS variables for colors.

---

# shadcn/ui

Follow shadcn conventions.

Never modify library files directly.

Extend through composition.

Keep components compatible with future updates.

---

# Animations

Separate animation logic from layout.

Prefer

Framer Motion

GSAP

Motion One

Do not mix multiple animation libraries inside one component unless required.

Every animation must have a purpose.

Animations should improve UX.

Not distract from it.

---

# Three.js

Keep scenes lightweight.

Dispose resources correctly.

Avoid expensive renders.

Only render interactive elements when visible.

---

# Performance

Lazy load:

- 3D scenes
- images
- heavy components

Memoize expensive calculations.

Use dynamic imports where appropriate.

Avoid unnecessary renders.

Target

60 FPS

Lighthouse 95+

---

# Accessibility

Use semantic HTML.

Every interactive element must be keyboard accessible.

Every image needs alt text.

Maintain proper heading hierarchy.

Meet WCAG AA standards.

---

# SEO

Every page requires

- title
- description
- Open Graph
- Twitter Card
- canonical URL

Use proper metadata.

---

# Error Handling

Never silently ignore errors.

Provide meaningful fallback UI.

Log errors during development.

Handle loading states.

Handle empty states.

Handle offline states.

---

# Constants

Never hardcode values repeatedly.

Store

colors

links

routes

socials

config

inside constants.

---

# Environment Variables

Never expose secrets.

Validate required environment variables.

Document every variable.

---

# Imports

Order

1. React / Next

2. Third-party packages

3. Internal libraries

4. Components

5. Hooks

6. Utilities

7. Types

8. Styles

---

# Code Duplication

Before writing code

Search the project.

Reuse existing components.

Extract reusable logic.

Avoid copy-paste.

---

# Testing

Every feature should be manually verified.

Critical utilities should be unit-test friendly.

---

# Documentation

When architecture changes

Update

/context

before continuing.

Documentation must always match implementation.

---

# Before Every Commit

Verify

✓ TypeScript passes

✓ ESLint passes

✓ No console.log

✓ No dead code

✓ No unused imports

✓ Responsive

✓ Accessible

✓ Performance maintained

✓ Documentation updated

---

# Never Do

❌ Use any

❌ Duplicate code

❌ Hardcode data

❌ Ignore TypeScript errors

❌ Ignore ESLint warnings

❌ Create oversized components

❌ Mix business logic with UI

❌ Copy code from other portfolios

❌ Add animations without purpose

---

# Definition of Done

A feature is complete only when:

✓ Fully functional

✓ Responsive

✓ Accessible

✓ Performant

✓ Typed

✓ Reusable

✓ Documented

✓ Production-ready

✓ Consistent with the project design language