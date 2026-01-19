import { apiService } from '@/core/services/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    return apiService.post('/auth/login', credentials);
  },

  async register(data: RegisterData) {
    return apiService.post('/auth/register', data);
  },

  async logout() {
    return apiService.post('/auth/logout');
  },

  async checkSession() {
    return apiService.get<User>('/auth/me');
  },

  async getCurrentUser() {
    return apiService.get<User>('/users/me');
  },
};
