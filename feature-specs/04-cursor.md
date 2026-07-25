# Feature Specification — Custom Cursor

## Feature ID

04-custom-cursor

---

# Purpose

The custom cursor replaces the default system cursor with a premium, smooth, and interactive experience.

It should provide visual feedback, improve immersion, and reinforce the portfolio's futuristic design language.

The cursor should feel lightweight, responsive, and natural.

It must never reduce usability.

---

# Design Goals

The cursor should feel

- Smooth
- Premium
- Lightweight
- Responsive
- Intelligent
- Interactive
- Modern

It should disappear into the experience rather than become the focus.

---

# Components

The cursor consists of

1. Main Cursor
2. Cursor Ring
3. Cursor Trail
4. Hover Effects
5. Magnetic Interactions
6. Click Feedback
7. Ripple Effects

Each layer has a single responsibility.

---

# Cursor States

The cursor changes depending on context.

## Default

Small glowing circle.

Soft motion.

No scaling.

---

## Hover

When hovering interactive elements

- Slight scale increase
- Accent glow
- Cursor ring expands
- Smooth interpolation

---

## Button

Hovering buttons

- Cursor enlarges
- Magnetic attraction begins
- Soft pulse
- Ripple on click

---

## Links

Hovering links

- Ring expands
- Underline animation starts
- Accent color

---

## Text

Over text

- Cursor becomes minimal
- Native text selection preserved

Do not replace the text caret.

---

## Loading

During loading sequences

- Circular progress animation
- Rotation
- Accent glow

---

## Disabled

Hidden on

- Touch devices
- Small screens
- Devices without hover support

The default system cursor remains.

---

# Movement

Cursor should

- Smoothly interpolate
- Slightly lag behind the mouse
- Never feel delayed

Target latency

```
16ms
```

Target frame rate

```
60 FPS
```

---

# Cursor Trail

Trail should

- Fade naturally
- Be subtle
- Use opacity
- Follow movement

Maximum trail length

8–12 particles

Never leave permanent artifacts.

---

# Magnetic Elements

Apply magnetic interaction only to

- Primary buttons
- Secondary buttons
- Social icons
- Navigation links
- Project cards
- Resume button

Maximum pull distance

```
20px
```

Maximum element movement

```
10px
```

The magnetic effect should assist interaction, not fight the user's movement.

---

# Ripple Effects

Ripple appears on

- Name hover
- Buttons
- Hero headings
- Featured project cards

Ripple

- Expands
- Fades
- Uses accent colors
- Lasts under 500ms

Do not use ripples globally.

---

# Interactive Highlights

When hovering interactive elements

Allowed effects

- Glow
- Border highlight
- Slight elevation
- Cursor expansion
- Soft lighting

Avoid exaggerated animations.

---

# Cursor Blend Modes

Optional

Use subtle blend modes only when they improve visibility.

Avoid effects that make text difficult to read.

---

# Click Animation

On click

- Cursor compresses slightly
- Ring contracts
- Small ripple appears
- Return to normal

Duration

```
150ms
```

---

# Hero Interaction

Inside the Hero section

Cursor additionally controls

- Mouse lighting
- Gradient movement
- Background depth
- Avatar perspective
- Floating objects

Maximum movement

Very subtle.

---

# Project Cards

Hovering a project card

- Card lifts slightly
- Cursor grows
- Border glows
- Screenshot reacts subtly

---

# Navigation

Hovering navigation links

- Cursor expands
- Active underline follows
- Magnetic effect enabled

---

# Accessibility

Respect

```
prefers-reduced-motion
```

When enabled

- Disable cursor trail
- Disable magnetic movement
- Disable ripple effects
- Keep only basic hover feedback

Never hide the cursor completely.

---

# Mobile Behavior

Disable custom cursor on

- Phones
- Tablets
- Touch-only devices

Use native interactions instead.

---

# Performance

Maintain

- 60 FPS
- GPU-accelerated transforms
- Minimal DOM updates

Use

- `transform`
- `translate3d`
- `requestAnimationFrame`

Avoid

- Frequent layout recalculations
- Heavy filters
- Large particle counts

---

# Animation Stack

Simple movement

CSS

↓

Cursor interpolation

Framer Motion

↓

Magnetic interactions

GSAP

↓

Only if advanced timelines are needed

---

# Technical Rules

- Use a single global cursor component
- Hide the default cursor only on supported devices
- Use event delegation where possible
- Clean up all event listeners
- Avoid unnecessary re-renders

---

# Future Enhancements

Possible additions

- Context-aware cursor labels
- "View Project" preview cursor
- Drag indicators
- Sound feedback (optional)
- AI assistant interaction mode
- Dynamic cursor themes

---

# Assets

Icons

Lucide React

Colors

Use design tokens only

Never hardcode colors.

---

# Success Criteria

The custom cursor is complete when

✓ Movement feels smooth

✓ Hover reactions are responsive

✓ Magnetic elements feel natural

✓ Cursor trail is subtle

✓ Ripple effects are lightweight

✓ Mobile devices use the native cursor

✓ Reduced-motion preferences are respected

✓ No measurable performance degradation

✓ 60 FPS is maintained

✓ The cursor enhances the experience without distracting from the content

---

# Inspiration

Inspired by the interaction quality of

- aaabadcode.com → Smooth cursor lighting
- aakarsh-devhq.vercel.app → Mouse-reactive background
- mannan.io → Interactive hover effects
- Linear → Subtle UI responsiveness
- Framer → Premium motion language

These are experience references only.

Do **not** copy layouts, code, or exact animations.

Create a unique interaction system that fits the portfolio's overall design language.