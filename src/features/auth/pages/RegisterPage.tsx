import { useState } from 'react';
import { RegistrationForm } from '@/features/auth/components/RegistrationForm';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { register, clearError } from '@/features/auth/store/authSlice';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) => {
    setLocalError(null);
    setSuccess(null);
    dispatch(clearError());
    
    const result = await dispatch(register({ firstName, lastName, email, username, password }));
    
    if (register.fulfilled.match(result)) {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else if (register.rejected.match(result)) {
      setLocalError(result.payload as string || 'Registration failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="text-center mb-4">Ticketing System</h1>
      <RegistrationForm 
        onRegister={handleRegister} 
        error={error || localError || undefined}
        success={success || undefined}
      />
    </div>
  );
};
