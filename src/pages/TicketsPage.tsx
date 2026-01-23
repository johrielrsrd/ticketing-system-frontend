import { useEffect, useState } from "react";
import { buildApiUrl } from "../lib/api";

interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface SolveRate {
  solveRatePercentage: number;
  solvedCount: number;
  unsolvedCount: number;
  totalCount: number;
}

type TicketsPageProps = {
  mode?: "my-tickets" | "all-tickets";
};

export default function TicketsPage({ mode = "my-tickets" }: TicketsPageProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [solveRate, setSolveRate] = useState<SolveRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [hideClosedSolved, setHideClosedSolved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchTickets = async () => {
    try {
      setError(null);
      const url = buildApiUrl(
        mode === "my-tickets" ? "/api/tickets/my-tickets" : "/api/tickets"
      );

      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // use session cookie
      });

      if (!response.ok) {
        throw new Error("Unauthorized or failed to fetch tickets");
      }

      const data = await response.json();
      setTickets(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSolveRate = async () => {
    try {
      const response = await fetch(buildApiUrl("/api/analytics/solve-rate"), {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch solve rate data");
      }

      const data = await response.json();
      setSolveRate(data);
    } catch (err) {
      console.error("Error fetching solve rate:", err);
    }
  };

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case "Open":
        return "text-bg-danger";
      case "New":
        return "text-bg-warning";
      case "Pending":
        return "text-bg-info";
      case "On Hold":
        return "text-bg-dark";
      case "Solved":
        return "text-bg-success";
      case "Closed":
        return "text-bg-secondary";
      default:
        return "text-bg-secondary";
    }
  };

  const sortTickets = (column: keyof Ticket) => {
    let direction: "asc" | "desc" = "asc";

    // If clicking the same column → toggle direction
    if (sortColumn === column) {
      direction = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(direction);
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    // Perform sorting
    const sorted = [...tickets].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      // Compare numbers
      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      }

      // Compare dates
      if (column === "createdAt") {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      // Compare strings (case-insensitive)
      return direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    setTickets(sorted);
  };

  useEffect(() => {
    setLoading(true);
    fetchTickets();

    if (mode === "all-tickets") {
      setSolveRate(null);
    } else {
      fetchSolveRate();
    }
  }, [mode]);

  if (loading)
    return (
      <div className="p-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const displayedTickets = tickets
    .filter((ticket) => {
      if (!hideClosedSolved) return true;
      return ticket.status !== "Closed" && ticket.status !== "Solved";
    })
    .filter((ticket) => {
      if (!statusFilter) return true;
      return ticket.status === statusFilter;
    })
    .filter((ticket) => {
      if (!normalizedQuery) return true;
      const haystack = `${ticket.subject} ${ticket.description}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });

  return (
    <div className="p-4 w-100">
      {/* Header / Toolbar */}
      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-start align-items-md-center mb-3">
        <div className="d-flex flex-column">
          <div className="h5 mb-1">
            {mode === "all-tickets" ? "All Tickets" : "My Tickets"}
          </div>
          {solveRate && (
            <div className="text-muted small">
              <strong className="text-dark">Solve Rate:</strong> {solveRate.solveRatePercentage.toFixed(2)}%
              <span className="text-muted"> ({solveRate.solvedCount} solved out of {solveRate.totalCount})</span>
            </div>
          )}
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-end">
          <input
            className="form-control"
            placeholder="Search subject/description..."
            style={{ width: 280 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="form-select"
            style={{ width: 180 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
            <option value="Solved">Solved</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="form-check mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="hideClosedSolved"
              checked={hideClosedSolved}
              onChange={(e) => setHideClosedSolved(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="hideClosedSolved">
              Hide Closed &amp; Solved
            </label>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {displayedTickets.length === 0 ? (
            <div className="p-4 text-center text-muted">No tickets found.</div>
          ) : (
            <div className="table-responsive" style={{ maxHeight: "78vh", overflowY: "auto" }}>
              <table className="table table-hover align-middle mb-0">
                <thead className="sticky-top bg-white border-bottom">
                  <tr className="small text-uppercase text-muted">
                    <th
                      className="py-2 px-3 fw-semibold text-nowrap"
                      onClick={() => sortTickets("ticketId")}
                      style={{ cursor: "pointer" }}
                    >
                      Ticket#
                    </th>
                    <th
                      className="py-2 px-3 fw-semibold text-nowrap"
                      onClick={() => sortTickets("priority")}
                      style={{ cursor: "pointer" }}
                    >
                      Priority
                    </th>
                    <th
                      className="py-2 px-3 fw-semibold text-nowrap"
                      onClick={() => sortTickets("status")}
                      style={{ cursor: "pointer" }}
                    >
                      Status
                    </th>
                    <th
                      className="py-2 px-3 fw-semibold"
                      onClick={() => sortTickets("subject")}
                      style={{ cursor: "pointer" }}
                    >
                      Subject
                    </th>
                    <th className="py-2 px-3 fw-semibold">Details</th>
                    <th
                      className="py-2 px-3 fw-semibold text-nowrap"
                      onClick={() => sortTickets("createdAt")}
                      style={{ cursor: "pointer" }}
                    >
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedTickets.map((ticket) => (
                    <tr key={ticket.ticketId}>
                      <td className="px-3 text-nowrap">{ticket.ticketId}</td>
                      <td className="px-3 text-nowrap">{ticket.priority}</td>
                      <td className="px-3 text-nowrap">
                        <span className={`badge rounded-pill px-2 py-1 ${statusBadgeClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-3">
                        <div className="fw-semibold text-truncate" style={{ maxWidth: 360 }}>
                          {ticket.subject}
                        </div>
                      </td>
                      <td className="px-3">
                        <div className="text-muted text-truncate" style={{ maxWidth: 520 }}>
                          {ticket.description}
                        </div>
                      </td>
                      <td className="px-3 text-nowrap text-muted">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
