# SolarLink - Solar Energy Marketplace Platform

## Overview

SolarLink is a Brazilian solar energy marketplace platform that connects consumers seeking solar panel installations with certified integrators (installers). The platform serves two distinct user personas: residential/commercial consumers looking to save on electricity bills, and solar installation professionals seeking qualified leads.

The application is a full-stack TypeScript project with a React frontend and Express backend, featuring an AI-powered chatbot (Solara) for solar energy consultations, an ROI calculator, and multi-step lead capture forms.

## Recent Changes (December 2024)

- **Security Layer**: Content protection (blocks copy, right-click, dev tools), rate limiting (DDoS protection), security headers
- **Admin System**: Separate admin authentication with 4-level role hierarchy (Administrador Total, Revisão, Editor, Leitor)
- **Admin Dashboard**: Protected admin panel at /admin with role-based access control
- **Admin Creation**: /admin/criar restricted to Administrador Total role only
- **Dynamic Hero Text**: Rotating text animation for 5 market segments (Residencial, Comercial, Industrial, Agronegocio, Usinas de investimento)
- **Replit Auth Integration**: Full authentication system with session management using PostgreSQL sessions table
- **Integrator Dashboard**: Protected dashboard page showing leads overview, credits balance, and recent activities
- **Leads Marketplace**: Dual-version page - demo data for visitors, real data for authenticated integrators
- **Stripe Payment Integration**: Credit purchase flow with managed webhooks via stripe-replit-sync
- **Legal Pages**: Blog, Privacy Policy (Privacidade), and Terms of Use (Termos) pages

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with React plugin

The frontend follows a component-based architecture with:
- `/pages` - Route-level components (Home, ConsultoriaIA, Dashboard, Leads, Blog, Privacidade, Termos, CompraCreditos, not-found)
- `/components/landing` - Marketing page sections (Hero, FAQ, ROI Calculator, etc.)
- `/components/ui` - Reusable shadcn/ui components
- `/components/examples` - Component usage examples
- `/hooks` - Custom React hooks (useToast, useMobile, useAuth)
- `/lib` - Utilities and API client configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **HTTP Server**: Node.js native http module
- **API Pattern**: RESTful endpoints under `/api/*`
- **Development**: Vite dev server integration with HMR support
- **Production**: Static file serving from built frontend assets

The server structure includes:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route definitions including OpenAI chat integration
- `server/storage.ts` - PostgreSQL database storage implementation with DatabaseStorage class
- `server/db.ts` - Drizzle ORM database connection
- `server/vite.ts` - Vite development server integration
- `server/static.ts` - Production static file serving

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with `db:push` command
- **Storage**: PostgreSQL database with DatabaseStorage class
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod

### Database Schema (Star Schema)

**Dimension Tables:**
- `dim_geography` - Geographic locations (city, state, IBGE code)
- `dim_service` - Solar service types (installation, projects, maintenance, monitoring, inspection, consulting)

**Entity Tables:**
- `users` - Authentication users
- `admins` - Platform administrators with 4-level role hierarchy (administrador_total, revisao, editor, leitor)
- `consumers` - Leads/consumers requesting solar quotes (name, email, phone, location, monthly bill, property/roof type, status)
- `integrators` - Solar installation companies (company info, CNPJ, location, service radius, credits balance)

**Fact Tables:**
- `fact_credit_transactions` - Credit package purchases by integrators (package type, amount, price, status)
- `fact_lead_acquisitions` - Integrators purchasing leads (credits spent, conversion tracking)
- `fact_quotes` - Proposals sent by integrators to consumers (system specs, pricing, status)

**Bridge Tables:**
- `integrator_services` - Many-to-many relationship between integrators and services

**Credit Packages:**
- Iniciante: 5 credits for R$49.90
- Profissional: 25 credits for R$199.50
- Empresarial: 50 credits for R$349.00

### AI Integration
- **Provider**: OpenAI API
- **Purpose**: Solar energy consultation chatbot (Solara)
- **System Prompt**: Portuguese-language expert constrained to solar energy topics only
- **Context**: Maintains conversation history for contextual responses

### Design System
The project uses a comprehensive design system documented in `design_guidelines.md`:
- Dual-persona design (consumer-facing vs. business-facing)
- Custom color tokens via CSS variables supporting light/dark themes
- Typography hierarchy using Inter font
- Consistent spacing primitives following Tailwind conventions

## External Dependencies

### Third-Party Services
- **OpenAI API**: Powers the Solara chatbot for solar energy consultations (requires `OPENAI_API_KEY` environment variable)

### Database
- **PostgreSQL**: Required for production (requires `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database toolkit for schema management and queries
- **connect-pg-simple**: PostgreSQL session store (configured but sessions not currently implemented)

### Key NPM Packages
- **UI Framework**: @radix-ui/* primitives, shadcn/ui patterns
- **Animation**: framer-motion
- **Forms**: react-hook-form with @hookform/resolvers
- **Data Fetching**: @tanstack/react-query
- **Date Handling**: date-fns
- **Validation**: zod, zod-validation-error

### Development Tools
- **Build**: esbuild (server), Vite (client)
- **TypeScript**: Strict mode enabled
- **Replit Plugins**: @replit/vite-plugin-runtime-error-modal, cartographer, dev-banner

### Asset Management
- Generated images stored in `attached_assets/` directory
- Path alias `@assets` configured for asset imports