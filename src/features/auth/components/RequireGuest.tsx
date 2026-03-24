import { Navigate, Outlet } from "react-router-dom";
import { useSessionChecker } from "../hooks/useSessionChecker";
import { AuthLoadingScreen } from "@/shared/components/AuthLoadingScreen";

export const RequireGuest = () => {
  const { isAuthenticated, hasCheckedSession } = useSessionChecker();

  if (!hasCheckedSession) {
    return <AuthLoadingScreen show={true} label="Loading..." />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};
