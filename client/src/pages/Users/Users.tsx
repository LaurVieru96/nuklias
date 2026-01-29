import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { User, CreateUserInput, UpdateUserInput, PaginatedResponse } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export default function Users() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: User[] }>('/users');
      return response.data;
    },
  });

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: async (input: CreateUserInput) => {
      return api.post('/users', input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsCreateModalOpen(false);
      toast({
        title: t('dashboard.common.success'),
        description: t('dashboard.users.messages.create_success'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('dashboard.common.error'),
        description: error.message || t('dashboard.users.messages.create_error'),
        variant: 'destructive',
      });
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserInput }) => {
      return api.put(`/users/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsEditModalOpen(false);
      setSelectedUser(null);
      toast({
        title: t('dashboard.common.success'),
        description: t('dashboard.users.messages.update_success'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('dashboard.common.error'),
        description: error.message || t('dashboard.users.messages.update_error'),
        variant: 'destructive',
      });
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast({
        title: t('dashboard.common.success'),
        description: t('dashboard.users.messages.delete_success'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('dashboard.common.error'),
        description: error.message || t('dashboard.users.messages.delete_error'),
        variant: 'destructive',
      });
    },
  });

  const filteredUsers = data?.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    user.lastName.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('dashboard.users.title')}</h2>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.users.subtitle')}
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('dashboard.users.add_user')}
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('dashboard.common.search') + "..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.users.columns.name')}</TableHead>
              <TableHead>{t('dashboard.users.columns.email')}</TableHead>
              <TableHead>{t('dashboard.users.columns.role')}</TableHead>
              <TableHead>{t('dashboard.users.columns.status')}</TableHead>
              <TableHead className="text-right">{t('dashboard.common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  {t('dashboard.common.loading')}
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {t('dashboard.common.no_data')}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {t(`dashboard.roles.${user.role}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {user.isActive ? t('dashboard.status.active') : t('dashboard.status.inactive')}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
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
                            deleteMutation.mutate(user.id);
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

      {/* Create User Modal */}
      <CreateUserModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />

      {/* Edit User Modal */}
      {selectedUser && (
        <EditUserModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSubmit={(data) => updateMutation.mutate({ id: selectedUser.id, data })}
          isLoading={updateMutation.isPending}
        />
      )}
    </div>
  );
}

// Create User Modal Component
function CreateUserModal({ 
  open, 
  onClose, 
  onSubmit, 
  isLoading 
}: { 
  open: boolean; 
  onClose: () => void; 
  onSubmit: (data: CreateUserInput) => void;
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CreateUserInput>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'member',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dashboard.users.create_user')}</DialogTitle>
          <DialogDescription>
            {t('dashboard.users.create_desc')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('dashboard.users.columns.first_name')}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('dashboard.users.columns.last_name')}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('dashboard.users.columns.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">{t('dashboard.users.columns.role')}</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'admin' | 'member') => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">{t('dashboard.roles.member')}</SelectItem>
                <SelectItem value="admin">{t('dashboard.roles.admin')}</SelectItem>
              </SelectContent>
            </Select>
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

// Edit User Modal Component
function EditUserModal({ 
  open, 
  onClose, 
  user,
  onSubmit, 
  isLoading 
}: { 
  open: boolean; 
  onClose: () => void; 
  user: User;
  onSubmit: (data: UpdateUserInput) => void;
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UpdateUserInput>({
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    isActive: user.isActive,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dashboard.users.edit_user')}</DialogTitle>
          <DialogDescription>
            {t('dashboard.users.edit_desc')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-firstName">{t('dashboard.users.columns.first_name')}</Label>
              <Input
                id="edit-firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-lastName">{t('dashboard.users.columns.last_name')}</Label>
              <Input
                id="edit-lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('dashboard.users.columns.email')}</Label>
            <Input value={user.email} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">{t('dashboard.users.email_immutable')}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">{t('dashboard.users.columns.role')}</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'admin' | 'member') => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">{t('dashboard.roles.member')}</SelectItem>
                <SelectItem value="admin">{t('dashboard.roles.admin')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-status">{t('dashboard.users.columns.status')}</Label>
            <Select
              value={formData.isActive ? 'active' : 'inactive'}
              onValueChange={(value) => setFormData({ ...formData, isActive: value === 'active' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t('dashboard.status.active')}</SelectItem>
                <SelectItem value="inactive">{t('dashboard.status.inactive')}</SelectItem>
              </SelectContent>
            </Select>
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
