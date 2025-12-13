import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TicketsPage from "./pages/TicketsPage";
import RegistrationForm from "./components/RegistrationForm";
import Header from "./components/Header";
import CsvUpload from "./components/CsvUpload";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Check if user already logged in (session cookie still valid)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) setIsLoggedIn(true);
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        const errorText = await response.text();
        setError(errorText || "Invalid username or password");
      }
    } catch (err) {
      setError("Network error " + err);
    }
  };

  const handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) => {
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
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
    <div>
      <Router>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Ticketing System</h1>
          <Routes>
            <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <>
                    <LoginForm onLogin={handleLogin} />
                    {error && (
                      <div
                        className="alert alert-danger mt-3 text-center"
                        role="alert"
                      >
                        {error}
                      </div>
                    )}
                  </>
                ) : (
                  <Navigate to="/tickets" />
                )
              }
            />

            <Route
              path="/tickets"
              element={
                isLoggedIn ? (
                  <>
                    <Header onLogout={() => setIsLoggedIn(false)} />
                    <CsvUpload />
                    <TicketsPage mode="my-tickets" />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/tickets/all"
              element={
                isLoggedIn ? (
                  <>
                    <Header onLogout={() => setIsLoggedIn(false)} />
                    <CsvUpload />
                    <TicketsPage mode="all-tickets" />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/register"
              element={
                <>
                  <RegistrationForm onRegister={handleRegister} />
                  {error && (
                    <div
                      className="alert alert-danger mt-3 text-center"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
