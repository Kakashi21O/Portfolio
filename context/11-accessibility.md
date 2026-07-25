# Accessibility

## Purpose

Accessibility is a fundamental requirement of this portfolio.

Every visitor, regardless of ability or device, should be able to navigate and understand the website.

Accessibility should never be sacrificed for visual effects.

---

# Accessibility Goals

Target

- WCAG 2.2 AA compliance
- Lighthouse Accessibility: **100**

Every feature should remain usable with:

- Keyboard only
- Screen readers
- Reduced motion
- High zoom levels
- Different screen sizes

---

# Color & Contrast

The portfolio uses a dark theme.

Requirements

- High contrast between text and background
- Interactive elements must remain clearly visible
- Accent colors should not reduce readability
- Never rely on color alone to convey information

Avoid low-contrast gray-on-gray combinations.

---

# Keyboard Navigation

Every interactive element must be reachable using only the keyboard.

Support

- Tab
- Shift + Tab
- Enter
- Space
- Escape (for dialogs and menus)
- Arrow keys where appropriate

Navigation order should follow the visual layout.

---

# Focus States

Every interactive element must have a visible focus indicator.

Examples

- Buttons
- Links
- Form inputs
- Navigation items
- Cards that are clickable

Never remove focus outlines without providing an accessible alternative.

---

# Semantic HTML

Use semantic elements whenever possible.

Examples

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`
- `<button>`
- `<form>`

Avoid using generic `<div>` elements when a semantic element is more appropriate.

---

# Screen Reader Support

All meaningful content should be available to screen readers.

Requirements

- Descriptive button labels
- Accessible form labels
- Meaningful link text
- ARIA labels only when necessary

Icons that perform actions must include accessible names.

Decorative icons should be hidden from screen readers.

---

# Images

Every informative image must include descriptive `alt` text.

Decorative images should use an empty `alt=""` so screen readers ignore them.

Avoid text embedded inside images unless it is also available as real HTML text.

---

# Icons

Icons should never be the only indication of meaning.

If an icon acts as a button, provide:

- `aria-label`
- Visible tooltip when appropriate

Example

```
<button aria-label="Open GitHub profile">
```

---

# Animations

Animations must never block interaction.

Respect the user's `prefers-reduced-motion` setting.

When reduced motion is enabled:

- Disable decorative animations
- Remove parallax
- Reduce motion-heavy transitions
- Keep essential interaction feedback

---

# Forms

Every form element must have:

- Visible label
- Associated input
- Clear validation messages
- Helpful error text

Never rely solely on placeholder text.

---

# Links

Every link should clearly describe its destination.

Good

```
View Project
```

Better

```
View CODEazy project on GitHub
```

Avoid vague labels like

```
Click Here
More
Read
```

---

# Typography

Use readable font sizes.

Recommended minimum

- Body text: 16px
- Line height: 1.5 or greater

Avoid long lines of text.

Maintain sufficient spacing between headings and paragraphs.

---

# Interactive Components

Buttons, cards, and navigation items should provide multiple forms of feedback.

Examples

- Hover
- Focus
- Active
- Disabled

Do not rely on hover alone, as touch devices do not support it.

---

# Error Messages

Errors should be:

- Clear
- Specific
- Easy to understand

Explain what went wrong and how the user can fix it.

Avoid technical jargon in user-facing messages.

---

# Responsive Accessibility

Accessibility should remain intact across all screen sizes.

Verify

- Touch targets are large enough
- Text does not overlap
- Layout remains readable
- Navigation remains usable

Minimum touch target size

44 × 44 pixels

---

# Audio

Background music must

- Be disabled by default
- Never autoplay
- Include visible play/pause controls
- Remember the user's preference

Users should always have full control.

---

# Performance & Accessibility

Accessibility should never reduce performance, and performance improvements should never reduce accessibility.

Maintain a balance between the two.

---

# Testing Checklist

Before marking a feature complete, verify

✓ Keyboard navigation works

✓ Focus indicators are visible

✓ Screen reader labels are present

✓ Images have appropriate alt text

✓ Interactive icons have accessible names

✓ Color contrast meets WCAG AA

✓ Reduced-motion preference is respected

✓ Forms are fully accessible

✓ Lighthouse Accessibility score is 100

---

# Never Do

❌ Remove focus outlines without replacement

❌ Use color as the only indicator of meaning

❌ Autoplay audio

❌ Hide important content from screen readers

❌ Use icons without accessible labels

❌ Build hover-only interactions

❌ Use inaccessible custom controls when native HTML elements suffice

---

# Definition of Done

A feature is accessible only if it is

✓ Keyboard navigable

✓ Screen-reader friendly

✓ WCAG AA compliant

✓ High contrast

✓ Responsive

✓ Reduced-motion compatible

✓ Lighthouse Accessibility score of 100

✓ Production-ready