import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/core/store/store.ts";
import { LogInPage } from "@/features/auth/pages/LogInPage";
import { RegistrationPage } from "@/features/auth/pages/RegistrationPage";
import { TicketViewsLayout } from "@/shared/layouts/TicketViewsLayout";
import TicketsPage from "@/features/tickets/pages/TicketsPage";
import { useSessionChecker as checkSession } from "@/features/auth/hooks/useSessionChecker";

export const AppRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const dispatch = useDispatch();
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    checkSession({ dispatch, setIsSessionLoading });
  }, [dispatch]);

  if (isSessionLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <div className="spinner-border" role="status" aria-hidden="true" />
          <div className="mt-2">Checking session…</div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <LogInPage /> : <Navigate to="/tickets" />}
      />

      <Route path="/register" element={<RegistrationPage />} />

      <Route
        path="/tickets"
        element={
          isAuthenticated ? (
            <TicketViewsLayout>
              <TicketsPage mode="my-tickets" />
            </TicketViewsLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/tickets/all"
        element={
          isAuthenticated ? (
            <TicketViewsLayout>
              <TicketsPage mode="all-tickets" />
            </TicketViewsLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};
