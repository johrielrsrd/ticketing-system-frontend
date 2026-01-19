import { useState } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { login, clearError } from '@/features/auth/store/authSlice';
import { Navigate } from 'react-router-dom';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/tickets" replace />;
  }

  const handleLogin = async (username: string, password: string) => {
    setLocalError(null);
    dispatch(clearError());
    
    const result = await dispatch(login({ username, password }));
    if (login.rejected.match(result)) {
      setLocalError(result.payload as string || 'Login failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <h1 className="text-center mb-4">Ticketing System</h1>
      <LoginForm onLogin={handleLogin} error={error || localError || undefined} />
    </div>
  );
};
