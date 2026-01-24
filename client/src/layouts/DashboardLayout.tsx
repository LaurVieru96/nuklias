import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Menu,
  X,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: t('dashboard.nav.dashboard'), href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'member'] },
    { name: t('dashboard.nav.leads'), href: '/dashboard/leads', icon: Briefcase, roles: ['admin', 'member'] },
    { name: t('dashboard.nav.tasks'), href: '/dashboard/tasks', icon: CheckSquare, roles: ['admin', 'member'] },
    { name: t('dashboard.nav.users'), href: '/dashboard/users', icon: Users, roles: ['admin'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-border bg-card overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-5 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                N
              </div>
              <span className="text-lg font-bold">Nuklias</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="flex-shrink-0 border-t border-border p-4">
            <div className="flex items-center gap-3 px-2 py-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  N
                </div>
                <span className="text-lg font-bold">Nuklias</span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3 px-2 py-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden -m-2.5 p-2.5 text-foreground"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-border md:hidden" />

          {/* Breadcrumb / Title */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {filteredNavigation.find(item => item.href === location)?.name || t('dashboard.nav.dashboard')}
            </h1>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {t(`dashboard.roles.${user?.role || 'member'}`)}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('dashboard.nav.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
