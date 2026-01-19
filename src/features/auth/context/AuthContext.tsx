import { useState, useEffect, type ReactNode } from 'react';
import { authService, type User } from '@/features/auth/services/authApi';
import { AuthContext } from './context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    setIsLoading(true);
    const response = await authService.checkSession();
    if (response.ok && response.data) {
      setIsAuthenticated(true);
      setUser(response.data);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await authService.login({ username, password });
    
    if (response.ok) {
      setIsAuthenticated(true);
      // Fetch user details after successful login
      const userResponse = await authService.getCurrentUser();
      if (userResponse.ok && userResponse.data) {
        setUser(userResponse.data);
      }
      return { success: true };
    } else {
      return { 
        success: false, 
        error: response.error || 'Invalid username or password' 
      };
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) => {
    const response = await authService.register({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: response.error || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        register,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
