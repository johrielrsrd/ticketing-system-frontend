import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import TicketsPage from "./pages/TicketsPage";

function Apps() {
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ticketing System</h1>

      {!isLoggedIn ? (
        <>
          <LoginForm onLogin={handleLogin} />
          {error && (
            <div className="alert alert-danger mt-3 text-center" role="alert">
              {error}
            </div>
          )}
        </>
      ) : (
        <TicketsPage />
      )}

      
    </div>
  );
}

export default Apps;