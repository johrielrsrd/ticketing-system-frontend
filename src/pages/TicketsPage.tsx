import { useEffect, useState } from "react";

interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const fetchTickets = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/tickets/my-tickets",
        {
          method: "GET",
          credentials: "include", // use session cookie
        }
      );

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
    fetchTickets();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-center text-muted">No tickets found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th
                  onClick={() => sortTickets("ticketId")}
                  style={{ cursor: "pointer" }}
                >
                  Ticket#
                </th>
                <th
                  onClick={() => sortTickets("priority")}
                  style={{ cursor: "pointer" }}
                >
                  Priority
                </th>
                <th
                  onClick={() => sortTickets("status")}
                  style={{ cursor: "pointer" }}
                >
                  Status
                </th>
                <th
                  onClick={() => sortTickets("subject")}
                  style={{ cursor: "pointer" }}
                >
                  Subject
                </th>
                <th
                  onClick={() => sortTickets("description")}
                  style={{ cursor: "pointer" }}
                >
                  Description
                </th>
                <th
                  onClick={() => sortTickets("createdAt")}
                  style={{ cursor: "pointer" }}
                >
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.ticketId}>
                  <td>{ticket.ticketId}</td>
                  <td>{ticket.priority}</td>
                  <td>
                    <span
                      className={`badge ${
                        ticket.status === "Open"
                          ? "bg-danger"
                          : ticket.status === "New"
                          ? "bg-warning text-dark"
                          : ticket.status === "Pending"
                          ? "bg-info"
                          : ticket.status === "On Hold"
                          ? "bg-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.description}</td>

                  <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
