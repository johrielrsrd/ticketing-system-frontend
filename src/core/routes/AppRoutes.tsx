import { Routes, Route, Navigate } from "react-router-dom";
import { LogInPage } from "@/features/auth/pages/LogInPage";
import { RegistrationPage } from "@/features/auth/pages/RegistrationPage";
import { TicketViewsLayout } from "@/shared/layouts/TicketViewsLayout";
import TicketsPage from "@/features/tickets/pages/TicketsPage";
import { useSessionChecker } from "@/features/auth/hooks/useSessionChecker";

export const AppRoutes = () => {

  const { isAuthenticated, isLoading } = useSessionChecker();

  const LoadingOverlay = ({ show, label }: { show: boolean; label?: string }) => {
    if (!show) return null;

    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(2px)",
          zIndex: 2000,
        }}
        aria-live="polite"
        aria-busy="true"
      >
        <div className="text-center">
          <div className="spinner-border" role="status" aria-hidden="true" />
          <div className="mt-2">{label ?? "Loading…"}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <LoadingOverlay show={isLoading} label="Loading..." />

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
    </>
  );
};
