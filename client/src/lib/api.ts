import type { ApiError, ApiSuccess } from '@shared/types';

const API_BASE_URL = '/api';

/**
 * API client wrapper with error handling
 */
class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        credentials: 'include', // Important for session cookies
      });

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
// USERS API (to be implemented)
// ============================================

export const usersApi = {
  // TODO: Implement user CRUD operations
};

// ============================================
// LEADS API (to be implemented)
// ============================================

export const leadsApi = {
  // TODO: Implement lead CRUD operations
};

// ============================================
// TASKS API (to be implemented)
// ============================================

export const tasksApi = {
  // TODO: Implement task CRUD operations
};

// ============================================
// STATS API (to be implemented)
// ============================================

export const statsApi = {
  // TODO: Implement stats operations
};
