# My Bright Blog - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Pinterest's artistic masonry layout combined with Vincent van Gogh's impressionistic painting aesthetics, creating an expressive and visually rich blog platform.

## Core Design Philosophy
An artistic personal blog platform that celebrates creativity through Van Gogh-inspired swirl animations, painterly textures, and a warm, inviting color palette. The design balances artistic expression with functional blog management.

## Color Palette

### Primary Colors
- **Crimson Red**: 348 83% 47% (primary brand, CTAs, red balloon logo)
- **Golden Yellow**: 51 100% 50% (secondary accents, highlights)
- **Royal Blue**: 225 73% 57% (accent for links, interactive elements)

### Background & Text
- **Cornsilk**: 48 100% 93% (main background)
- **Dark Slate Gray**: 180 25% 25% (body text)
- **Tomato**: 9 100% 64% (hover states, highlights)

## Typography
- **Display/Headings**: Playfair Display (serif, elegant)
- **Body Text**: Merriweather (serif, readable)
- **UI Elements**: Roboto (sans-serif, clean)

## Layout System

### Spacing Scale
Use Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm

### Grid Patterns
- **Masonry Layout**: Pinterest-style for blog posts and photo gallery
- **Standard Grid**: 2-3 columns for portfolio items (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Container**: max-w-7xl for main content areas

## Component Library

### Cards
- Artistic card designs with subtle brush stroke borders (border-2 with custom painterly effect)
- Slight rotation transforms (rotate-1, -rotate-1) for dynamic feel
- Soft shadows with warm tones
- Hover: gentle lift animation, enhanced shadow

### Buttons
- Primary: Crimson red background, white text, rounded corners
- Secondary: Outline style with royal blue
- When on images: blurred background (backdrop-blur-sm)
- No custom hover states (use native button states)

### Navigation
- Fixed header with floating red balloon logo
- Transparent background with backdrop blur
- Smooth scroll behavior
- Active states with golden yellow underline

### Forms
- Cornsilk background inputs with dark slate gray text
- Crimson red focus rings
- Emoji picker with colorful grid layout
- Tag system with pill-style badges (crimson red with white text)

### Image Gallery
- Masonry grid layout (columns-2 md:columns-3 lg:columns-4)
- Lightbox viewer with blur overlay
- Smooth transitions and lazy loading

## Visual Elements

### Van Gogh Swirl Animations
- Subtle rotating swirl overlays on hero section
- CSS keyframe animations with 20-30s duration
- Opacity 0.1-0.2 for non-intrusive effect

### Painterly Textures
- Canvas-like texture overlay on backgrounds
- Rough brush stroke borders on cards
- Watercolor-inspired gradient transitions

### Red Balloon Elements
- Floating balloon logo in header
- Subtle floating animation (translateY)
- Small balloon decorations scattered throughout
- SVG-based with crimson red fill

## Page-Specific Guidelines

### Home Page
- **Hero Section**: Full-width with Van Gogh swirl animation background, centered bio, large red balloon logo, cornsilk overlay
- **Portfolio Section**: 3-column grid of artistic project cards with hover effects
- **Blog Preview**: Masonry layout showing 6-9 recent posts
- **Contact Form**: Two-column layout (form + contact info), emoji reactions

### Add Blog Page
- Clean single-column layout (max-w-3xl)
- Rich text editor with toolbar (golden yellow accents)
- Image upload area with drag-and-drop, preview thumbnails
- Emoji picker modal with colorful grid
- Tag input with auto-suggestions

### Photo Gallery
- Full-width masonry columns layout
- Hover: scale and overlay with image title
- Click: lightbox with navigation arrows

### Motivation Page
- Centered quote card with artistic border
- Daily rotation with smooth fade transitions
- Save favorites feature with heart icon (tomato color)
- Background with subtle Van Gogh texture

### Streak Tracking
- Visual calendar grid with completed days (golden yellow), current day (crimson red)
- Statistics cards showing total posts, current streak, best streak
- Confetti animation on milestone achievements

### Mini-Games Section
- Game cards in 2-column grid
- Memory card game with Van Gogh paintings
- Color matching game with palette colors
- Playful, accessible interactions

## Animations
- **Entrance**: Fade-in with slight slide (0.3s ease-out)
- **Hover**: Gentle scale (1.02-1.05), lift effect
- **Page Transitions**: Smooth fade (0.2s)
- **Swirls**: Continuous slow rotation (20-30s)
- **Balloon Float**: Gentle up-down movement (4-6s)

## Images
- **Hero Image**: Use artistic/abstract photography or Van Gogh-style painting as background (full-width, overlay with cornsilk tint)
- **Blog Post Cards**: Featured image with 16:9 or 4:3 aspect ratio
- **Gallery**: User-uploaded photos in original aspect ratios
- **About Section**: Personal photo with painterly border effect
- **Motivation Page**: Inspirational imagery or artistic backgrounds

## Accessibility
- Maintain WCAG AA contrast ratios
- Focus indicators using crimson red outline (2px)
- Keyboard navigation for all interactive elements
- Alt text for all images
- Semantic HTML structure

## Responsive Behavior
- Mobile: Single column, simplified masonry (columns-1)
- Tablet: Two-column grids (md:columns-2, md:grid-cols-2)
- Desktop: Full masonry and multi-column layouts (lg:columns-4, lg:grid-cols-3)
- Floating elements scale down on mobile