import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type HeaderProps = {
  onLogout: () => void;
};

export function Header({ onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("Fetched user info:", data);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      onLogout();
      navigate("/");
    }
  };

  return (
    <header className="mb-4">
      <nav className="d-flex justify-content-between align-items-center">
        <div className="btn-group" role="group">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `btn ${isActive ? "btn-secondary" : "btn-outline-dark"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tickets"
            end
            className={({ isActive }) =>
              `btn ${isActive ? "btn-secondary" : "btn-outline-dark"}`
            }
          >
            My Tickets
          </NavLink>

          <NavLink
            to="/tickets/all"
            className={({ isActive }) =>
              `btn ${isActive ? "btn-secondary" : "btn-outline-dark"} `
            }
          >
            All Tickets
          </NavLink>
        </div>

        <div className="d-flex align-items-center gap-3">
          {user && (
            <span className="badge bg-success fs-6">
              👤 {user.username} - {user.email}
            </span>
          )}

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
