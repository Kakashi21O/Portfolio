# Animation Rules

## Purpose

This document defines the animation language used throughout the portfolio.

Animations should enhance storytelling, improve usability, and make the experience memorable.

Motion should never distract from the content.

Every animation must have a purpose.

---

# Animation Philosophy

The portfolio should feel

- Smooth
- Responsive
- Premium
- Natural
- Interactive
- Lightweight

The user should notice the experience, not the animations themselves.

---

# Motion Principles

Every animation should achieve at least one of the following:

- Guide attention
- Provide visual feedback
- Improve navigation
- Support storytelling
- Increase immersion

Never animate simply because it's possible.

---

# Animation Libraries

## Framer Motion

Use for

- Page transitions
- Section reveals
- Hover animations
- Card interactions
- Modal transitions
- Micro-interactions

Preferred for most UI animations.

---

## GSAP

Use for

- Complex timelines
- Scroll-triggered sequences
- Hero animations
- Advanced choreography
- Text reveals

Avoid using GSAP for simple fades or button hovers.

---

## Motion One

Use for

- Lightweight animations
- Small UI interactions
- Simple state changes

Only when it provides a clear advantage over Framer Motion.

---

## CSS Transitions

Use for

- Color changes
- Opacity
- Transform
- Border effects
- Focus states

Prefer CSS for simple interactions.

---

# Three.js

Three.js is a supporting technology, not the centerpiece.

Use it only when it adds meaningful depth.

Good examples

- Hero scene
- Floating objects
- Interactive background
- Ambient visual effects

Avoid

- Full-page 3D experiences
- Heavy particle systems
- Complex physics simulations
- High-polygon models

Prioritize smooth performance on mid-range devices.

---

# Scroll Experience

Use Lenis for smooth scrolling.

Scrolling should feel natural.

Allowed effects

- Fade
- Scale
- Blur
- Parallax
- Progressive reveal
- Pinned storytelling sections

Avoid

- Scroll hijacking
- Excessive pinning
- Abrupt direction changes

---

# Entrance Animations

Elements should animate only once when they enter the viewport.

Preferred effects

- Fade + slight upward movement
- Fade + scale
- Soft blur reveal

Duration

300–700ms

Use staggered animations for lists where appropriate.

---

# Hover Interactions

Hover effects should provide clear feedback.

Examples

- Slight lift
- Soft glow
- Scale (subtle)
- Border highlight
- Cursor interaction

Avoid exaggerated movement.

---

# Magnetic Elements

Apply magnetic behavior only to high-value interactive elements.

Examples

- Primary buttons
- Navigation links
- Social icons
- CTA buttons

The effect should be subtle and never interfere with clicking.

---

# Ripple / Water Effect

Inspired by premium interactive portfolios.

Apply only to

- Developer name
- Logo
- Selected section headings

Never use across the entire website.

The effect should remain subtle and performant.

---

# Cursor Interactions

Custom cursor should respond to context.

States may include

- Default
- Hover
- Click
- Drag
- Text
- Interactive
- Loading

Cursor transitions should remain smooth and unobtrusive.

---

# Background Motion

The background should feel alive.

Allowed

- Floating gradients
- Ambient particles
- Mouse-reactive lighting
- Soft noise
- Slow movement

Avoid high-speed or distracting effects.

---

# Text Animations

Use text animations sparingly.

Suitable for

- Hero heading
- Section titles
- Key statistics

Avoid animating large blocks of paragraph text.

---

# Page Transitions

Transitions between routes should be quick and smooth.

Target duration

200–500ms

Use fades or subtle slides.

Avoid long transition sequences.

---

# Timing

Recommended durations

- Micro interactions: 100–200ms
- Hover effects: 150–250ms
- UI transitions: 200–400ms
- Section reveals: 300–700ms
- Hero sequences: 800–1500ms

Maintain consistent timing throughout the project.

---

# Easing

Preferred easing

- ease-out
- ease-in-out
- Spring animations for interactive elements

Avoid linear motion for UI interactions unless appropriate.

---

# Performance

Maintain

- 60 FPS animations
- Low CPU usage
- Low GPU usage
- Minimal layout shifts

Use GPU-friendly properties

- transform
- opacity

Avoid animating

- width
- height
- top
- left

unless necessary.

---

# Reduced Motion

Respect the user's operating system preference.

When `prefers-reduced-motion` is enabled

- Disable decorative animations
- Remove parallax
- Simplify transitions
- Keep essential feedback only

Accessibility always takes priority over visual effects.

---

# Mobile Experience

Replace hover-only interactions with touch-friendly feedback.

Reduce animation complexity on smaller devices.

Maintain responsiveness and battery efficiency.

---

# Animation Consistency

Every animation should feel like it belongs to the same design language.

Use consistent

- Durations
- Easing
- Distances
- Opacity changes
- Motion curves

Avoid mixing unrelated animation styles.

---

# Forbidden

❌ Infinite decorative animations

❌ Flashing effects

❌ Excessive particle systems

❌ Scroll hijacking

❌ Random bounce animations

❌ Overlapping timelines

❌ Animating every element

❌ Heavy GPU usage without purpose

---

# Animation Checklist

Before shipping an animation, verify

✓ It has a clear purpose

✓ It improves the user experience

✓ It is smooth at 60 FPS

✓ It works on desktop and mobile

✓ It respects reduced-motion settings

✓ It does not block interaction

✓ It matches the portfolio's visual language

✓ It does not negatively impact performance

---

# Definition of Done

An animation is complete only if it is

✓ Intentional

✓ Smooth

✓ Performant

✓ Accessible

✓ Consistent

✓ Lightweight

✓ Production-ready