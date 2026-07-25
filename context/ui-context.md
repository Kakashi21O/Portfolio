# UI Context

## Purpose

This document defines the complete visual language of the portfolio.

Every page, section, component, animation, and interaction must follow these rules.

The portfolio should feel handcrafted, premium, and modern rather than looking like a generic template.

---

# Design Philosophy

The portfolio should communicate

- Premium
- Minimal
- Futuristic
- Interactive
- Elegant
- Technical
- Modern
- Developer-focused
- Story-driven

Every interaction should feel intentional.

The design itself should demonstrate engineering quality.

---

# Theme

Dark Theme Only

No Light Mode.

The portfolio should feel like a premium developer workspace.

Inspired by

- Modern IDEs
- Glassmorphism
- Cyberpunk lighting
- Apple-level minimalism
- Modern SaaS dashboards

Visual Style

- Near-black backgrounds
- Layered surfaces
- Soft gradients
- Floating glass cards
- Mouse reactive lighting
- Subtle glow
- Smooth shadows
- High readability

Avoid

- Flat UI
- Bright backgrounds
- Rainbow gradients
- Excessive glass blur
- Visual clutter

---

# Design Tokens

Every component must use CSS variables.

Never hardcode colors.

```css
:root{

--bg-base:#08090D;
--bg-surface:#10131A;
--bg-card:#151923;
--bg-elevated:#1B2130;

--text-primary:#F8FAFC;
--text-secondary:#CBD5E1;
--text-muted:#94A3B8;

--accent-primary:#3B82F6;
--accent-secondary:#8B5CF6;

--accent-hover:#60A5FA;
--accent-glow:#2563EB;

--border-default:#2A3245;
--border-light:#374151;

--glass-bg:rgba(255,255,255,0.05);
--glass-border:rgba(255,255,255,0.08);

--state-success:#22C55E;
--state-warning:#F59E0B;
--state-error:#EF4444;

}
```

---

# Color Usage

| Purpose | Variable |
|----------|----------|
| Page Background | --bg-base |
| Cards | --bg-card |
| Floating Panels | --bg-elevated |
| Primary Text | --text-primary |
| Secondary Text | --text-secondary |
| Muted Text | --text-muted |
| Primary Buttons | --accent-primary |
| Hover States | --accent-hover |
| Purple Effects | --accent-secondary |
| Borders | --border-default |
| Success | --state-success |
| Warning | --state-warning |
| Error | --state-error |

Never use raw hex colors inside components.

---

# Typography

Primary Font

Geist Sans

Monospace

Geist Mono

Fallback

Inter

System UI

CSS Variables

```css
--font-sans
--font-mono
```

---

# Typography Scale

Hero Title

64–96px

Section Title

40–52px

Card Title

22–28px

Body

16–18px

Small

14px

Caption

12px

---

# Font Weights

Regular

400

Medium

500

SemiBold

600

Bold

700

Avoid extra bold fonts.

---

# Spacing Scale

```text
xs = 4px
sm = 8px
md = 16px
lg = 24px
xl = 32px
2xl = 48px
3xl = 64px
4xl = 96px
```

Never invent spacing values.

---

# Border Radius

| Context | Value |
|----------|-------|
| Small UI | rounded-lg |
| Buttons | rounded-xl |
| Cards | rounded-2xl |
| Dialogs | rounded-3xl |
| Hero Panels | rounded-[32px] |

Maintain consistency.

---

# Shadows

Small

Soft elevation

Medium

Glass card

Large

Floating panel

Glow

Only for interactive elements.

Avoid harsh shadows.

---

# Blur

Glass Cards

12px

Dialogs

20px

Navigation

16px

Never exceed 24px.

---

# Component Library

Use

shadcn/ui

Built on

- Radix UI
- Tailwind CSS

Rules

Never modify library source.

Extend through composition.

Components belong inside

```
shared/ui/
```

Use CLI whenever possible.

---

# Layout

Maximum Content Width

1400px

Reading Width

800px

Hero

Full viewport

Sections

Centered

Consistent vertical spacing.

---

# Layout Patterns

Hero

Full-screen introduction

↓

About

↓

Skills

↓

Projects

↓

Timeline

↓

GitHub

↓

Resume

↓

Contact

↓

Footer

Scrolling should feel like storytelling.

---

# Cards

Glassmorphism

Rounded

Interactive

Soft shadows

Hover elevation

Subtle glow

---

# Navigation

Sticky

Transparent

Glass on scroll

Animated active indicator

Blur background

---

# Buttons

Rounded

Magnetic

Soft glow

Accessible

Large hit area

Focus state required.

---

# Inputs

Glass style

Rounded

Visible focus

Animated border

Accessible labels

---

# Icons

Primary Library

Lucide React

Technology Icons

Simple Icons

Sizes

Inline

```
h-4 w-4
```

Buttons

```
h-5 w-5
```

Hero

```
h-6 w-6
```

Keep one icon style.

---

# Images

Rounded corners

Lazy loading

WebP

Responsive

High quality

Never stretch images.

---

# Cursor

Custom

Smooth

Magnetic

Interactive

Context aware

Different states

- Default
- Hover
- Button
- Link
- Loading

---

# Motion Language

Use

Opacity

Scale

Transform

Blur

Glow

Depth

Avoid

Bounce

Shake

Spin

Random movement

---

# Glassmorphism

Use only for

- Navbar
- Cards
- Dialogs
- Music Player
- Floating Panels

Do not glassify the entire website.

---

# Background

Use

Animated gradients

Soft lighting

Mouse reactive glow

Particles

Depth

Noise

Very slow movement.

Never distract from content.

---

# Responsive Breakpoints

Mobile

640px

Tablet

768px

Laptop

1024px

Desktop

1280px

Large Desktop

1536px

Design mobile-first.

---

# Accessibility

Minimum contrast

WCAG AA

Visible focus

Keyboard support

Reduced motion

Semantic HTML

Required for every component.

---

# Performance

Target

60 FPS

Lighthouse

95+

Animations

GPU accelerated

Heavy components

Lazy loaded

---

# UI Rules

Always

✓ Premium

✓ Minimal

✓ Consistent

✓ Responsive

✓ Accessible

✓ Fast

✓ Modern

Never

❌ Hardcode colors

❌ Hardcode spacing

❌ Hardcode radius

❌ Use inconsistent shadows

❌ Mix multiple icon libraries

❌ Break design tokens

❌ Create one-off components

---

# Definition of Done

The UI is complete only if

✓ Every component uses design tokens

✓ Every page follows the same design language

✓ Typography is consistent

✓ Colors are consistent

✓ Animations are consistent

✓ Accessibility is maintained

✓ Performance targets are met

✓ The portfolio feels like one cohesive product rather than unrelated pages.