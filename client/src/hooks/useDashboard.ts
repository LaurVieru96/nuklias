import { useQuery } from '@tanstack/react-query';
import { statsApi, leadsApi, tasksApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export function useDashboard() {
  const { user } = useAuth();

  // 1. Stats Query
  const statsQuery = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const { data } = await statsApi.getDashboard();
      return data;
    },
    // Refresh every minute
    refetchInterval: 60000, 
  });

  // 2. Recent Leads Query (Limit 5)
  const recentLeadsQuery = useQuery({
    queryKey: ['dashboard', 'recent-leads'],
    queryFn: async () => {
      const { data } = await leadsApi.list({ limit: 5 });
      return data; // returns { data: Lead[], pagination: ... }
    },
  });

  // 3. Your Tasks Query (Limit 5, Assigned to Me, Not Completed)
  const myTasksQuery = useQuery({
    queryKey: ['dashboard', 'my-tasks', user?.id],
    queryFn: async () => {
      if (!user?.id) return { data: [] };
      const { data } = await tasksApi.list({ 
        limit: 5, 
        assignedTo: user.id,
        status: ['todo', 'in_progress'].join(',') 
      });
      return data;
    },
    enabled: !!user?.id,
  });

  return {
    stats: statsQuery.data,
    recentLeads: recentLeadsQuery.data || [],
    myTasks: myTasksQuery.data || [],
    isLoading: statsQuery.isLoading || recentLeadsQuery.isLoading || myTasksQuery.isLoading,
    isError: statsQuery.isError || recentLeadsQuery.isError || myTasksQuery.isError,
    refetch: () => {
        statsQuery.refetch();
        recentLeadsQuery.refetch();
        myTasksQuery.refetch();
    }
  };
}
