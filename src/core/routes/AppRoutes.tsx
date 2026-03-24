import { Routes, Route, Navigate } from "react-router-dom";
import { LogInPage } from "@/features/auth/pages/LogInPage";
import { RegistrationPage } from "@/features/auth/pages/RegistrationPage";
import { TicketViewsLayout } from "@/shared/layouts/TicketViewsLayout";
import { TicketsPage } from "@/features/tickets/pages/TicketsPage";
import CsvUploadPage from "@/features/data/pages/CsvUploadPage";
import { useSessionChecker } from "@/features/auth/hooks/useSessionChecker";
import { HomePage } from "@/features/analytics/pages/HomePage";

type LoadingOverlayProps = {
  show: boolean;
  label?: string;
};

export const AppRoutes = () => {
  const { isAuthenticated, hasCheckedSession } = useSessionChecker();

  const LoadingOverlay = ({ show, label }: LoadingOverlayProps) => {
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

  if (!hasCheckedSession) {
    return <LoadingOverlay show={true} label="Loading..." />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <LogInPage />
            ) : (
              <TicketViewsLayout>
                <HomePage />
              </TicketViewsLayout>
            )
          }
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

        {/* <Route
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
        /> */}

        <Route
          path="/tickets/upload"
          element={
            isAuthenticated ? (
              <TicketViewsLayout>
                <CsvUploadPage />
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
