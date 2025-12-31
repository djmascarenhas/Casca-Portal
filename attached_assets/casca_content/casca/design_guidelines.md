# SolarLink Design Guidelines

## Design Approach

**Hybrid Strategy**: Reference-based for marketing surfaces (inspired by Airbnb's trust-building and Tesla's clean energy aesthetic) combined with Material Design system for functional dashboards and data management interfaces.

**Core Principle**: Dual-persona design that clearly distinguishes consumer-facing (aspirational, trust-focused) from business-facing (functional, data-driven) experiences while maintaining cohesive brand identity.

## Typography System

**Font Families**:
- Primary: Inter (headings, UI elements) - clean, modern, professional
- Secondary: System UI (body text, forms) - optimal readability

**Hierarchy**:
- Hero Headlines: text-5xl to text-7xl, font-bold (96-72px)
- Section Headers: text-3xl to text-4xl, font-semibold (36-48px)
- Subsections: text-xl to text-2xl, font-medium (24-30px)
- Body: text-base to text-lg, font-normal (16-18px)
- Captions/Labels: text-sm, font-medium (14px)
- Dashboard Data: text-lg to text-2xl, font-semibold for key metrics

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24 (desktop), py-12 (mobile)
- Card gaps: gap-6 to gap-8
- Form field spacing: space-y-4 to space-y-6

**Container Strategy**:
- Marketing pages: max-w-7xl for full sections, max-w-4xl for focused content
- Dashboards: max-w-screen-2xl with sidebar layouts
- Forms: max-w-2xl centered

## Landing Page Structure

**Hero Section** (80vh):
- Full-width background image (solar panels on modern home, sun rays)
- Blurred background overlay for text readability
- Large centered headline with value proposition
- Dual CTA buttons (Consumer / Integrator paths) with blurred backgrounds
- Trust indicator: "Conectando X+ consumidores com Y+ integradores certificados"

**Dual Path Section** (Split Layout):
- Two-column grid (lg:grid-cols-2) with equal visual weight
- Left: Consumer path with household imagery, economy-focused messaging
- Right: Integrator path with business imagery, growth-focused messaging
- Each card includes icon, headline, 3-4 benefit bullets, CTA button

**How It Works** (Three-column on desktop):
- Step-by-step process visualization (1-2-3 numbered cards)
- Icons representing: Consultation → Matching → Installation
- Brief descriptions under each step
- Timeline or flow connector between cards

**Trust & Social Proof**:
- Statistics bar: Projects completed, Energy saved, Customer satisfaction
- Testimonial cards (grid-cols-1 md:grid-cols-3)
- Partner logos (integrator companies) in subtle grid

**ROI Calculator Section**:
- Interactive form embedded in marketing flow
- Input: Monthly energy bill (R$)
- Output: Estimated savings visualization (charts/numbers)
- Side-by-side comparison: "Sua conta hoje" vs "Com energia solar"

**Final CTA Section**:
- Split design: Consumer form (left) / Integrator signup (right)
- Background: Subtle solar panel pattern or gradient
- Strong headline reinforcing platform value

## Dashboard Layouts (Integrator Portal)

**Sidebar Navigation** (Fixed, w-64):
- Logo at top
- Primary nav items with icons (Dashboard, Leads, Créditos, Perfil)
- User profile widget at bottom
- Collapsed state on mobile (hamburger menu)

**Main Content Area**:
- Header bar: Page title, breadcrumbs, action buttons (top-right)
- Content grid with cards for different data sections
- Spacing: p-8 for main area, gap-6 between cards

**Lead Cards Layout**:
- List view with avatar/icon, location, energy consumption data
- Quick stats: Estimated project value, Distance from company
- Action buttons: "Ver detalhes" / "Comprar lead" (requires credits)
- Filtering sidebar (left) with location, budget range, urgency filters

**Dashboard Metrics**:
- Top row: 4-column stat cards (Total leads, Converted, Credits, Revenue)
- Large numbers (text-3xl) with trend indicators (small charts)
- Middle section: Lead activity timeline
- Bottom: Performance charts (bar/line graphs)

## Form Design Patterns

**Consumer Consultation Form**:
- Progressive disclosure: Start simple (Name, Email, Phone)
- Step 2: Address with autocomplete
- Step 3: Energy consumption (Monthly bill or kWh)
- Step 4: Property type and roof details
- Progress indicator at top
- Generous spacing (space-y-6), single column max-w-lg

**Integrator Registration**:
- Multi-step with clear sections (Company Info → Service Areas → Documentation)
- File upload areas for certifications (drag-and-drop zones)
- Location selector with map integration
- Service radius selector (visual map + slider)

## Component Library

**Buttons**:
- Primary: Rounded (rounded-lg), padding px-6 py-3, font-semibold
- Secondary: Outlined variant with same dimensions
- Icon buttons: Square (w-10 h-10) with centered icon
- CTA buttons on images: Backdrop blur filter, semi-transparent background

**Cards**:
- Standard: rounded-xl, shadow-md, p-6
- Dashboard cards: rounded-lg, border, p-6, hover:shadow-lg transition
- Lead cards: Flex layout with avatar left, content center, actions right
- Testimonial cards: Includes quote icon, photo, name, role, rating stars

**Data Visualization**:
- Clean, minimal chart styling (line/bar)
- Economy calculator: Donut chart showing savings breakdown
- ROI timeline: Horizontal bar showing payback period

**Badges & Tags**:
- Status indicators: rounded-full, px-3 py-1, text-xs font-medium
- Location tags: Icon + text, subtle background
- Credit balance: Prominent display with icon

## Images Strategy

**Hero Image**: 
- High-quality photograph of modern home with solar panels, bright day with sun visible
- Alternative: Aerial view of solar farm with geometric panel arrangement
- Position: Background, full-width, with subtle gradient overlay for text contrast

**Section Images**:
- Consumer path card: Family in front of solar-equipped home
- Integrator path card: Professional installer working with panels
- How it works section: Iconographic illustrations (not photos) for each step
- Testimonial section: Real customer photos (circular crops, w-16 h-16)

**Dashboard**: 
- Placeholder avatars for lead profiles
- Map pins for location visualization
- No decorative imagery (function over form)

## Animations

**Minimal, purposeful only**:
- Smooth page transitions (fade in)
- Hover states on cards (subtle lift with shadow)
- Button hover: Slight scale (scale-105)
- Form validation: Shake animation on error
- Dashboard: Smooth chart renders, no scroll animations

## Accessibility Implementation

- All forms include visible labels, required indicators
- Icon buttons include aria-labels
- Color contrast follows WCAG AA minimum
- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- Skip navigation link for keyboard users
- Form errors announced to screen readers

---

**Design Philosophy**: Build trust through clarity and professionalism. Consumer surfaces inspire confidence with aspirational imagery and transparent value propositions. Business tools prioritize efficiency with scannable data layouts and quick actions. The platform's dual nature is its strength—celebrate it with distinct but harmonious design languages.