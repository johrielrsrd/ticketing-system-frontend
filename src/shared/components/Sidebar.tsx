import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { logout } from '@/features/auth/store/authSlice';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <aside
      className="d-flex flex-column border-end bg-white"
      style={{ width: 260, minHeight: '100vh', position: 'sticky', top: 0 }}
    >
      <div className="px-3 py-3 border-bottom">
        <div className="fw-semibold">Ticketing</div>
        <div className="text-muted small">Support Desk</div>
      </div>

      <nav className="px-2 py-3 flex-grow-1">
        <div className="text-uppercase text-muted small px-2 mb-2" style={{ letterSpacing: 0.6 }}>
          Views
        </div>

        <ul className="nav nav-pills flex-column gap-1">
          <li className="nav-item">
            <NavLink
              to="/tickets"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${
                  isActive ? 'active' : 'text-dark'
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
                  isActive ? 'active' : 'text-dark'
                }`
              }
            >
              <span aria-hidden>📋</span>
              <span>All Tickets</span>
            </NavLink>
          </li>
        </ul>

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
};
