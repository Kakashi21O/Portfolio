# Design System

## Typography
- **Primary Font**: Geist / Inter (sans-serif)
- **Secondary Font**: (System Fallbacks)

## Color Palette (Dark Theme First)
- **Background**: `hsl(var(--background))`
- **Foreground**: `hsl(var(--foreground))`
- **Primary**: `hsl(var(--primary))`
- **Secondary**: `hsl(var(--secondary))`
- **Accent**: `hsl(var(--accent))`
- **Destructive**: `hsl(var(--destructive))`
- **Muted**: `hsl(var(--muted))`

## Components

### UI Primitives (shadcn/ui)
- **Button**: Standard interactive element. Supports variants (default, outline, ghost, link, destructive).
- **Card**: Container for grouping related information.
- **Dialog**: Modal window for focused tasks or interactions.
- **Input**: Standard single-line text input field.
- **Tabs**: For switching between different views.
- **Textarea**: Multi-line text input field.
- **ScrollArea**: Custom scrollbar component for overflow content.

## Icons
- **Library**: `lucide-react`

## Utilities
- `cn()`: Utility for merging Tailwind CSS classes efficiently (combines `clsx` and `tailwind-merge`).
