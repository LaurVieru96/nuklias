import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function DashboardHome() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.firstName} {user?.lastName}!
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* User Info Card */}
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong>{' '}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {user?.role}
              </span>
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span className="text-green-600">Active</span>
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 bg-muted rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Dashboard Features Coming Soon</h3>
          <p className="text-muted-foreground">
            Users management, Leads (CRM), Tasks, and Analytics will be added next.
          </p>
        </div>
      </div>
    </div>
  );
}
