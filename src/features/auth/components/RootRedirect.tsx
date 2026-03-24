import { Navigate } from "react-router-dom";
import { useSessionChecker } from "../hooks/useSessionChecker";
import { AuthLoadingScreen } from "@/shared/components/AuthLoadingScreen";

export const RootRedirect = () => {
  const { isAuthenticated, hasCheckedSession } = useSessionChecker();

  if (!hasCheckedSession) {
    return <AuthLoadingScreen show={true} label="Loading..." />;
  }

  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
};
