# AI Workflow Rules

## Purpose

This repository is developed using a **documentation-first, specification-driven workflow**.

The `/context` folder is the project's source of truth.

The `/feature-specs` folder defines individual feature requirements.

Every AI agent must understand the project before making changes.

Never start coding immediately.

---

# Development Philosophy

This project should be developed like a professional software product, not a prototype.

Every decision should prioritize

- Maintainability
- Performance
- Accessibility
- Readability
- Reusability
- Scalability
- Documentation

Every implementation should be incremental and fully verifiable.

---

# Required Workflow

Before writing any code

1. Read every file inside `/context`
2. Read every feature specification related to the current task
3. Read `progress-tracker.md`
4. Read existing implementation
5. Compare documentation with implementation
6. Update the implementation plan
7. Only then begin coding

Never skip these steps.

---

# Implementation Workflow

Every feature follows this lifecycle

Read Context

↓

Read Feature Specification

↓

Inspect Existing Code

↓

Plan Implementation

↓

Implement One Feature

↓

Test

↓

Update Documentation

↓

Update Progress Tracker

↓

Stop

Never continue to another feature automatically.

---

# Scope Rules

Only work on one feature at a time.

Never combine unrelated work.

Examples

Good

Hero Section

Navbar

Music Player

Loading Screen

Bad

Hero + Projects + Contact

Animations + GitHub API + Resume

Large changes should always be split into multiple implementation units.

---

# Splitting Work

Split work whenever a task involves

- UI and backend changes
- Multiple unrelated pages
- Multiple independent components
- Architecture changes
- More than one feature specification
- More than one animation system

If a task cannot be implemented and tested in one session,

split it.

---

# Existing Code

Always inspect the existing codebase before creating new files.

Prefer

- Extending
- Refactoring
- Reusing

Avoid

- Duplicate logic
- Duplicate components
- Duplicate utilities

Never rewrite working code without a clear reason.

---

# Missing Requirements

If documentation is missing

DO NOT GUESS.

Instead

1. Stop implementation.
2. Record the missing requirement.
3. Add it under **Open Questions** in `progress-tracker.md`.
4. Continue only after clarification.

---

# Documentation Rules

Whenever implementation changes

Immediately update the relevant documentation.

Possible files

architecture.md

folder-structure.md

portfolio-data.md

roadmap.md

known-issues.md

Never allow documentation to become outdated.

---

# Feature Specifications

Every feature must have a specification.

Naming convention

```
01-hero.md

02-navbar.md

03-loading-screen.md
```

Never implement a feature without its specification.

---

# Protected Files

Never modify

```
components/ui/

node_modules/

.next/

public/vendor/

generated/

```

unless explicitly instructed.

Treat third-party code as read-only.

---

# Code Standards

Follow

- architecture.md
- code-standards.md
- component-rules.md
- animation-rules.md

Do not invent new coding conventions.

---

# Performance Rules

Every implementation should

- Preserve Lighthouse 95+
- Maintain smooth animations
- Avoid unnecessary re-renders
- Lazy load heavy features
- Keep bundle size small

Performance is a feature.

---

# Accessibility Rules

Every implementation must

- Support keyboard navigation
- Respect reduced motion
- Maintain semantic HTML
- Preserve accessibility score

Never sacrifice accessibility for animation.

---

# Before Finishing

Verify

✓ Feature works

✓ Responsive

✓ Accessible

✓ No console errors

✓ No TypeScript errors

✓ No ESLint errors

✓ Build passes

✓ Documentation updated

✓ Progress updated

---

# Completion Checklist

Before moving to the next feature

✓ Current feature fully implemented

✓ Feature specification satisfied

✓ Tests completed

✓ Documentation updated

✓ Progress tracker updated

✓ No architecture violations

✓ Project builds successfully

Stop after completion.

Do not automatically begin another feature.

---

# Never Do

❌ Skip reading context

❌ Skip feature specifications

❌ Guess requirements

❌ Rewrite working code

❌ Overwrite user documentation

❌ Create duplicate components

❌ Implement multiple unrelated features

❌ Ignore performance

❌ Ignore accessibility

❌ Leave documentation outdated

---

# AI Behavior

Think like a senior software engineer.

Plan before coding.

Read before writing.

Reuse before creating.

Document before finishing.

Stop after one completed feature.

Every session should leave the project in a clean, production-ready state.

---

# Source of Truth Priority

When multiple files exist, follow this order:

1. User instructions
2. `99-global-rules.md`
3. `/context/*.md`
4. `/feature-specs/*.md`
5. Existing implementation
6. AI assumptions (last resort)

Never allow assumptions to override documented requirements.

---

# Goal

The objective is not simply to generate code.

The objective is to build a world-class developer portfolio that is maintainable, scalable, and easy for any future AI agent or human developer to continue without additional explanation.