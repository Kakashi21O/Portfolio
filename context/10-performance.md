# Performance

## Purpose

Performance is a core feature of this portfolio.

Every animation, component, asset, and dependency must justify its impact on performance.

Visual quality should never come at the expense of responsiveness.

---

# Performance Goals

Target Metrics

- Lighthouse Performance: **95+**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**

Core Web Vitals

- Largest Contentful Paint (LCP): < 2.5s
- Interaction to Next Paint (INP): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

Target Frame Rate

- 60 FPS on modern desktops
- Smooth experience on mid-range laptops
- Graceful degradation on mobile devices

---

# Loading Strategy

Prioritize fast initial page rendering.

Load only what is immediately required.

Everything else should be deferred.

Use

- Dynamic imports
- Code splitting
- Lazy loading
- Suspense
- Streaming (where appropriate)

Never block the initial render with heavy assets.

---

# Images

Use the Next.js Image component.

Requirements

- WebP or AVIF where possible
- Lazy loading
- Responsive sizes
- Proper dimensions
- Optimized quality

Avoid oversized images.

---

# Fonts

Use

- Variable fonts
- Font optimization
- Font preloading for critical fonts

Limit to two font families.

Avoid layout shifts caused by fonts.

---

# Three.js

Three.js should remain lightweight.

Rules

- Lazy load all 3D scenes
- Optimize meshes
- Compress textures
- Reuse materials
- Dispose of unused resources
- Pause rendering when off-screen if practical

Avoid

- High-polygon models
- Large texture files
- Unnecessary post-processing
- Complex physics simulations

---

# Animations

Animate only

- opacity
- transform

Avoid animating

- width
- height
- top
- left

Use CSS for simple transitions.

Use Framer Motion for UI.

Use GSAP only for advanced sequences.

---

# Scrolling

Use Lenis for smooth scrolling.

Requirements

- Responsive
- Lightweight
- Respect reduced-motion preferences

Avoid excessive scroll-triggered effects.

---

# JavaScript

Minimize JavaScript sent to the client.

Prefer

- Server Components
- Tree shaking
- Dynamic imports
- Code splitting

Remove unused dependencies.

---

# CSS

Keep styles maintainable.

Remove unused styles.

Avoid duplicate utility classes.

Extract reusable patterns into components.

---

# Data

Keep static content in JSON files.

Avoid hardcoding repeated values.

Cache data when appropriate.

---

# Bundle Size

Monitor bundle size regularly.

Lazy load

- Three.js
- GSAP timelines
- Heavy components
- Media assets

Only include libraries that provide clear value.

---

# Network Optimization

Use

- Compression
- Caching
- Modern image formats
- Optimized fonts

Minimize network requests where possible.

---

# Mobile Performance

Mobile devices should receive the same experience with reduced computational cost.

Reduce

- Particle density
- Animation complexity
- GPU-intensive effects

Prioritize battery efficiency.

---

# Accessibility & Motion

Respect `prefers-reduced-motion`.

When enabled

- Disable decorative animations
- Remove parallax
- Simplify transitions
- Keep essential interaction feedback

Accessibility takes priority over visual effects.

---

# Monitoring

Before every release, verify

- Lighthouse score
- Core Web Vitals
- Bundle size
- Console warnings
- TypeScript errors
- ESLint warnings

---

# Performance Checklist

Before marking a feature complete

✓ Lighthouse ≥ 95

✓ 60 FPS maintained

✓ Images optimized

✓ Fonts optimized

✓ Lazy loading implemented

✓ Heavy components dynamically imported

✓ No unnecessary re-renders

✓ No memory leaks

✓ No unused dependencies

✓ Responsive across devices

---

# Never Do

❌ Load all animations on page load

❌ Render unnecessary Three.js scenes

❌ Use unoptimized images

❌ Import entire libraries when only a small part is needed

❌ Block rendering with large assets

❌ Sacrifice usability for visual effects

---

# Definition of Done

A feature meets the project's performance standards only if it is

✓ Fast

✓ Responsive

✓ Optimized

✓ Accessible

✓ Smooth

✓ Scalable

✓ Production-ready