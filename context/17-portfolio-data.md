# Portfolio Data Structures

## Purpose

This document defines every data structure used throughout the portfolio.

All portfolio content must be stored as structured JSON rather than hardcoded inside React components.

Components should only render data.

Business logic and content must remain separated.

This makes the portfolio easier to update, scale, localize, and maintain.

---

# Directory

```
data/

projects.json
skills.json
timeline.json
experience.json
education.json
certificates.json
achievements.json
socials.json
github.json
navigation.json
music.json
seo.json
site.json
```

---

# Global Rules

Every JSON file should

✓ Have a predictable structure

✓ Use camelCase keys

✓ Be human readable

✓ Never duplicate data

✓ Be reusable

✓ Be easily editable without changing code

---

# Projects

File

```
projects.json
```

Structure

```json
{
  "id": "",
  "slug": "",
  "featured": true,
  "title": "",
  "shortDescription": "",
  "description": "",
  "thumbnail": "",
  "coverImage": "",
  "status": "",
  "year": "",
  "category": "",
  "technologies": [],
  "github": "",
  "demo": "",
  "documentation": "",
  "problem": "",
  "planning": "",
  "development": "",
  "architecture": "",
  "features": [],
  "challenges": [],
  "solutions": [],
  "results": [],
  "screenshots": [],
  "futurePlans": [],
  "gallery": [],
  "video": "",
  "metrics": {
    "commits": 0,
    "files": 0,
    "duration": "",
    "teamSize": 1
  }
}
```

---

# Skills

File

```
skills.json
```

Structure

```json
{
  "languages": [],
  "backend": [],
  "frontend": [],
  "database": [],
  "devops": [],
  "cloud": [],
  "ai": [],
  "tools": [],
  "currentlyLearning": []
}
```

Every skill should contain

```json
{
  "name": "",
  "icon": "",
  "level": "",
  "experience": "",
  "featured": true
}
```

---

# Timeline

File

```
timeline.json
```

Structure

```json
{
  "year": "",
  "title": "",
  "description": "",
  "icon": "",
  "image": "",
  "tags": [],
  "completed": true
}
```

Examples

- First Computer
- Started Coding
- Learned Python
- Discord Automation
- Backend Development
- FastAPI
- Docker
- AI
- Future Goals

---

# Experience

File

```
experience.json
```

Structure

```json
{
  "company": "",
  "role": "",
  "duration": "",
  "location": "",
  "description": "",
  "technologies": [],
  "highlights": []
}
```

---

# Education

File

```
education.json
```

Structure

```json
{
  "institution": "",
  "degree": "",
  "field": "",
  "duration": "",
  "cgpa": "",
  "coursework": []
}
```

---

# Certificates

File

```
certificates.json
```

Structure

```json
{
  "title": "",
  "issuer": "",
  "date": "",
  "credential": "",
  "link": "",
  "image": ""
}
```

---

# Achievements

File

```
achievements.json
```

Structure

```json
{
  "title": "",
  "description": "",
  "date": "",
  "organization": "",
  "icon": ""
}
```

---

# Social Links

File

```
socials.json
```

Structure

```json
{
  "github": "",
  "linkedin": "",
  "email": "",
  "instagram": "",
  "discord": "",
  "twitter": "",
  "website": ""
}
```

---

# GitHub

File

```
github.json
```

Structure

```json
{
  "username": "",
  "featuredRepositories": [],
  "showContributionGraph": true,
  "showStats": true,
  "showLanguages": true,
  "showRecentActivity": true,
  "showPinnedRepositories": true
}
```

Future API response should map into this structure.

---

# Navigation

File

```
navigation.json
```

Structure

```json
[
  {
    "title": "",
    "href": "",
    "icon": ""
  }
]
```

---

# Music

File

```
music.json
```

Structure

```json
{
  "enabled": false,
  "volume": 0.4,
  "playlist": [
    {
      "title": "",
      "artist": "",
      "file": ""
    }
  ]
}
```

---

# SEO

File

```
seo.json
```

Structure

```json
{
  "title": "",
  "description": "",
  "keywords": [],
  "author": "",
  "siteUrl": "",
  "ogImage": ""
}
```

---

# Site

File

```
site.json
```

Contains global information.

```json
{
  "name": "",
  "title": "",
  "tagline": "",
  "location": "",
  "availability": "",
  "resume": "",
  "avatar": ""
}
```

---

# Future API Integration

The data layer should allow replacing local JSON with

- GitHub API
- CMS
- Database
- Markdown
- MDX

without changing UI components.

---

# Validation Rules

Every JSON file should

✓ Be valid JSON

✓ Follow one schema

✓ Avoid duplicated values

✓ Use descriptive keys

✓ Remain human editable

---

# Never Do

❌ Hardcode content inside React components

❌ Duplicate project information

❌ Mix UI with data

❌ Store secrets in JSON

❌ Create inconsistent schemas

---

# Definition of Done

The data architecture is complete when

✓ Every section reads from structured data

✓ Components contain no hardcoded portfolio content

✓ New content can be added by editing JSON only

✓ Data is reusable across the entire project

✓ The architecture is ready for future CMS or API integration