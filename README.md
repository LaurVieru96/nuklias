# Nuklias Digital Architects 🚀

A modern, multilingual web application for a digital marketing agency focused on transforming businesses through strategic digital solutions and revenue-driven growth systems.

## 📋 Project Overview

Nuklias Digital Architects is a full-featured marketing agency website built with modern web technologies. The platform showcases comprehensive digital services, from brand design to growth consulting, with a focus on measurable business outcomes rather than vanity metrics.

**Target Users:** Business owners, entrepreneurs, and companies seeking professional digital transformation services with transparent, results-driven approaches.

## ✨ Features

### Core Functionality
- **Multilingual Support** - Full internationalization (i18n) with English, Romanian, and German translations
- **Responsive Design** - Mobile-first approach with seamless experience across all devices
- **Dark Mode** - Modern dark theme for enhanced user experience
- **Dynamic Routing** - Client-side routing with smooth page transitions
- **Contact System** - Integrated contact forms with EmailJS for lead generation
- **Cookie Consent** - GDPR-compliant cookie management system
- **Legal Documentation** - Comprehensive Privacy Policy and Terms of Service

### Key Pages
- **Home** - Hero section, client journey visualization, comparison tables, and value propositions
- **What We Solve** - Problem-solution framework showcasing agency approach
- **Products** - Service tiers (Website Basic, Website + Hosting, Website + Host + Growth, Talent OS)
- **Process** - Transparent step-by-step client onboarding workflow
- **Contact** - Multi-field contact form with industry selection and business analysis
- **Talent Infrastructure** - HR Tech solution for scalable hiring systems

### Design Features
- Modern UI components built with Radix UI primitives
- Smooth animations powered by Framer Motion
- Custom theming system with next-themes
- Glassmorphism and gradient effects
- Interactive carousels and accordions

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3.1
- **Build Tool:** Vite 7.3.0
- **Language:** TypeScript 5.6.3
- **Routing:** Wouter 3.3.5
- **Styling:** Tailwind CSS 3.4.17 + CSS Modules
- **UI Components:** Radix UI (comprehensive component library)
- **Animations:** Framer Motion 11.18.2
- **State Management:** TanStack Query 5.60.5
- **Form Handling:** React Hook Form 7.71.1 + Zod validation
- **Internationalization:** i18next 25.7.4 + react-i18next 16.5.3

### Backend & Database
- **Server:** Express.js 4.21.2
- **Database ORM:** Drizzle ORM 0.39.3
- **Database:** PostgreSQL (via pg 8.16.3)
- **Session Management:** express-session with connect-pg-simple
- **Authentication:** Passport.js with local strategy
- **Real-time:** WebSocket (ws 8.18.0)

### Additional Technologies
- **Email Service:** EmailJS Browser 4.4.1
- **Icons:** Lucide React 0.453.0 + React Icons 5.4.0
- **Date Handling:** date-fns 3.6.0
- **Charts:** Recharts 2.15.2
- **Development:** ESBuild, PostCSS, Autoprefixer

## 🏗️ Architecture

### Project Structure
```
Modern-Spaces/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── Hero/
│   │   │   ├── ProductsSection/
│   │   │   ├── TalentInfrastructureSection/
│   │   │   ├── CookieConsent/
│   │   │   ├── LegalModal/
│   │   │   └── ui/            # Radix UI components
│   │   ├── pages/             # Route-based page components
│   │   │   ├── Home/
│   │   │   ├── WhatWeSolve/
│   │   │   ├── Products/
│   │   │   ├── Process/
│   │   │   ├── ContactUs/
│   │   │   └── NotFound/
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities and configurations
│   │   │   ├── i18n.ts        # i18next configuration
│   │   │   └── queryClient.ts # TanStack Query setup
│   │   ├── locales/           # Translation files
│   │   │   ├── en.json
│   │   │   ├── ro.json
│   │   │   └── de.json
│   │   ├── types/             # TypeScript type definitions
│   │   └── assets/            # Static assets
│   ├── public/                # Public static files
│   └── index.html             # HTML entry point
├── attached_assets/           # Additional project assets
├── dist/                      # Production build output
├── node_modules/              # Dependencies
├── package.json               # Project dependencies and scripts
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── components.json            # shadcn/ui configuration
```

### Communication Flow
- **Frontend-Backend:** RESTful API communication (planned/minimal backend currently)
- **State Management:** TanStack Query for server state, React Context for client state
- **Routing:** Client-side routing with Wouter (lightweight alternative to React Router)
- **Forms:** EmailJS for direct email sending from contact forms

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd Modern-Spaces
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the `client/` directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🔧 Environment Variables

### Required Variables (client/.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier | `service_abc123` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier | `template_xyz789` |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key | `user_def456` |

### Optional Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `/api` |
| `NODE_ENV` | Environment mode | `development` |

## 📦 Running the Project

### Development Mode
```bash
npm run dev
```
Starts Vite dev server on port 5000 with hot module replacement.

### Production Build
```bash
npm run build
```
Creates optimized production build in `dist/public/` directory.

### Preview Production Build
```bash
npm run start
```
Serves the production build locally for testing.

### Type Checking
```bash
npm run check
```
Runs TypeScript compiler in check mode without emitting files.

### Database Operations
```bash
npm run db:push
```
Pushes database schema changes using Drizzle Kit.

## 📁 Folder Structure (Simplified)

```
client/src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI primitives (buttons, dialogs, etc.)
│   └── [Feature]/      # Feature-specific components
├── pages/              # Route pages
├── hooks/              # Custom React hooks
├── lib/                # Utilities, configs, helpers
├── locales/            # i18n translation JSON files
├── types/              # TypeScript type definitions
└── assets/             # Images, fonts, static files
```

## 🎯 Future Improvements

- [ ] **Backend API Integration** - Build full Express.js REST API for dynamic content
- [ ] **Admin Dashboard** - Content management system for services and case studies
- [ ] **Blog System** - SEO-optimized blog with markdown support
- [ ] **Portfolio/Case Studies** - Showcase successful client projects
- [ ] **Live Chat Integration** - Real-time customer support
- [ ] **Analytics Dashboard** - Track visitor behavior and conversion metrics
- [ ] **Payment Integration** - Stripe/PayPal for service subscriptions
- [ ] **Client Portal** - Secure area for clients to track project progress
- [ ] **Advanced SEO** - Server-side rendering with Next.js migration
- [ ] **Performance Optimization** - Image optimization, lazy loading, code splitting
- [ ] **A/B Testing Framework** - Experiment with different CTAs and layouts
- [ ] **Email Marketing Integration** - Newsletter subscription and automation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with precision by Nuklias Digital Architects** 🎯

For questions or support, visit our [contact page](./client/src/pages/ContactUs) or reach out directly.



