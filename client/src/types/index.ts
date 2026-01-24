// Frontend types for Nuklias Dashboard

// ============================================
// USER TYPES
// ============================================

export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// ============================================
// LEAD TYPES
// ============================================

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';
export type LeadPriority = 'high' | 'medium' | 'low';
export type LeadSource = 'website_form' | 'manual' | 'import';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  location: string;
  industry: string;
  businessType: string;
  challenge: string;
  message: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string | null;
  estimatedValue?: number | null;
  source: LeadSource;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string | null;
  location: string;
  industry: string;
  businessType: string;
  challenge: string;
  message: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  assignedTo?: string | null;
  estimatedValue?: number | null;
  source?: LeadSource;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  phone?: string | null;
  location?: string;
  industry?: string;
  businessType?: string;
  challenge?: string;
  message?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  assignedTo?: string | null;
  estimatedValue?: number | null;
}

// ============================================
// TASK TYPES
// ============================================

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  createdBy: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  completedAt?: Date;
  relatedLeadId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  assignedTo: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  relatedLeadId?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  assignedTo?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  completedAt?: Date;
  relatedLeadId?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiError {
  error: string;
  message?: string;
  details?: any;
}

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  message?: string;
}
