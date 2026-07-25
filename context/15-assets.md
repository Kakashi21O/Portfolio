# Assets

## Purpose

Assets are a key part of the portfolio experience.

Every image, icon, animation, audio file, and 3D model should contribute to the portfolio's premium feel while maintaining excellent performance.

Assets should always be optimized before being added to the project.

---

# Asset Principles

Every asset should be

- High quality
- Lightweight
- Optimized
- Consistent
- Purposeful

Avoid decorative assets that do not improve the user experience.

---

# Avatar

Style

- Anime-inspired
- Modern
- Clean
- Professional
- Friendly
- Developer-themed

Requirements

- Transparent background
- High resolution
- Consistent with portfolio branding
- Optimized for web
- Responsive

Recommended Formats

- WebP
- PNG (transparent)

---

# Images

Use images only when they add value.

Examples

- Hero avatar
- Project previews
- Certificates
- Open Graph images
- Blog thumbnails (future)

Requirements

- WebP or AVIF preferred
- Responsive
- Lazy loaded
- Optimized
- Descriptive filenames

Example

```
avatar.webp
hero-avatar.webp
project-codeazy.webp
```

Avoid

```
image1.png
final-final.png
```

---

# Audio

Background music should enhance the experience without becoming distracting.

Style

- Soft
- Ambient
- Lo-fi
- Chill electronic
- Minimal piano
- Relaxing synth

Requirements

- Disabled by default
- Never autoplay
- Visible play/pause control
- Volume control
- User preference remembered during the session

Supported Formats

- MP3
- OGG

Keep audio files compressed for fast loading.

---

# Icons

Use a single icon style throughout the portfolio.

Preferred Libraries

- Lucide React
- Simple Icons (for technology logos)

Required Categories

## Technology

- Python
- TypeScript
- JavaScript
- React
- Next.js
- FastAPI
- Docker
- Git
- GitHub
- Tailwind CSS
- Three.js
- PostgreSQL
- Linux
- VS Code

## Social

- GitHub
- LinkedIn
- Email
- Instagram
- Discord

Icons should

- Match the overall design language
- Be scalable
- Include accessible labels
- Support hover and focus states

---

# Logos

Only use official brand logos.

Do not modify brand colors or proportions unless using monochrome variants for consistency.

---

# Favicons

Provide

- favicon.ico
- Apple Touch Icon
- Android Icons
- Web App Manifest

Ensure they remain sharp across devices.

---

# Open Graph Images

Every major page should have an Open Graph preview image.

Recommended Size

```
1200 × 630 px
```

Include

- Name
- Portfolio branding
- Minimal design
- High contrast

---

# Resume

Store the resume in PDF format.

Requirements

- Optimized file size
- Printable
- Mobile friendly
- Easy to update

Filename

```
Mantu-Yadav-Resume.pdf
```

---

# 3D Assets

Use only when meaningful.

Requirements

- Low polygon count
- Compressed textures
- Optimized materials
- Lazy loaded
- Reusable

Avoid unnecessarily complex models.

Preferred Formats

- glTF (.gltf)
- GLB (.glb)

---

# Fonts

Limit to two font families.

Requirements

- Variable fonts preferred
- Optimized loading
- Consistent typography
- Readable across devices

Avoid loading unnecessary font weights.

---

# Videos (Future)

If videos are added

- Compress before upload
- Lazy load
- Provide captions where appropriate
- Use modern formats

Preferred Format

- MP4 (H.264)
- WebM (optional)

---

# File Organization

Recommended structure

```
public/
│
├── avatars/
├── images/
├── icons/
├── audio/
├── models/
├── resume/
├── og/
├── favicon/
└── fonts/
```

---

# Naming Conventions

Use descriptive, lowercase, kebab-case filenames.

Examples

```
hero-avatar.webp
background-music.mp3
codeazy-preview.webp
github-icon.svg
portfolio-og.webp
developer-model.glb
```

Avoid

```
IMG001.png
newfile.png
final2.jpg
```

---

# Optimization

Before adding any asset

✓ Compress images

✓ Compress audio

✓ Optimize 3D models

✓ Remove unused metadata

✓ Verify responsive sizing

✓ Check loading performance

---

# Accessibility

Ensure

- Images include meaningful `alt` text
- Decorative images use `alt=""`
- Icons include accessible labels when interactive
- Audio controls are keyboard accessible
- Media does not autoplay

---

# Performance

Assets should never negatively impact performance.

Guidelines

- Lazy load non-critical assets
- Use modern formats
- Optimize file sizes
- Cache static assets
- Avoid duplicate files

---

# Never Do

❌ Use oversized images

❌ Autoplay audio

❌ Load all assets on page load

❌ Use inconsistent icon styles

❌ Store unoptimized 3D models

❌ Use generic filenames

❌ Add decorative assets without purpose

---

# Definition of Done

An asset is considered production-ready only if it is

✓ Optimized

✓ Accessible

✓ Responsive

✓ Consistent with the design system

✓ Properly organized

✓ Performance-friendly

✓ Production-ready