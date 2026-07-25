# Feature Specification — Background Effects

## Feature ID

05-background-effects

---

# Purpose

The background is not simply decoration.

It creates the atmosphere of the entire portfolio.

The visitor should feel immersed inside a modern developer workspace with subtle lighting, depth, and movement.

The background should always remain behind the content and never reduce readability.

The best compliment should be:

> "Something feels alive, but I can't tell exactly what."

---

# Design Philosophy

The background should feel

- Premium
- Futuristic
- Calm
- Interactive
- Technical
- Elegant
- Minimal

Avoid looking like

- Gaming RGB wallpaper
- Sci-fi movie
- Matrix effects
- Space wallpaper
- Particle overload

Content should always remain the focus.

---

# Layers

The background is composed of multiple independent layers.

```
Layer 6  Mouse Lighting

Layer 5  Floating Glow Orbs

Layer 4  Animated Gradient

Layer 3  Noise Texture

Layer 2  Particles

Layer 1  Base Dark Theme

Content
```

Every layer has one responsibility.

---

# Base Background

Theme

Dark Only

Background

```
#08090D
```

Never use pure black.

Slight color variation creates depth.

---

# Animated Gradient

Purpose

Prevent the page from feeling flat.

Behavior

Very slow movement.

Gradient colors

- Electric Blue
- Purple
- Near Black

Animation duration

```
30–60 seconds
```

Movement

Organic.

Almost unnoticeable.

---

# Floating Glow

Include

3–5 blurred glowing circles.

Colors

- Electric Blue
- Purple

Opacity

Very low.

Movement

Extremely slow.

Never intersect important text.

---

# Mouse Reactive Lighting

Mouse movement creates

- Soft spotlight
- Slight gradient movement
- Depth illusion

Maximum movement

```
40px
```

Lighting follows cursor smoothly.

Never snap.

---

# Depth Effect

Background elements move slower than foreground.

Use

Small parallax.

Maximum offset

```
20px
```

The effect should feel natural.

---

# Particles

Purpose

Add subtle motion.

Particle Count

Desktop

```
30–50
```

Laptop

```
20–30
```

Mobile

```
0–10
```

Behavior

- Slow floating
- Opacity fade
- Slight rotation

Never behave randomly.

---

# Noise Texture

Very light film grain.

Purpose

Prevent large gradients from feeling empty.

Opacity

```
2–4%
```

Never become noticeable.

---

# Hero Lighting

Inside Hero

Mouse controls

- Lighting
- Glow
- Gradient

Outside Hero

Lighting becomes softer.

---

# Ripple Effect

Apply ONLY to

- Name
- Major headings
- Featured project title

Never apply globally.

Behavior

Cursor hover

↓

Ripple distortion

↓

Fade

↓

Return

Maximum duration

```
500ms
```

Should resemble water gently reacting.

Not explosive.

---

# Liquid Distortion

Optional

Very subtle.

Use WebGL or SVG displacement.

Maximum distortion

```
3–5%
```

Avoid large waves.

---

# Section Background

Every section should blend naturally.

Never create hard visual breaks.

Spacing should create separation instead.

---

# Scroll Effects

Allowed

- Gradient shift
- Soft parallax
- Lighting movement

Avoid

Large background changes.

---

# Performance

Maintain

60 FPS

Background should consume minimal GPU resources.

Lazy load heavy effects.

Pause animations when

- Page hidden
- Tab inactive

---

# Accessibility

Respect

```
prefers-reduced-motion
```

Disable

- Parallax
- Lighting movement
- Floating particles
- Ripple animation

Static gradients remain.

---

# Mobile

Reduce

- Glow intensity
- Particle count
- Lighting calculations

Disable unnecessary GPU effects.

Battery life is more important.

---

# Animation Timing

Gradient

```
45s
```

Glow

```
20s
```

Particles

```
12s
```

Ripple

```
400ms
```

Mouse interpolation

```
120ms
```

---

# Technical Implementation

Preferred

CSS

↓

Framer Motion

↓

Canvas

↓

Three.js (only if absolutely required)

The simplest performant solution should always be chosen.

---

# Future Enhancements

Possible additions

- Weather-based background colors
- Time-of-day lighting
- Seasonal themes
- Interactive constellation
- AI-generated ambient visuals

Only if they improve the experience.

---

# Performance Budget

CPU

Low

GPU

Low

Bundle Increase

Minimal

Memory

Minimal

The background must never reduce Lighthouse Performance below **95**.

---

# Success Criteria

The background is complete when

✓ It creates atmosphere without distraction

✓ Cursor lighting feels smooth

✓ Particles remain subtle

✓ Ripple effect is elegant

✓ Mobile performance is maintained

✓ Reduced-motion preferences are respected

✓ 60 FPS is maintained

✓ Content remains highly readable

✓ No layout shifts occur

✓ The background feels alive throughout the entire portfolio

---

# Inspiration

Inspired by the feeling and interaction quality of

- aaabadcode.com → Cursor-responsive lighting
- aakarsh-devhq.vercel.app → Mouse-reactive depth
- mannan.io → Water/ripple hover effect
- awrs.me → Elegant scrolling atmosphere

These are references for interaction quality only.

Do **not** copy layouts, assets, shaders, or code.

Create a unique visual identity that reflects Mantu Yadav's personality and the portfolio's premium design language.