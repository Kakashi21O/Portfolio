# Feature Specification — Hero Section

## Feature ID

01-hero

---

# Purpose

The Hero section is the most important part of the portfolio.

It should immediately communicate who Mantu Yadav is while creating a memorable first impression through polished animations, subtle interactions, and premium design.

The visitor should understand within 5 seconds:

- Who I am
- What I build
- What technologies I enjoy
- Why this portfolio is different

The Hero should feel like an introduction to a story rather than a landing page.

---

# Layout

Height

```
100vh
```

Maximum Width

```
1400px
```

Content Alignment

Centered vertically.

Split Layout

```
-----------------------------------------

Left Side

• Greeting
• Name
• Animated Roles
• Description
• CTA Buttons
• Social Icons

Right Side

• Anime Avatar
• Floating 3D Object
• Mouse Reactive Lighting

-----------------------------------------
```

On Mobile

Avatar moves above content.

Everything becomes vertically stacked.

---

# Greeting

Small text

```
Hello, I'm
```

Animated fade-in.

---

# Name

```
Mantu Yadav
```

Large typography.

Responsive.

Desktop

```
72–96px
```

Tablet

```
64px
```

Mobile

```
48px
```

Effects

- Gradient text
- Soft glow
- Mouse ripple effect
- Slight hover distortion
- Letter reveal animation

---

# Animated Roles

Typing animation.

Roles rotate continuously.

```
Python Developer

↓

Backend Engineer

↓

FastAPI Developer

↓

DevOps Learner

↓

Automation Enthusiast

↓

Open Source Learner
```

Requirements

- Smooth typing
- Smooth deleting
- Cursor blink
- Infinite loop
- No flickering

Pause

```
2 seconds
```

Transition

```
300ms
```

---

# Description

Two to three short sentences.

Example

```
I enjoy building backend systems,
automation tools, and AI-powered applications
that solve real-world problems.

Currently exploring DevOps,
system design, and scalable software architecture.
```

Fade upward.

Maximum width

```
600px
```

---

# CTA Buttons

Primary

```
View Projects
```

Secondary

```
Download Resume
```

Optional

```
Contact Me
```

Effects

- Magnetic
- Glow
- Ripple
- Smooth hover

---

# Social Links

Show

- GitHub
- LinkedIn
- Email
- Instagram
- Discord

Hover

- Glow
- Scale
- Tooltip

---

# Anime Avatar

Style

- Anime inspired
- Programmer
- Modern
- Clean
- Transparent background

Animation

- Floating
- Slight breathing
- Mouse depth movement
- Eye follow effect (optional)

Responsive

Never overflow.

---

# Background

Background should feel alive.

Include

- Animated gradient
- Floating particles
- Noise texture
- Mouse reactive lighting
- Soft moving blobs
- Small stars

Movement

Very slow.

Should never distract from content.

---

# Mouse Interaction

Mouse movement controls

- Lighting
- Depth
- Gradient movement
- Avatar rotation (slight)
- Hero object perspective

Maximum rotation

```
5°
```

---

# 3D Object

Purpose

Decorative only.

Examples

- Floating cube
- Wireframe sphere
- Python logo abstraction
- Glass orb
- Low-poly crystal

Requirements

- Lightweight
- Lazy loaded
- GPU optimized
- <100KB if possible

Never distract from the content.

---

# Scroll Indicator

Bottom center

Animated

```
↓

Scroll to Explore
```

Animation

- Bounce
- Fade

Click

Smooth scroll to About section.

---

# Entrance Animation

Order

Greeting

↓

Name

↓

Roles

↓

Description

↓

Buttons

↓

Social Icons

↓

Avatar

↓

Background

No animation should overlap excessively.

---

# Cursor Effects

Cursor should interact with

- Buttons
- Name
- Avatar
- Social Icons

States

- Default
- Hover
- Magnetic
- Loading

---

# Responsive Behavior

Desktop

Split layout.

Tablet

Smaller spacing.

Avatar reduced.

Mobile

Single column.

Buttons stacked.

Avatar above content.

Particles reduced.

---

# Accessibility

Support

- Keyboard navigation
- Reduced motion
- Semantic HTML
- Screen readers

Typing animation should pause when reduced motion is enabled.

---

# Performance

Target

60 FPS

Lazy load

- Three.js
- Particles
- Avatar effects

Avoid

Heavy shaders.

---

# Animation Stack

Simple

CSS

↓

Medium

Framer Motion

↓

Complex

GSAP

↓

3D

Three.js

---

# Assets

Avatar

```
public/avatar/
```

Particles

Canvas.

Icons

Lucide.

Fonts

Geist Sans

Geist Mono

---

# Future Enhancements

Possible additions

- Voice introduction
- AI assistant
- Interactive terminal
- Day counter
- Currently Playing
- Live GitHub activity

---

# Success Criteria

The Hero is complete when

✓ First impression feels premium

✓ Name is immediately visible

✓ Role animation is smooth

✓ Avatar feels alive

✓ Background adds depth without distraction

✓ Responsive on all devices

✓ Lighthouse Performance ≥95

✓ Accessibility score 100

✓ No layout shift

✓ Smooth 60 FPS animations

✓ Hero loads in under 2 seconds

---

# Inspiration

The Hero should combine inspiration from:

- aaabadcode.com → Cursor lighting
- redoyanulhaque.me → Lightweight 3D interaction
- aadi.is-a.dev → Music player
- aakarsh-devhq.vercel.app → Mouse-reactive background
- aashishjaini.me → Creative intro transition
- awrs.me → Smooth storytelling scroll
- mannan.io → Water/ripple hover effect

These are references only.

Do **not** copy layouts, assets, animations, or code. Create an original design language inspired by the overall experience.