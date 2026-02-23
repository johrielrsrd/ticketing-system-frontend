import { NavLink, useNavigate } from "react-router-dom";
import { logoutSuccess, selectCurrentUser } from "@/features/auth/store/authSlice";
import { logout } from "@/features/auth/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/core/store/store";

export function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectCurrentUser(state));

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutSuccess());
      console.log("User logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
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
        <div className="fw-semibold">Ticketing Lite</div>
        <div className="text-muted small">Support System</div>
      </div>

      {/* Nav / Views */}
      <nav className="px-2 py-3 flex-grow-1">
        <div
          className="text-uppercase text-muted small px-2 mb-2"
          style={{ letterSpacing: 0.6 }}
        >
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
          <div
            className="text-uppercase text-muted small mb-2"
            style={{ letterSpacing: 0.6 }}
          >
            Future Views
          </div>
          <div className="text-muted small">
            Add presets like <span className="fw-semibold">Unassigned</span>,
            <span className="fw-semibold"> Overdue</span>,{" "}
            <span className="fw-semibold">High Priority</span>.
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
                <div className="text-muted small text-truncate">
                  {user.email}
                </div>
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

export default Sidebar;
