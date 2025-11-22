# Neon Futuristic Theme Guide

## Overview
A complete dark futuristic UI theme with neon gradient colors (purple, pink, magenta), glassmorphism effects, and modern SaaS aesthetics.

## Color Palette

### Primary Colors
- **Primary**: `#A020F0` (Vibrant Purple)
- **Secondary**: `#FF00CC` (Hot Pink)
- **Accent**: `#D400FF` (Magenta)

### Gradient Colors
- **Gradient Start**: `#A020F0` (Vibrant Purple)
- **Gradient Mid**: `#D400FF` (Magenta)
- **Gradient End**: `#FF00CC` (Hot Pink)

### Background Colors
- **Primary Background**: `#000000` (Deep Black)
- **Secondary Background**: `#0A0A0A` (Charcoal Gray)
- **Tertiary Background**: `#1A1A1A` (Card Background)

### Text Colors
- **Primary Text**: `#FFFFFF` (White)
- **Secondary Text**: `#E5E5E5` (Soft Gray)
- **Muted Text**: `#A0A0A0` (Muted Gray)

## CSS Utility Classes

### Neon Glow Effects
- `.neon-glow-purple` - Purple glow effect
- `.neon-glow-pink` - Pink glow effect
- `.neon-glow-magenta` - Magenta glow effect
- `.neon-glow-gradient` - Combined gradient glow
- `.neon-glow-strong` - Stronger glow effect
- `.neon-glow-text` - Text with neon glow

### Gradient Backgrounds
- `.bg-neon-gradient` - Main neon gradient (135deg)
- `.bg-neon-gradient-radial` - Radial gradient
- `.bg-neon-gradient-blur` - Blurred gradient with backdrop
- `.bg-neon-gradient-vertical` - Vertical gradient
- `.bg-neon-gradient-horizontal` - Horizontal gradient

### Glassmorphism
- `.glass` - Basic glassmorphism effect
- `.glass-strong` - Stronger glassmorphism
- `.glass-hover` - Glassmorphism with hover effects
- `.glass-card` - Card-style glassmorphism

### Buttons
- `.btn-neon-primary` - Primary neon button with gradient
- `.btn-neon-outline` - Outline neon button

### Cards
- `.card-neon` - Standard neon card with glassmorphism
- `.card-neon-gradient` - Gradient neon card

### Text Effects
- `.text-neon-gradient` - Gradient text effect
- `.text-neon-glow` - Text with neon glow

### Animations
- `.animate-neon-pulse` - Pulsing neon animation
- `.animate-gradient` - Animated gradient shift

## Components Created

### 1. HeroSection (`src/components/HeroSection.jsx`)
A full-screen hero section with:
- Animated background gradients
- Floating glow orbs
- Neon-styled badge
- Gradient text headings
- CTA buttons (primary + outline)
- Stats grid with neon cards

### 2. NeonButtons (`src/components/NeonButtons.jsx`)
Button showcase component with:
- Primary buttons (various sizes)
- Outline buttons (various sizes)
- Buttons with icons
- Disabled states

### 3. NeonCards (`src/components/NeonCards.jsx`)
Card showcase component with:
- Standard neon cards
- Gradient neon cards
- Glassmorphism cards
- Financial dashboard-style cards

## Updated Components

### Dashboard (`src/pages/Dashboard.jsx`)
- All colors updated to neon theme
- Charts use neon gradient colors
- Cards use glassmorphism
- Buttons use neon styling
- Background changed to dark theme

### Navbar (`src/components/Navbar.jsx`)
- Glassmorphism header
- Neon gradient logo
- Neon-styled navigation links
- Active state with neon glow

### Footer (`src/components/Footer.jsx`)
- Dark background with neon accents
- Glassmorphism cards
- Neon-styled links and icons
- Gradient effects

## Usage Examples

### Basic Button
```jsx
<button className="btn-neon-primary">
  Click Me
</button>
```

### Outline Button
```jsx
<button className="btn-neon-outline">
  Click Me
</button>
```

### Neon Card
```jsx
<div className="card-neon">
  <h3 className="text-neon-gradient">Title</h3>
  <p className="text-white">Content</p>
</div>
```

### Gradient Card
```jsx
<div className="card-neon-gradient">
  <h3 className="text-white">Title</h3>
  <p className="text-white/80">Content</p>
</div>
```

### Glassmorphism Element
```jsx
<div className="glass glass-hover">
  Glassmorphism content
</div>
```

### Text with Neon Glow
```jsx
<h1 className="text-neon-glow">
  Glowing Text
</h1>
```

### Gradient Text
```jsx
<h1 className="text-neon-gradient">
  Gradient Text
</h1>
```

## Theme Configuration

The theme is configured in `src/index.css` using Tailwind CSS v4's `@theme` directive. All custom colors, gradients, and utilities are defined there.

## Notes

- All components maintain their original structure
- Only colors and styling have been updated
- The theme is fully responsive
- All animations are smooth and performant
- Glassmorphism effects use backdrop-filter for modern browsers





