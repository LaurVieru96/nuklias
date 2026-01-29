import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Lead, CreateLeadInput, UpdateLeadInput, LeadStatus, LeadPriority } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  qualified: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  proposal_sent: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  won: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  lost: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

const PRIORITY_COLORS: Record<LeadPriority, string> = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

export default function Leads() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<LeadPriority | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Fetch leads
  const { data, isLoading } = useQuery({
    queryKey: ['leads', search, statusFilter, priorityFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (priorityFilter !== 'all') params.append('priority', priorityFilter);

      const response = await api.get<{ success: boolean; data: Lead[] }>(`/leads?${params}`);
      return response.data;
    },
  });

  // Create lead mutation
  const createMutation = useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      return api.post('/leads', input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsCreateModalOpen(false);
      toast({
        title: t('dashboard.common.success'),
        description: t('dashboard.leads.messages.create_success'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('dashboard.common.error'),
        description: error.message || t('dashboard.leads.messages.create_error'),
        variant: 'destructive',
      });
    },
  });

  // Update lead mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateLeadInput }) => {
      return api.put(`/leads/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsEditModalOpen(false);
      setSelectedLead(null);
      toast({
        title: t('dashboard.common.success'),
        description: t('dashboard.leads.messages.update_success'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('dashboard.common.error'),
        description: error.message || t('dashboard.leads.messages.update_error'),
        variant: 'destructive',
      });
    },
  });

  // Delete lead mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/leads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast({
        title: t('dashboard.common.success'),
        description: t('dashboard.leads.messages.delete_success'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('dashboard.common.error'),
        description: error.message || t('dashboard.leads.messages.delete_error'),
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('dashboard.leads.title')}</h2>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.leads.subtitle')}
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('dashboard.leads.add_lead')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('dashboard.common.search') + "..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t('dashboard.leads.columns.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('dashboard.status.all')}</SelectItem>
            <SelectItem value="new">{t('dashboard.status.new')}</SelectItem>
            <SelectItem value="contacted">{t('dashboard.status.contacted')}</SelectItem>
            <SelectItem value="qualified">{t('dashboard.status.qualified')}</SelectItem>
            <SelectItem value="proposal_sent">{t('dashboard.status.proposal_sent')}</SelectItem>
            <SelectItem value="won">{t('dashboard.status.won')}</SelectItem>
            <SelectItem value="lost">{t('dashboard.status.lost')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as any)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t('dashboard.leads.columns.priority')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('dashboard.priority.all')}</SelectItem>
            <SelectItem value="high">{t('dashboard.priority.high')}</SelectItem>
            <SelectItem value="medium">{t('dashboard.priority.medium')}</SelectItem>
            <SelectItem value="low">{t('dashboard.priority.low')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.leads.columns.name')}</TableHead>
              <TableHead>{t('dashboard.leads.columns.email')}</TableHead>
              <TableHead>{t('dashboard.leads.columns.industry')}</TableHead>
              <TableHead>{t('dashboard.leads.columns.status')}</TableHead>
              <TableHead>{t('dashboard.leads.columns.priority')}</TableHead>
              <TableHead className="text-right">{t('dashboard.common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {t('dashboard.common.loading')}
                </TableCell>
              </TableRow>
            ) : !data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {t('dashboard.common.no_data')}
                </TableCell>
              </TableRow>
            ) : (
              data.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.industry}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status]}`}>
                      {t(`dashboard.status.${lead.status}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLORS[lead.priority]}`}>
                      {t(`dashboard.priority.${lead.priority}`)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedLead(lead);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm(t('dashboard.common.confirm_delete'))) {
                            deleteMutation.mutate(lead.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Lead Modal */}
      <CreateLeadModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />

      {/* Edit Lead Modal */}
      {selectedLead && (
        <EditLeadModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedLead(null);
          }}
          lead={selectedLead}
          onSubmit={(data) => updateMutation.mutate({ id: selectedLead.id, data })}
          isLoading={updateMutation.isPending}
        />
      )}
    </div>
  );
}

// Create Lead Modal
function CreateLeadModal({
  open,
  onClose,
  onSubmit,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLeadInput) => void;
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CreateLeadInput>({
    name: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    businessType: '',
    challenge: '',
    message: '',
    status: 'new',
    priority: 'medium',
    source: 'manual',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('dashboard.leads.create_lead')}</DialogTitle>
          <DialogDescription>{t('dashboard.leads.create_desc')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('dashboard.leads.columns.name')} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('dashboard.leads.columns.email')} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t('dashboard.leads.columns.phone')}</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('dashboard.leads.columns.location')} *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">{t('dashboard.leads.columns.industry')} *</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">{t('dashboard.leads.columns.business_type')} *</Label>
              <Input
                id="businessType"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="challenge">{t('dashboard.leads.columns.challenge')} *</Label>
            <Input
              id="challenge"
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t('dashboard.leads.columns.message')} *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">{t('dashboard.leads.columns.status')}</Label>
              <Select
                value={formData.status}
                onValueChange={(value: LeadStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">{t('dashboard.status.new')}</SelectItem>
                  <SelectItem value="contacted">{t('dashboard.status.contacted')}</SelectItem>
                  <SelectItem value="qualified">{t('dashboard.status.qualified')}</SelectItem>
                  <SelectItem value="proposal_sent">{t('dashboard.status.proposal_sent')}</SelectItem>
                  <SelectItem value="won">{t('dashboard.status.won')}</SelectItem>
                  <SelectItem value="lost">{t('dashboard.status.lost')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">{t('dashboard.leads.columns.priority')}</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: LeadPriority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t('dashboard.priority.high')}</SelectItem>
                  <SelectItem value="medium">{t('dashboard.priority.medium')}</SelectItem>
                  <SelectItem value="low">{t('dashboard.priority.low')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('dashboard.common.cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('dashboard.common.creating') : t('dashboard.common.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Lead Modal
function EditLeadModal({
  open,
  onClose,
  lead,
  onSubmit,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  lead: Lead;
  onSubmit: (data: UpdateLeadInput) => void;
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UpdateLeadInput>({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    location: lead.location,
    industry: lead.industry,
    businessType: lead.businessType,
    challenge: lead.challenge,
    message: lead.message,
    status: lead.status,
    priority: lead.priority,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('dashboard.leads.edit_lead')}</DialogTitle>
          <DialogDescription>{t('dashboard.leads.edit_desc')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t('dashboard.leads.columns.name')}</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">{t('dashboard.leads.columns.email')}</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-status">{t('dashboard.leads.columns.status')}</Label>
              <Select
                value={formData.status}
                onValueChange={(value: LeadStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">{t('dashboard.status.new')}</SelectItem>
                  <SelectItem value="contacted">{t('dashboard.status.contacted')}</SelectItem>
                  <SelectItem value="qualified">{t('dashboard.status.qualified')}</SelectItem>
                  <SelectItem value="proposal_sent">{t('dashboard.status.proposal_sent')}</SelectItem>
                  <SelectItem value="won">{t('dashboard.status.won')}</SelectItem>
                  <SelectItem value="lost">{t('dashboard.status.lost')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-priority">{t('dashboard.leads.columns.priority')}</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: LeadPriority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t('dashboard.priority.high')}</SelectItem>
                  <SelectItem value="medium">{t('dashboard.priority.medium')}</SelectItem>
                  <SelectItem value="low">{t('dashboard.priority.low')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('dashboard.common.cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('dashboard.common.updating') : t('dashboard.common.update')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
