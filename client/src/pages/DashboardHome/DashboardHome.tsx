import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  Target, 
  CheckSquare, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'wouter';

export default function DashboardHome() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { stats, recentLeads, myTasks, isLoading } = useDashboard();

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">{t('dashboard.common.loading')}</div>;
  }

  const statCards = [
    {
      title: t('dashboard.home.stats.new_leads'),
      value: stats?.totalLeads || 0,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: t('dashboard.home.stats.active_tasks'),
      value: stats?.activeTasks || 0,
      icon: CheckSquare,
      color: 'text-orange-500',
    },
    {
      title: t('dashboard.home.stats.conversion_rate'),
      value: `${stats?.conversionRate || 0}%`,
      icon: Target,
      color: 'text-green-500',
    },
    {
      title: t('dashboard.home.stats.team_activity'),
      value: stats?.teamSize || 0,
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Header section with Welcome and Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t('dashboard.home.welcome', { name: user?.firstName })}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.home.subtitle')}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t('dashboard.home.updated_just_now')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Recent Leads (Main Content - 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">{t('dashboard.home.recent_leads')}</h3>
            <Link href="/dashboard/leads">
              <Button variant="ghost" size="sm" className="gap-1">
                {t('dashboard.home.view_all')} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('dashboard.leads.columns.name')}</TableHead>
                    <TableHead>{t('dashboard.leads.columns.status')}</TableHead>
                    <TableHead className="text-right">{t('dashboard.home.date')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        {t('dashboard.home.no_recent_leads')}
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentLeads.map((lead: any) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          <div>{lead.name}</div>
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {lead.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {format(new Date(lead.createdAt), 'MMM d')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Your Tasks (Sidebar - 3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">{t('dashboard.home.your_tasks')}</h3>
             <Link href="/dashboard/tasks">
              <Button variant="ghost" size="sm" className="gap-1">
                {t('dashboard.home.view_all')} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Card className="h-full">
            <CardContent className="p-0">
               <Table>
                <TableHeader>
                  <TableRow>
                     <TableHead>{t('dashboard.tasks.columns.title')}</TableHead>
                     <TableHead>{t('dashboard.tasks.columns.priority')}</TableHead>
                     <TableHead className="text-right">{t('dashboard.home.due')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {myTasks.length === 0 ? (
                   <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        {t('dashboard.home.no_active_tasks')}
                      </TableCell>
                   </TableRow>
                ) : (
                  myTasks.map((task: any) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        <div className="line-clamp-1" title={task.title}>{task.title}</div>
                        <div className="text-xs text-muted-foreground capitalize">{task.status.replace('_', ' ')}</div>
                      </TableCell>
                       <TableCell>
                         <Badge 
                            variant={task.priority === 'high' ? 'destructive' : 'outline'} 
                            className="capitalize text-xs"
                          >
                           {task.priority || 'medium'}
                         </Badge>
                       </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground whitespace-nowrap">
                         {task.dueDate ? format(new Date(task.dueDate), 'MMM d') : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Glossary Footer */}
      <div className="border-t pt-8 mt-8">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">{t('dashboard.home.glossary.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-blue-500" />
                {t('dashboard.home.stats.new_leads')}
              </div>
              <p className="text-sm text-muted-foreground">{t('dashboard.home.glossary.new_leads')}</p>
           </div>
           
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckSquare className="h-4 w-4 text-orange-500" />
                {t('dashboard.home.stats.active_tasks')}
              </div>
              <p className="text-sm text-muted-foreground">{t('dashboard.home.glossary.active_tasks')}</p>
           </div>

           <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                 <Target className="h-4 w-4 text-green-500" />
                 {t('dashboard.home.stats.conversion_rate')}
              </div>
              <p className="text-sm text-muted-foreground">{t('dashboard.home.glossary.conversion_rate')}</p>
           </div>

           <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                 <TrendingUp className="h-4 w-4 text-purple-500" />
                 {t('dashboard.home.stats.team_activity')}
              </div>
              <p className="text-sm text-muted-foreground">{t('dashboard.home.glossary.team_activity')}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
