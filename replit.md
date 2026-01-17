# Nuklias - Digital Strategy Agency Website

## Overview

Nuklias is a marketing/landing page website for a digital strategy agency positioning themselves as "Digital Architects" for businesses. The site showcases three tiered service packages (Local SEO, Social Content Systems, and Automation Funnels) with a clean, modern design using Royal Purple and Lime Green as primary brand colors. The application is a single-page React frontend with a mock API layer for contact form submissions that persists to localStorage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for scroll reveals and subtle interactions
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **State Management**: TanStack React Query for server state

### Project Structure
```
client/
├── src/
│   ├── components/     # Reusable components (Navbar, ServiceCard)
│   │   └── ui/         # shadcn/ui components
│   ├── hooks/          # Custom hooks (use-messages, use-toast)
│   ├── lib/            # Utilities (queryClient, api-mock, utils)
│   └── pages/          # Page components (Home, not-found)
```

### Data Layer
- **Current**: Mock API using localStorage for message persistence (no backend database)
- **Schema**: Zod schemas in `client/src/lib/api-mock.ts` define message structure
- **Pattern**: The codebase includes Drizzle ORM dependencies suggesting future PostgreSQL integration

### Design Decisions
- **No Backend Server Active**: While Express server files exist, the frontend uses a mock API layer for development
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` to `shared/`, `@assets/` to `attached_assets/`
- **Typography**: Space Grotesk for display/headings, DM Sans for body text
- **Theme**: CSS custom properties define colors enabling easy theme customization

## External Dependencies

### UI/Component Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-built component configurations in `components.json`
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **CMDK**: Command palette component
- **Vaul**: Drawer component

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### Build & Development
- **Vite**: Development server and build tool
- **Replit Plugins**: Error overlay, cartographer, dev banner for Replit environment

### Prepared But Not Active
- **Drizzle ORM**: Database toolkit (schemas not yet implemented)
- **PostgreSQL (pg)**: Database driver ready for future use
- **Express**: Server framework (server files exist but frontend uses mock API)
- **connect-pg-simple**: Session storage for Express (not active)