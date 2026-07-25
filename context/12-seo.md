# SEO

## Purpose

SEO should be built into the project from the beginning, not added after development.

Every page should be discoverable, fast, and optimized for both search engines and social media sharing.

---

# SEO Goals

Target

- Lighthouse SEO: **100**
- Semantic HTML throughout the project
- Fast indexing
- Rich social previews
- Excellent Core Web Vitals

---

# Metadata

Every page must define metadata using the Next.js Metadata API.

Include

- Title
- Description
- Keywords
- Canonical URL
- Robots
- Open Graph
- Twitter Card
- Icons

Titles and descriptions should be unique for every page.

---

# Dynamic Metadata

Pages requiring dynamic metadata

- Home
- Projects
- Individual Project Pages
- Blog (if added later)

Each project page should generate

- Project title
- Description
- Preview image
- URL
- Keywords

---

# Semantic HTML

Use semantic elements wherever possible.

Preferred structure

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Avoid unnecessary `<div>` wrappers when semantic elements exist.

---

# Heading Structure

Maintain a logical heading hierarchy.

Example

```
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

Rules

- One `<h1>` per page
- Do not skip heading levels
- Headings should describe the content below them

---

# Open Graph

Every page should define

- Title
- Description
- URL
- Preview Image
- Site Name
- Type

This ensures rich previews on platforms like LinkedIn, Discord, WhatsApp, Facebook, and X.

---

# Twitter Card

Use

- Summary Large Image

Include

- Title
- Description
- Preview Image

---

# Canonical URLs

Every page should specify a canonical URL.

This helps prevent duplicate-content issues.

---

# Structured Data (JSON-LD)

Use JSON-LD where appropriate.

Recommended schemas

- Person
- WebSite
- WebPage
- BreadcrumbList
- CreativeWork (for projects)

This helps search engines better understand the portfolio.

---

# Sitemap

Automatically generate

```
/sitemap.xml
```

Include all public pages.

Update automatically when new pages are added.

---

# robots.txt

Provide a valid

```
/robots.txt
```

Allow indexing of public pages.

Block only private or development routes.

---

# Favicons

Provide

- favicon.ico
- Apple Touch Icon
- Android Icons
- Manifest

Ensure icons are optimized for all devices.

---

# Images

Every image should

- Use descriptive filenames
- Include alt text
- Be optimized
- Use modern formats (WebP or AVIF where possible)

Avoid generic names like

```
image1.png
```

Prefer

```
hero-avatar.webp
project-codeazy.webp
```

---

# Performance & SEO

SEO depends on performance.

Optimize

- Images
- Fonts
- JavaScript
- CSS
- Bundle size

Maintain excellent Core Web Vitals.

---

# URLs

Use clean, readable URLs.

Good

```
/projects/codeazy
/about
/contact
```

Avoid

```
/page?id=123
```

---

# Internal Linking

Link related sections and pages naturally.

Examples

- Hero → Projects
- Projects → GitHub
- About → Resume
- Contact → Social Links

This improves navigation and SEO.

---

# Accessibility & SEO

Accessibility improvements also benefit SEO.

Maintain

- Semantic HTML
- Alt text
- Proper heading structure
- Descriptive link text

---

# Mobile SEO

The mobile version should provide the same content and metadata as the desktop version.

Avoid hiding important content on smaller screens.

---

# Social Sharing

Ensure every shared link displays

- Correct title
- Description
- Preview image

Test previews on common platforms before deployment.

---

# Analytics

Use lightweight analytics.

Preferred

- Vercel Analytics

Monitor

- Traffic
- Page performance
- Core Web Vitals

Respect user privacy.

---

# SEO Checklist

Before deployment, verify

✓ Lighthouse SEO score of 100

✓ Unique page titles

✓ Unique meta descriptions

✓ Open Graph tags

✓ Twitter Card tags

✓ Canonical URLs

✓ JSON-LD structured data

✓ Sitemap generated

✓ robots.txt configured

✓ Optimized images

✓ Semantic HTML

✓ Accessible content

✓ Mobile-friendly layout

---

# Never Do

❌ Duplicate page titles

❌ Duplicate meta descriptions

❌ Missing alt text

❌ Multiple `<h1>` elements

❌ Generic image filenames

❌ Broken internal links

❌ Index development or private routes

❌ Ignore Core Web Vitals

---

# Definition of Done

A page is SEO-complete only if it is

✓ Search engine friendly

✓ Social media optimized

✓ Accessible

✓ Semantically structured

✓ Fast

✓ Mobile responsive

✓ Properly indexed

✓ Lighthouse SEO score of 100