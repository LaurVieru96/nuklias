# Dashboard – Architecture & Decisions

This document summarizes the final architectural adjustments and technical decisions
for the internal Dashboard / CRM extension of the Nuklias Digital Architects project.

---

## ✅ Confirmed Decisions

### 1. Project Structure
- The Dashboard UI will live inside the **same project/repository** as the public website.
- Frontend (public site + dashboard) remains in `client/`.
- Backend API will be implemented in `server/`.
- Clear separation between UI and backend logic, but shared design system.

**Rationale:**
- Faster MVP development
- Shared design system and components
- Single deployment pipeline
- Easier to extract later if commercialized
- Lower maintenance overhead

---

### 2. Backend Integration
- Backend is part of the same project (monorepo-style).
- REST API exposed under `/api/*`.
- Frontend communicates with backend via relative `/api` calls (no CORS issues).
- Session-based authentication (cookies).

**Rationale:**
- Simplest architecture for a small team
- No CORS complexity
- Shared session between public site and dashboard
- Standard REST patterns (easy to understand)

---

### 3. Database
- **Database provider:** Neon
- **Database type:** PostgreSQL
- **ORM:** Drizzle ORM

**Reason:**
- Free tier (generous limits)
- Fully managed (no DevOps overhead)
- Perfect compatibility with Drizzle ORM
- No local database setup required for the team
- Serverless architecture (scales automatically)
- Built-in connection pooling

**Connection:**
- Database URL stored in `.env`
- Connection via `@neondatabase/serverless` driver
- Drizzle ORM for type-safe queries

---

### 4. Authentication & Roles
- **Auth Method:** Session-based (Passport.js + express-session)
- **Session Store:** PostgreSQL (via connect-pg-simple)
- **Password Hashing:** bcrypt

**Roles (MVP):**
- `admin` - Full access to all features (Users, Leads, Tasks, Stats)
- `member` - Access to Leads and Tasks (no Users management)

**Permissions:**
- Handled via middleware (RBAC), not hardcoded in UI
- Backend enforces all permissions
- Frontend hides UI elements based on role (UX only, not security)

**Rationale:**
- Session-based is simplest for a small team
- No token management complexity
- Secure cookies (httpOnly, secure, sameSite)
- Two roles cover all current use cases
- Can expand roles later if needed

---

### 5. Dashboard Scope (MVP)

**Core Features:**
1. **Authentication**
   - Login/logout
   - Session management
   - Password hashing
   - Protected routes

2. **Users Management** (Admin only)
   - List users
   - Create user
   - Edit user (name, role, active status)
   - Soft delete user
   - Pagination

3. **Leads (CRM)**
   - List leads (with filters: status, priority, time, search)
   - Create lead (manual + auto from contact form)
   - Edit lead (status, priority, assignment, notes)
   - Soft delete lead (admin only)
   - Pagination
   - Lead detail view

4. **Tasks**
   - List tasks (with filters: status, priority, assignee, due date)
   - Create task
   - Edit task
   - Delete task
   - Link task to lead (optional)
   - Priority levels: **low / medium / high**
   - Pagination

5. **Dashboard Home**
   - KPI cards (new leads, active tasks, conversion rate, team activity)
   - Recent leads widget (last 5)
   - Your tasks widget (current user's tasks)
   - Quick actions (create lead, create task)

**Data Management:**
- Pagination on all list views (default: 20 items per page)
- Soft delete (`deletedAt`) on core entities (users, leads, tasks)
- Filters persist in URL query params (shareable links)

**Out of Scope (Phase 2+):**
- Notes/comments on leads
- Activity log
- Email notifications
- File attachments
- Real-time updates
- Advanced analytics/charts
- Bulk actions

---

### 6. UI & UX Principles

**Design System:**
- Reuse existing Tailwind configuration
- Reuse existing Radix UI components (Button, Table, Dialog, Select, Badge, etc.)
- Reuse existing color palette and typography
- Maintain brand consistency with public site

**Layout:**
- **Desktop:** Sidebar navigation (240px) + content area
- **Mobile:** Collapsible hamburger menu
- **Top bar:** User menu, theme toggle, breadcrumbs

**Data Display:**
- **Desktop:** Table-heavy (sortable columns, inline actions)
- **Mobile:** Card-based (easier touch targets)
- **Responsive breakpoints:** 375px (mobile), 768px (tablet), 1440px (desktop)

**Spacing:**
- Airy layout (generous whitespace)
- Matches existing site's premium feel
- Reduces cognitive load

**Theme:**
- Dark mode support (reuses existing theme system)
- Theme toggle in top bar
- Consistent with public site theme

**Language:**
- **English-only** for dashboard (for now)
- No i18n overhead for MVP
- Can add translations later if needed

**Accessibility:**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

---

### 7. Initial Setup

**Seed Script:**
- A seed script (`server/db/seed.ts`) will be used to create the initial admin user
- Default admin credentials (to be changed after first login):
  - Email: `admin@nuklias.com`
  - Password: `Admin123!` (must be changed)
  - Role: `admin`
- Optional: Sample data (2-3 test leads, tasks) for development

**Environment Configuration:**
- All sensitive data in `.env` file
- `.env.example` template for team setup
- Required variables:
  - `DATABASE_URL` - Neon PostgreSQL connection string
  - `SESSION_SECRET` - Random secret for session encryption
  - `NODE_ENV` - development / production
  - `PORT` - Server port (default: 3000)

---

## 🏗️ Technical Stack Summary

### Frontend
- **Framework:** React 18.3.1
- **Build Tool:** Vite 7.3.0
- **Language:** TypeScript 5.6.3
- **Routing:** Wouter 3.3.5
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** Radix UI
- **State Management:** TanStack Query 5.60.5
- **Form Handling:** React Hook Form 7.71.1 + Zod 3.24.2

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.21.2
- **Language:** TypeScript 5.6.3
- **Database:** Neon PostgreSQL
- **ORM:** Drizzle ORM 0.39.3
- **Authentication:** Passport.js + express-session
- **Password Hashing:** bcrypt
- **Validation:** Zod 3.24.2

### Database
- **Provider:** Neon
- **Type:** PostgreSQL (serverless)
- **Driver:** @neondatabase/serverless
- **ORM:** Drizzle ORM
- **Migrations:** Drizzle Kit

---

## 📁 Project Structure

```
Modern-Spaces/
├── client/                          # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # Radix UI components (existing)
│   │   │   ├── marketing/          # Public site components (refactored)
│   │   │   └── dashboard/          # Dashboard components (NEW)
│   │   ├── pages/
│   │   │   ├── public/             # Public pages (refactored)
│   │   │   └── dashboard/          # Dashboard pages (NEW)
│   │   ├── layouts/
│   │   │   ├── MarketingLayout.tsx # Public site layout (NEW)
│   │   │   └── DashboardLayout.tsx # Dashboard layout (NEW)
│   │   ├── hooks/                  # React hooks
│   │   ├── lib/                    # Utilities
│   │   ├── types/                  # TypeScript types
│   │   └── App.tsx                 # Main app (updated)
│   └── index.html
│
├── server/                          # Backend (NEW)
│   ├── routes/                     # API routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── leads.ts
│   │   ├── tasks.ts
│   │   └── stats.ts
│   ├── middleware/                 # Express middleware
│   │   ├── auth.ts
│   │   ├── rbac.ts
│   │   └── errorHandler.ts
│   ├── services/                   # Business logic
│   │   ├── userService.ts
│   │   ├── leadService.ts
│   │   └── taskService.ts
│   ├── db/                         # Database
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── utils/                      # Utilities
│   └── index.ts                    # Express app entry
│
├── shared/                          # Shared types (NEW)
│   └── types.ts
│
├── .env                             # Environment variables (gitignored)
├── .env.example                     # Environment template (NEW)
├── package.json
├── vite.config.ts                   # Updated (API proxy)
└── tsconfig.json
```

---

## 🔒 Security Considerations

1. **Password Security**
   - Bcrypt hashing (salt rounds: 10)
   - No plain text passwords stored
   - Password complexity requirements (frontend validation)

2. **Session Security**
   - HttpOnly cookies (prevent XSS)
   - Secure flag (HTTPS only in production)
   - SameSite: strict (prevent CSRF)
   - Session expiration (30 days with "remember me", 1 day without)

3. **API Security**
   - All dashboard endpoints require authentication
   - Role-based access control on all routes
   - Input validation (Zod schemas)
   - SQL injection prevention (Drizzle ORM parameterized queries)

4. **Data Security**
   - Soft delete (data not permanently removed)
   - No sensitive data in client-side code
   - Environment variables for secrets

---

## 🚀 Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Setup database (Neon)
# 1. Create Neon project at https://neon.tech
# 2. Copy connection string to .env

# Run migrations
npm run db:push

# Seed database
npm run db:seed

# Start dev servers (frontend + backend)
npm run dev
```

### Build & Deploy
```bash
# Build frontend
npm run build

# Start production server
npm run start
```

---

## 📊 Success Metrics (MVP)

### Functional
- ✅ Admin can manage users
- ✅ All users can manage leads and tasks
- ✅ Contact form creates leads automatically
- ✅ RBAC enforced on all endpoints
- ✅ Pagination works on all lists
- ✅ Filters work correctly

### Performance
- ✅ Page load < 2 seconds
- ✅ API response < 500ms
- ✅ Smooth UI interactions

### Security
- ✅ Passwords hashed with bcrypt
- ✅ Sessions secure (httpOnly cookies)
- ✅ RBAC enforced on backend
- ✅ Input validation on all forms

### UX
- ✅ Mobile-responsive
- ✅ Dark mode support
- ✅ Clear error messages
- ✅ Loading states visible

---

## 🎯 Next Steps

1. **Phase 1:** Project Setup & Configuration (Week 1)
   - Backend structure
   - Database setup (Neon)
   - Environment configuration
   - Build configuration

2. **Phase 2:** Backend Foundation (Week 1)
   - Database schema
   - Seed script
   - Database services

3. **Phase 3:** Authentication System (Week 1-2)
   - Password hashing
   - Session configuration
   - Passport.js setup
   - Auth API routes

4. **Phase 4:** Dashboard UI Foundation (Week 2)
   - Shared types
   - API client
   - Auth context
   - Protected routes
   - Login page
   - Dashboard layout

5. **Phase 5:** Core Features (Week 2-3)
   - Users management
   - Leads (CRM)
   - Tasks
   - Dashboard home

6. **Phase 6:** Polish & Testing (Week 3)
   - Error handling
   - Loading states
   - Form validation
   - Responsive design
   - Dark mode
   - RBAC testing
   - Performance
   - Security
   - Documentation

---

**Timeline:** 2-3 weeks (full-time development)

**Team Size:** 3-4 developers

**Estimated Effort:** ~120-160 hours

---

These decisions aim to keep the system **simple**, **scalable**, and **easy to maintain**
for a small internal team, while allowing future expansion if needed.
