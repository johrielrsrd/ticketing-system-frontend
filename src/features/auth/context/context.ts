import { createContext } from 'react';
import type { User } from '@/features/auth/services/authApi';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
