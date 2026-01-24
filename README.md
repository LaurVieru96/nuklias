# Nuklias Digital Architects - Frontend

Modern, responsive website for Nuklias Digital Architects with integrated dashboard for CRM and task management.

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **i18n**: i18next (EN, RO, DE)

## 📦 Installation

```bash
npm install
```

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

```bash
npm run build
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── layouts/        # Layout components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities and configurations
│   ├── types/          # TypeScript types
│   ├── locales/        # i18n translations
│   └── assets/         # Static assets
```

## 🌐 Features

### Public Website
- Multi-language support (EN, RO, DE)
- Responsive design
- Dark mode support
- Contact form with EmailJS
- SEO optimized

### Dashboard (Authenticated)
- User management (admin only)
- Leads (CRM) management
- Task management
- Role-based access control
- Session-based authentication

## 🚀 Deployment

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables: Add from `.env.example`

## 📝 License

MIT
