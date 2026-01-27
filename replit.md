# Rio da Casca Community Website

## Overview

This is a bilingual (Portuguese) community tourism and heritage website for the Rio da Casca community in Chapada dos Guimarães, Mato Grosso, Brazil. The site promotes ecotourism, environmental preservation, and local history—including the Elephant Sanctuary Brazil, historic Chalé dos Governadores, and natural attractions. It features a blog, photo gallery, newsletter subscription, contact forms, and project pages describing community development initiatives.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom theme variables (forest green primary, terracotta secondary, cream backgrounds)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for page transitions and scroll animations
- **Maps**: Leaflet/React-Leaflet for interactive location maps
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Validation**: Zod schemas with drizzle-zod integration
- **Error Handling**: Centralized error formatting with zod-validation-error

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with `db:push` command

### Database Schema
Four main tables:
1. `newsletter_subscribers` - Email subscriptions with active status
2. `contact_messages` - Contact form submissions with read status
3. `blog_posts` - CMS-style blog with slugs, categories, and publish status
4. `gallery_photos` - User-submitted photos with approval workflow

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and query client
│   │   └── data/         # Static JSON content
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database operations
│   └── static.ts     # Static file serving
├── shared/           # Shared code (schema, types)
└── migrations/       # Drizzle database migrations
```

### Build System
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Server dependencies are selectively bundled to reduce cold start times

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Connection pooling with `pg` package
- Session storage with `connect-pg-simple`

### Third-Party Services
- **OpenStreetMap**: Tile layer for interactive maps (no API key required)
- **Google Fonts**: Inter, Montserrat, Playfair Display font families

### Key NPM Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Async state management
- `react-leaflet` / `leaflet`: Interactive mapping
- `framer-motion`: Animations
- `wouter`: Client-side routing
- `zod`: Runtime validation
- Full shadcn/ui component set via Radix UI primitives

## Recent Changes (January 2026)

### Integration of "História da Cascata" Optimization Package

**New Features Added:**

1. **Enhanced Hero Component** (`client/src/components/Hero.tsx`)
   - Floating emoji icon animation
   - Gradient overlays with primary color tint
   - Wave SVG decoration at bottom
   - Location badge with MapPin icon
   - Props: `icon`, `location` added

2. **Interactive Timeline Page** (`client/src/pages/Timeline.tsx`)
   - Route: `/linha-do-tempo`
   - Period filters: Todos, Século XIX, Século XX, Século XXI
   - Animated event cards with Framer Motion
   - Color-coded category markers (energia, politica, patrimonio, cultura)
   - 7 historical events from 1889 to present

3. **Copywriting System with Emojis**
   - Themed emojis throughout UI for emotional engagement
   - Applied to Attractions page (🏞️, 🗺️)
   - Applied to Blog page (📰, 📜)
   - Timeline and featured sections use contextual emojis

4. **Sidebar Component** (`client/src/components/Sidebar.tsx`)
   - Newsletter signup widget (highlighted design)
   - Categories with counts and emoji icons
   - "Mais Lidos" (most read) articles section
   - CTA card for Timeline page
   - Integrated into Blog page layout

5. **"Destaques da Semana" Section** (Home page)
   - Featured cards grid (2-column + sidebar layout)
   - Main featured card with image and overlay
   - Two smaller gradient cards for Timeline and Attractions
   - Hover effects with lift animation

6. **Analytics Integration** (`client/src/hooks/useAnalytics.ts`)
   - `AnalyticsProvider` wraps the app
   - Tracks: page views, scroll depth (25%, 50%, 75%, 100%), time on page
   - Ready for Google Analytics integration (GA_MEASUREMENT_ID)
   - Console logging for development

7. **CSS Enhancements** (`client/src/index.css`)
   - Floating icon animation (`@keyframes float`)
   - Timeline styles with vertical line and markers
   - Filter button active states
   - Featured card hover effects
   - Loading skeleton animation
   - Reduced motion accessibility support
   - Enhanced focus states for accessibility

### Navigation Updates
- Added "Linha do Tempo" to main navigation
- Retained "História" link (both are available)