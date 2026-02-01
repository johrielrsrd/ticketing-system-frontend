import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/core/routes/AppRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
