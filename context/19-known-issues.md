# Known Issues

## Purpose

This document tracks all known bugs, technical debt, design inconsistencies, and unfinished work throughout the project.

Every discovered issue should be documented here before being fixed.

This file serves as a single source of truth for project stability and outstanding problems.

---

# Issue Status

Use the following status labels

🟢 Fixed

🟡 In Progress

🔴 Open

⚪ Planned

---

# Priority Levels

P0 - Critical

Application unusable.

P1 - High

Major feature broken.

P2 - Medium

Feature works but has noticeable issues.

P3 - Low

Minor bugs or polish improvements.

---

# Issue Template

## ISSUE-001

Status

🔴 Open

Priority

P2

Category

Animation

Title

Short issue title

Description

Describe the problem.

Steps to Reproduce

1.

2.

3.

Expected Behavior

Describe the expected result.

Current Behavior

Describe what currently happens.

Possible Cause

(Optional)

Possible Solution

(Optional)

Related Files

```
components/hero/
```

Assigned

AI / User

---

# Current Issues

## None

No known issues have been discovered yet.

---

# Technical Debt

Use this section for improvements that are not bugs.

Example

- Refactor animation utilities
- Improve component organization
- Optimize bundle size
- Reduce duplicate Tailwind classes

---

# Future Improvements

Potential improvements discovered during development should be documented here before implementation.

Examples

- Better loading animations
- Improved accessibility
- Performance optimizations
- More reusable hooks
- Cleaner project structure

---

# Bug Reporting Rules

Whenever a bug is discovered

1. Add it to this document.
2. Assign a priority.
3. Describe reproduction steps.
4. Reference affected files.
5. Mark the issue as fixed after verification.

Never delete resolved issues.

Instead

Move them to the archive section.

---

# Resolved Issues

Move fixed issues here.

Example

## ISSUE-001

Status

🟢 Fixed

Fixed In

v1.0.2

Description

Animation jitter on Safari.

Solution

Replaced transform calculations with GPU-accelerated translate3d().

---

# Release Checklist

Before every release

✓ No P0 issues

✓ No P1 issues

✓ All regressions tested

✓ Documentation updated

✓ Performance verified

✓ Accessibility verified

---

# Definition of Done

An issue is considered resolved only if

✓ The bug is fixed

✓ The fix is tested

✓ Documentation is updated

✓ No regression has been introduced

✓ The issue is moved to the Resolved Issues section