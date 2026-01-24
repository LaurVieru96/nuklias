import { useAuth } from '@/contexts/AuthContext';

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.firstName}!
        </h2>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid - Placeholder */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'New Leads', value: '12', change: '+20%' },
          { label: 'Active Tasks', value: '8', change: '+5%' },
          { label: 'Conversion Rate', value: '24%', change: '+12%' },
          { label: 'Team Activity', value: '4', change: '0%' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border rounded-lg p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            + New Lead
          </button>
          <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            + New Task
          </button>
          <button className="px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
            View All Leads
          </button>
          <button className="px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-muted rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">More Features Coming Soon</h3>
        <p className="text-muted-foreground">
          Recent leads, your tasks, and detailed analytics will be added next.
        </p>
      </div>
    </div>
  );
}
