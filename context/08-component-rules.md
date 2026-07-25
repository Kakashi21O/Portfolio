# Component Rules

## Purpose

This document defines how every React component should be designed, implemented, and maintained.

Every component should be:

- Small
- Reusable
- Accessible
- Performant
- Easy to understand

When in doubt, favor simplicity over cleverness.

---

# Single Responsibility

Every component should have one clear purpose.

Good Examples

- HeroSection
- ProjectCard
- AnimatedBackground
- Navbar
- ContactForm

Avoid components that try to handle multiple unrelated features.

---

# Component Size

Target size

- Small Components: <100 lines
- Medium Components: <200 lines
- Maximum: ~250 lines

If a component becomes difficult to read, split it into smaller pieces.

---

# Reusability

Before creating a new component:

1. Search the project.
2. Check if one already exists.
3. Extend the existing component if possible.

Avoid duplicate implementations.

---

# Folder Structure

Each feature should organize related components together.

Example

```
components/
    hero/
        Hero.tsx
        HeroBackground.tsx
        HeroButtons.tsx
        HeroTitle.tsx
        index.ts

    projects/
        ProjectCard.tsx
        ProjectGrid.tsx
        ProjectFilter.tsx
```

---

# Props

Keep props minimal.

Pass only the data a component actually needs.

Avoid passing large objects when a few values are sufficient.

Use descriptive prop names.

---

# TypeScript

Every component must have typed props.

Never use

- any
- unknown (unless necessary)

Prefer

- interfaces
- type aliases
- utility types

---

# State Management

Keep state as close to where it's used as possible.

Prefer local state.

Lift state only when necessary.

Avoid unnecessary Context usage.

---

# Hooks

Custom hooks should contain reusable logic.

Never mix UI rendering inside hooks.

Good

```
useScrollProgress()

useCursor()

useTheme()
```

---

# Business Logic

Business logic should not live inside UI components.

Move reusable logic into:

- hooks/
- lib/
- services/

Components should focus on rendering.

---

# Performance

Lazy load heavy components.

Examples

- Three.js scenes
- GSAP timelines
- Large animations
- Interactive visualizations

Use dynamic imports where appropriate.

Memoize expensive calculations.

Avoid unnecessary rerenders.

---

# Accessibility

Every interactive component must support:

- Keyboard navigation
- Visible focus states
- Screen readers

Use semantic HTML whenever possible.

Provide:

- aria-label
- aria-describedby
- role (only when needed)

Never remove focus outlines without replacing them.

---

# Styling

Use Tailwind CSS.

Avoid inline styles.

Keep utility classes readable.

Extract repeated UI patterns into reusable components.

---

# Animations

Separate animation logic from layout whenever possible.

Prefer:

- Framer Motion
- GSAP

Animation should improve usability.

Avoid unnecessary motion.

Respect the user's reduced-motion preference.

---

# Images

Use the Next.js Image component.

Always include:

- alt text
- proper sizing
- lazy loading

Optimize assets before adding them.

---

# Error Handling

Components should gracefully handle:

- Loading states
- Empty states
- Error states

Never leave the user with a blank screen.

---

# Naming Conventions

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

---

# Imports

Import order

1. React / Next.js
2. Third-party libraries
3. Internal libraries
4. Components
5. Hooks
6. Utilities
7. Types
8. Styles

---

# Composition

Prefer composition over inheritance.

Small reusable building blocks are preferred over large configurable components.

---

# Testing

Before marking a component complete, verify:

- Renders correctly
- Responsive on all screen sizes
- Keyboard accessible
- No TypeScript errors
- No ESLint warnings
- Performance remains smooth

---

# Documentation

When adding a new reusable component:

- Give it a clear name.
- Place it in the correct folder.
- Update documentation if it introduces a new pattern.

---

# Never Do

❌ Create oversized components

❌ Duplicate existing components

❌ Mix UI with business logic

❌ Hardcode repeated values

❌ Ignore accessibility

❌ Ignore responsive design

❌ Skip TypeScript typing

❌ Add unnecessary animations

---

# Definition of Done

A component is complete only if it is:

✓ Reusable

✓ Typed

✓ Responsive

✓ Accessible

✓ Performant

✓ Easy to read

✓ Properly documented

✓ Production-ready