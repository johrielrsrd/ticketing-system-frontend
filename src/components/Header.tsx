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
    <aside
      className="d-flex flex-column border-end bg-white"
      style={{ width: 260, minHeight: "100vh", position: "sticky", top: 0 }}
    >
      {/* Brand / Title */}
      <div className="px-3 py-3 border-bottom">
        <div className="fw-semibold">Ticketing</div>
        <div className="text-muted small">Support Desk</div>
      </div>

      {/* Nav / Views */}
      <nav className="px-2 py-3 flex-grow-1">
        <div className="text-uppercase text-muted small px-2 mb-2" style={{ letterSpacing: 0.6 }}>
          Views
        </div>

        <ul className="nav nav-pills flex-column gap-1">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${
                  isActive ? "active" : "text-dark"
                }`
              }
            >
              <span aria-hidden>🏠</span>
              <span>Home</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/tickets"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${
                  isActive ? "active" : "text-dark"
                }`
              }
            >
              <span aria-hidden>🎫</span>
              <span>My Tickets</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/tickets/all"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${
                  isActive ? "active" : "text-dark"
                }`
              }
            >
              <span aria-hidden>📋</span>
              <span>All Tickets</span>
            </NavLink>
          </li>
        </ul>

        {/* Placeholder for future views */}
        <div className="mt-4 px-2">
          <div className="text-uppercase text-muted small mb-2" style={{ letterSpacing: 0.6 }}>
            Future Views
          </div>
          <div className="text-muted small">
            Add presets like <span className="fw-semibold">Unassigned</span>,
            <span className="fw-semibold"> Overdue</span>, <span className="fw-semibold">High Priority</span>.
          </div>
        </div>
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-top">
        {user && (
          <div className="mb-2">
            <div className="d-flex align-items-center gap-2">
              <span className="badge text-bg-light border text-dark">👤</span>
              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <div className="fw-semibold text-truncate">{user.username}</div>
                <div className="text-muted small text-truncate">{user.email}</div>
              </div>
            </div>
          </div>
        )}

        <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Header;
