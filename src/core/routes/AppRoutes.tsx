import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { TicketsPage } from '@/features/tickets/pages/TicketsPage';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { checkSession } from '@/features/auth/store/authSlice';

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/tickets" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/tickets" replace /> : <RegisterPage />}
      />

      {/* Protected Routes */}
      <Route
        path="/tickets"
        element={
          <DashboardLayout>
            <TicketsPage mode="my-tickets" />
          </DashboardLayout>
        }
      />
      <Route
        path="/tickets/all"
        element={
          <DashboardLayout>
            <TicketsPage mode="all-tickets" />
          </DashboardLayout>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
