# Dashboard Implementation - Quick Start Guide

> **Quick reference for starting the Nuklias Dashboard implementation**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Neon account (free tier): https://neon.tech
- Git repository access

---

## 📋 Step-by-Step Setup

### 1. Create Neon Database

1. Go to https://neon.tech and sign up (free)
2. Create a new project: `nuklias-dashboard`
3. Copy the connection string (looks like: `postgresql://user:pass@host/db?sslmode=require`)
4. Save it for the next step

---

### 2. Install Dependencies

```bash
# Navigate to project
cd Modern-Spaces

# Install new dependencies for backend
npm install express passport passport-local express-session connect-pg-simple bcrypt @neondatabase/serverless
npm install -D @types/express @types/passport @types/passport-local @types/express-session @types/bcrypt

# Drizzle is already installed, but ensure drizzle-kit is present
npm install -D drizzle-kit
```

---

### 3. Create Environment File

Create `.env` in the project root:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Session Secret (generate a random string)
SESSION_SECRET=your-super-secret-random-string-here-change-this

# Server Configuration
NODE_ENV=development
PORT=3000

# Existing EmailJS config (keep these)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Generate a secure SESSION_SECRET:**
```bash
# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# On macOS/Linux
openssl rand -base64 32
```

---

### 4. Create `.env.example`

Create `.env.example` (template for team):

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Session Secret (generate with: openssl rand -base64 32)
SESSION_SECRET=

# Server Configuration
NODE_ENV=development
PORT=3000

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

---

### 5. Update `.gitignore`

Ensure `.env` is ignored:

```gitignore
# Environment variables
.env
.env.local
.env.production

# Existing entries...
```

---

### 6. Create Server Directory Structure

```bash
# Create server directories
mkdir server
mkdir server/routes
mkdir server/middleware
mkdir server/services
mkdir server/db
mkdir server/db/migrations
mkdir server/utils

# Create shared directory
mkdir shared
```

---

### 7. Update `package.json` Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
    "dev:client": "vite --port 5000 --host 0.0.0.0",
    "dev:server": "tsx watch server/index.ts",
    "build": "vite build",
    "start": "NODE_ENV=production tsx server/index.ts",
    "check": "tsc",
    "db:push": "drizzle-kit push",
    "db:generate": "drizzle-kit generate",
    "db:seed": "tsx server/db/seed.ts"
  }
}
```

**Install concurrently and tsx:**
```bash
npm install -D concurrently tsx
```

---

### 8. Update `vite.config.ts`

Add API proxy to forward `/api` requests to backend:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // ... existing plugins
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      // NEW: Proxy API requests to backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

---

### 9. Create TypeScript Config for Server

Create `server/tsconfig.json`:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022"],
    "outDir": "../dist/server",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["../shared/*"]
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### 10. Create Drizzle Config

Create `drizzle.config.ts` in project root:

```typescript
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**Install dotenv:**
```bash
npm install dotenv
```

---

## 🎯 First Implementation Tasks

Now you're ready to start building! Follow the tasks in `task.md`:

### Week 1 - Backend Foundation
1. ✅ Setup complete (you just did this!)
2. ⏭️ Create database schema (`server/db/schema.ts`)
3. ⏭️ Run migration (`npm run db:push`)
4. ⏭️ Create seed script (`server/db/seed.ts`)
5. ⏭️ Create Express server (`server/index.ts`)
6. ⏭️ Setup authentication (Passport.js)

---

## 🧪 Testing the Setup

### Test Database Connection

Create `server/db/test.ts`:

```typescript
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected successfully!');
    console.log('Current time:', result[0].now);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testConnection();
```

Run test:
```bash
npx tsx server/db/test.ts
```

Expected output:
```
✅ Database connected successfully!
Current time: 2026-01-24T08:15:00.000Z
```

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start both client and server
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Database
npm run db:push          # Push schema changes to database
npm run db:generate      # Generate migration files
npm run db:seed          # Seed initial data

# Build & Deploy
npm run build            # Build frontend for production
npm run start            # Start production server
npm run check            # TypeScript type checking
```

---

## 🔍 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env` is correct
- Check Neon dashboard for connection string
- Ensure `?sslmode=require` is at the end of the URL

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 3001)
- Update Vite proxy target in `vite.config.ts`

### TypeScript Errors
- Run `npm run check` to see all type errors
- Ensure all dependencies are installed
- Check `tsconfig.json` paths are correct

---

## 📖 Next Steps

1. ✅ Setup complete
2. ⏭️ Create database schema (see `task.md` Phase 2.1)
3. ⏭️ Create seed script (see `task.md` Phase 2.2)
4. ⏭️ Build Express server (see `task.md` Phase 2.3)
5. ⏭️ Implement authentication (see `task.md` Phase 3)

**Follow the detailed task breakdown in `task.md`** 📋

---

## 🆘 Need Help?

- **Architecture:** See `ARCHITECTURE.md`
- **Implementation Plan:** See `dashboard_implementation_plan.md`
- **Task Breakdown:** See `task.md`
- **Main README:** See `README.md`

---

**Ready to build!** 🚀
