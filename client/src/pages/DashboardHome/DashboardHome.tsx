import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function DashboardHome() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold">
          {t('dashboard.home.welcome', { name: user?.firstName })}
        </h2>
        <p className="text-muted-foreground mt-1">
          {t('dashboard.home.subtitle')}
        </p>
      </div>

      {/* Stats Grid - Placeholder */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t('dashboard.home.stats.new_leads'), value: '12', change: '+20%' },
          { label: t('dashboard.home.stats.active_tasks'), value: '8', change: '+5%' },
          { label: t('dashboard.home.stats.conversion_rate'), value: '24%', change: '+12%' },
          { label: t('dashboard.home.stats.team_activity'), value: '4', change: '0%' },
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
        <h3 className="text-lg font-semibold mb-4">{t('dashboard.home.quick_actions')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            + {t('dashboard.home.new_lead')}
          </button>
          <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            + {t('dashboard.home.new_task')}
          </button>
          <button className="px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
            {t('dashboard.home.view_leads')}
          </button>
          <button className="px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
            {t('dashboard.home.view_tasks')}
          </button>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-muted rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">{t('dashboard.home.coming_soon')}</h3>
        <p className="text-muted-foreground">
          {t('dashboard.home.coming_soon_desc')}
        </p>
      </div>
    </div>
  );
}
