# AI Workflow Rules

## Purpose

These rules define how every AI agent (Antigravity, Claude Code, Codex, Cursor, etc.) must work inside this repository.

These rules are mandatory.

Never ignore them.

---

# 1. Read Before Writing

Before generating any code, always read every file inside:

/context

and

/feature-specs

Read them in numerical order.

Do not start implementation until every relevant file has been read.

---

# 2. Context Is The Source of Truth

Treat every markdown file as project documentation.

Never overwrite user-written documentation.

Never ignore documented requirements.

If documentation conflicts, stop and ask instead of guessing.

---

# 3. Feature-First Development

Every feature must have a specification before implementation.

Workflow:

Read Context

↓

Read Feature Spec

↓

Update Progress Tracker

↓

Plan

↓

Implement

↓

Test

↓

Update Documentation

↓

Stop

---

# 4. One Feature At A Time

Never implement multiple unrelated features together.

Finish one feature completely before starting another.

---

# 5. Think Before Coding

Always analyze the existing project.

Reuse components whenever possible.

Prefer extending existing code over creating duplicate implementations.

Avoid unnecessary rewrites.

---

# 6. Preserve Existing Work

Do not remove, rename, or rewrite working code unless explicitly requested.

Respect the existing project architecture.

---

# 7. Original Design Only

Never copy layouts, components, assets, animations, or code from another portfolio.

Use inspiration only.

Create an original design language.

---

# 8. Performance First

Every animation must have a purpose.

Prefer smooth UX over flashy effects.

Maintain:

- 60 FPS animations
- Lighthouse 95+
- Fast loading
- Accessibility
- SEO

---

# 9. Documentation First

Whenever architecture, folders, workflows, or features change:

Update the corresponding markdown documentation first.

Documentation must always match the current implementation.

---

# 10. Missing Information

If required information is missing:

Never invent it.

Create a clearly marked placeholder.

Example

TODO:
Add certificate information

---

# 11. Code Quality

Write production-ready code.

Code should be:

- Modular
- Reusable
- Typed
- Maintainable
- Scalable
- Well documented

Avoid:

- Magic numbers
- Duplicate logic
- Dead code
- Hardcoded values

---

# 12. Component Rules

Every component should have a single responsibility.

Keep components small.

Reuse before recreating.

---

# 13. Styling Rules

Use consistent spacing.

Consistent typography.

Consistent animations.

Consistent colors.

Maintain one design language across the project.

---

# 14. Before Every Response

Before making changes, verify:

✓ Context read

✓ Feature spec read

✓ Existing code checked

✓ No duplicate implementation

✓ Documentation updated

---

# 15. Never Do These

❌ Never copy another portfolio

❌ Never overwrite user edits

❌ Never skip documentation

❌ Never guess requirements

❌ Never implement undocumented features

❌ Never break existing functionality

❌ Never create unnecessary files

❌ Never ignore performance

---

# 16. Success Criteria

Every completed feature should satisfy:

✓ Original

✓ Responsive

✓ Accessible

✓ Performant

✓ Maintainable

✓ Documented

✓ Fully tested

✓ Production ready