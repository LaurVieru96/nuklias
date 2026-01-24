import type { ApiError, ApiSuccess, User, LoginInput } from '@/types';
import { API_BASE_URL } from '@/config/env';

/**
 * Generic API client wrapper
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    // Remove trailing slash to avoid double slashes
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important for cookies
    };

    try {
      const response = await fetch(url, config);

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.error || data.message || 'Request failed',
          details: data.details,
        };
      }

      return data;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 0,
        message: 'Network error',
        details: error.message,
      };
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();

// ============================================
// AUTH API
// ============================================

export const authApi = {
  login: (email: string, password: string, rememberMe?: boolean) =>
    api.post<ApiSuccess>('/auth/login', { email, password, rememberMe }),

  logout: () => api.post<ApiSuccess>('/auth/logout'),

  me: () => api.get<ApiSuccess>('/auth/me'),
};

// ============================================
// USERS API
// ============================================

export const usersApi = {
  // TODO: Implement user CRUD operations
};

// ============================================
// LEADS API
// ============================================

export const leadsApi = {
  list: (params?: any) => api.get<any>('/leads' + (params ? '?' + new URLSearchParams(params) : '')),
  create: (data: any) => api.post<any>('/leads', data),
  get: (id: string) => api.get<any>(`/leads/${id}`),
  update: (id: string, data: any) => api.put<any>(`/leads/${id}`, data),
  delete: (id: string) => api.delete<any>(`/leads/${id}`),
};

// ============================================
// TASKS API
// ============================================

export const tasksApi = {
  list: (params?: any) => api.get<any>('/tasks' + (params ? '?' + new URLSearchParams(params) : '')),
  create: (data: any) => api.post<any>('/tasks', data),
  get: (id: string) => api.get<any>(`/tasks/${id}`),
  update: (id: string, data: any) => api.put<any>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete<any>(`/tasks/${id}`),
};

// ============================================
// STATS API
// ============================================

export const statsApi = {
  getDashboard: () => api.get<{
    success: boolean;
    data: {
      totalLeads: number;
      activeTasks: number;
      teamSize: number;
      conversionRate: number;
    }
  }>('/stats/dashboard'),
};
