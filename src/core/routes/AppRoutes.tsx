import TicketsPage from "@/pages/TicketsPage";
import RegistrationForm from "@/components/RegistrationForm";
import Header from "@/components/Header";
import CsvUpload from "@/components/CsvUpload";
import { fetchSession, logout, register } from "@/api";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/core/store/store.ts";
import { loginSuccess, logoutSuccess } from "@/features/auth/store/authSlice";
import { LogInPage } from "@/features/auth/pages/LogInPage";

export const AppRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetchSession();

        if (response.ok) {
          const data = await response.json();
          dispatch(loginSuccess(data.username));
        } 

      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setIsSessionLoading(false);
      }
    };

    checkSession();
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

  const handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ) => {
    setError(null);

    try {
      const response = await register({
        firstName,
        lastName,
        email,
        username,
        password,
      });

      if (response.ok) {
        setError("Registration successful! Please log in.");
      } else {
        const errorText = await response.text();
        setError(errorText || "Registration failed");
      }
    } catch (err) {
      setError("Network error " + err);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <LogInPage /> : <Navigate to="/tickets" />}
      />

      <Route
        path="/tickets"
        element={
          isAuthenticated ? (
            <div
              className="d-flex"
              style={{ minHeight: "100vh", background: "#f8f9fa" }}
            >
              <Header
                onLogout={() => {
                  logout();
                  dispatch(logoutSuccess());
                }}
              />
              <main className="flex-grow-1">
                <div className="border-bottom bg-white px-4 py-3">
                  <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                    <div className="fw-semibold">Tickets</div>
                    <div>
                      <CsvUpload />
                    </div>
                  </div>
                </div>
                <TicketsPage mode="my-tickets" />
              </main>
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/tickets/all"
        element={
          isAuthenticated ? (
            <div
              className="d-flex"
              style={{ minHeight: "100vh", background: "#f8f9fa" }}
            >
              <Header
                onLogout={() => {
                  logout();
                  dispatch(logoutSuccess());
                }}
              />
              <main className="flex-grow-1">
                <div className="border-bottom bg-white px-4 py-3">
                  <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                    <div className="fw-semibold">All Tickets</div>
                    <div>
                      <CsvUpload />
                    </div>
                  </div>
                </div>
                <TicketsPage mode="all-tickets" />
              </main>
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/register"
        element={
          <div className="container py-5" style={{ maxWidth: 720 }}>
            <h1 className="text-center mb-4">Ticketing System</h1>
            <RegistrationForm onRegister={handleRegister} />
            {error && (
              <div className="alert alert-danger mt-3 text-center" role="alert">
                {error}
              </div>
            )}
          </div>
        }
      />
    </Routes>
  );
};
