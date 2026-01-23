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
import { getSession, login, register } from "./api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Check if user already logged in (session cookie still valid)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
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
      const response = await login(username, password);

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
      const response = await register(
        firstName,
        lastName,
        email,
        username,
        password
      );

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <div className="container py-5" style={{ maxWidth: 500 }}>
                <h1 className="text-center mb-4">Ticketing System</h1>
                <LoginForm onLogin={handleLogin} />
                {error && (
                  <div
                    className="alert alert-danger mt-3 text-center"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <Navigate to="/tickets" />
            )
          }
        />

        <Route
          path="/tickets"
          element={
            isLoggedIn ? (
              <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
                <Header onLogout={() => setIsLoggedIn(false)} />
                <main className="flex-grow-1">
                  <div className="border-bottom bg-white px-4 py-3">
                    <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                      <div className="fw-semibold">Tickets</div>
                      <div>
                        <CsvUpload/>
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
            isLoggedIn ? (
              <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
                <Header onLogout={() => setIsLoggedIn(false)} />
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
                <div
                  className="alert alert-danger mt-3 text-center"
                  role="alert"
                >
                  {error}
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
