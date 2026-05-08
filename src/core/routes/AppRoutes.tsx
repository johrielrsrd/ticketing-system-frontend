import { Routes, Route, Outlet } from "react-router-dom";
import { LogInPage } from "@/features/auth/pages/LogInPage";
import { RegistrationPage } from "@/features/auth/pages/RegistrationPage";
import { TicketViewsLayout } from "@/shared/layouts/TicketViewsLayout";
import { TicketsPage } from "@/features/tickets/pages/TicketsPage";
import CsvUploadPage from "@/features/data/pages/CsvUploadPage";
import { HomePage } from "@/features/analytics/pages/HomePage";
import { RequireAuth } from "@/features/auth/components/RequireAuth";
import { RequireGuest } from "@/features/auth/components/RequireGuest";
import { RootRedirect } from "@/features/auth/components/RootRedirect";
import { TicketDetailPage } from "@/features/tickets/pages/TicketDetailPage";

const AppLayout = () => (
  <TicketViewsLayout>
    <Outlet />
  </TicketViewsLayout>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<RequireGuest />}>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/my-tickets" element={<TicketsPage />} />
          <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />
          <Route path="/data/upload" element={<CsvUploadPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
