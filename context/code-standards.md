# Code Standards

## Purpose

This document defines the coding standards for the entire project.

Every file added to the repository must follow these rules.

The objective is to produce clean, maintainable, scalable, production-ready code that any future AI agent or developer can understand.

When multiple solutions exist, choose the simplest solution that satisfies the requirements.

---

# General Principles

Every implementation should follow these principles.

### Keep Everything Modular

Every file should have one responsibility.

Every function should solve one problem.

Every component should have one purpose.

Avoid large files that try to do everything.

---

### Fix Root Causes

Never add temporary fixes.

Never layer workarounds over broken code.

Understand why a problem exists before changing the implementation.

---

### Reuse Before Creating

Before writing new code

- Search existing components
- Search hooks
- Search utilities
- Search constants

Prefer extending existing code over duplication.

---

### Readability First

Readable code is more important than clever code.

Use descriptive names.

Keep nesting shallow.

Avoid unnecessary abstraction.

---

### Production First

Every commit should leave the project in a deployable state.

Never leave broken code in the repository.

---

# TypeScript

Strict mode is required.

Never disable TypeScript rules.

Never use

```
any
```

Prefer

- interfaces
- type aliases
- generics
- utility types

External data

- Validate every API response
- Validate JSON
- Validate user input

Never trust external input.

---

# Next.js Rules

Use

App Router only.

Default to

Server Components.

Only use

```
"use client"
```

when required for

- Browser APIs
- State
- Effects
- Animations
- Three.js
- User interaction

Keep pages thin.

Move reusable logic into components.

---

# React Rules

Use Functional Components only.

Never use Class Components.

Prefer

Composition

instead of inheritance.

Component responsibilities

UI only.

Business logic belongs elsewhere.

---

# Hooks

Hooks belong in

```
hooks/
```

Rules

- One responsibility
- Reusable
- No JSX
- No UI rendering

Examples

```
useCursor()

useTheme()

useMusic()

useScrollProgress()
```

---

# Styling

Use

Tailwind CSS.

Never hardcode colors.

Use design tokens defined in

```
ui-context.md
```

Spacing

Typography

Border Radius

Animation Durations

Colors

should all come from the design system.

Avoid inline styles.

---

# Animations

Animation hierarchy

Simple

↓

CSS

Medium

↓

Framer Motion

Complex

↓

GSAP

3D

↓

Three.js

Never animate layout properties unnecessarily.

Prefer

```
transform

opacity
```

over

```
top

left

width

height
```

---

# Components

Component rules

- One responsibility
- Typed props
- Small size
- Accessible
- Reusable

Target size

<200 lines

Maximum

250 lines

Split larger components.

---

# API Routes

Future API routes should

- Validate input
- Return typed responses
- Handle errors consistently
- Never expose secrets

Response structure

```ts
{
    success: boolean,
    data?: T,
    error?: string
}
```

---

# Data Layer

Portfolio content belongs inside

```
data/
```

Never hardcode

Projects

Skills

Timeline

Social Links

Navigation

inside React components.

---

# Services

External services belong inside

```
services/
```

Examples

GitHub

Email

Spotify

Analytics

No UI code belongs here.

---

# Utilities

Utilities belong inside

```
lib/
```

Utilities should

- Be pure
- Be reusable
- Be framework independent

---

# Constants

Global constants belong inside

```
constants/
```

Examples

Routes

Colors

Animations

Social Links

Configuration

Never duplicate constant values.

---

# File Organization

```
app/
```

Routes

Metadata

Layouts

---

```
features/
```

Feature modules

---

```
shared/
```

Reusable UI

Utilities

Hooks

Types

Constants

---

```
data/
```

Portfolio content

---

```
public/
```

Assets

---

```
context/
```

Documentation

---

```
feature-specs/
```

Feature requirements

---

# Imports

Import order

1. React / Next.js

2. Third-party libraries

3. Internal libraries

4. Shared components

5. Feature components

6. Hooks

7. Utilities

8. Constants

9. Types

10. Styles

---

# Naming

Components

```
HeroSection.tsx

ProjectCard.tsx

GithubStats.tsx
```

Hooks

```
useCursor.ts

useTheme.ts
```

Utilities

```
formatDate.ts

calculateProgress.ts
```

JSON

```
projects.json

skills.json
```

---

# Error Handling

Never ignore errors.

Handle

Loading

Empty

Error

Offline

states.

Provide meaningful fallback UI.

---

# Performance

Every implementation should

- Lazy load heavy components
- Minimize JavaScript
- Reduce bundle size
- Avoid unnecessary rerenders
- Use memoization only when beneficial

Target

60 FPS

Lighthouse 95+

---

# Accessibility

Every component must

- Support keyboard navigation
- Include visible focus states
- Use semantic HTML
- Respect reduced motion
- Include ARIA labels where appropriate

Accessibility is mandatory.

---

# Documentation

Whenever implementation changes

Update

- architecture.md
- progress-tracker.md
- portfolio-data.md
- roadmap.md

if affected.

Documentation should always match the codebase.

---

# Never Do

❌ Use `any`

❌ Duplicate code

❌ Hardcode repeated values

❌ Create oversized components

❌ Mix UI with business logic

❌ Ignore accessibility

❌ Ignore performance

❌ Leave unused code

❌ Skip documentation

❌ Rewrite working code without reason

---

# Code Review Checklist

Before considering a feature complete

✓ TypeScript passes

✓ ESLint passes

✓ Build succeeds

✓ Responsive

✓ Accessible

✓ Performance maintained

✓ Documentation updated

✓ No duplicated logic

✓ No console errors

✓ Production ready

---

# Definition of Done

Code is complete only when it is

✓ Clean

✓ Modular

✓ Reusable

✓ Typed

✓ Accessible

✓ Responsive

✓ Performant

✓ Documented

✓ Tested

✓ Production-ready