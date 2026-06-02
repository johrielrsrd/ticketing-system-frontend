import { useTicketsData } from "../hooks/useTicketsData";
import { useTicketSorting } from "../hooks/useTicketSorting";
import { useNavigate } from "react-router-dom";

export const TicketsPage = () => {
  const navigate = useNavigate();
  const { tickets, loading, error, statusBadge } = useTicketsData();
  const { sortedTickets, handleSort, getSortIndicator } =
    useTicketSorting(tickets);

  if (loading)
    return (
      <div className="p-4">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "40vh" }}
        >
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

  return (
    <div className="p-4 w-100">
      {/* Header */}
      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-start align-items-md-center mb-3">
        <div className="d-flex flex-column">
          <div className="h5 mb-1">My Tickets</div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {tickets.length === 0 ? (
            <div className="p-4 text-center text-muted">No tickets found.</div>
          ) : (
            <div
              className="table-responsive"
              style={{
                maxHeight: "88vh",
                maxWidth: "170vh",
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <table className="table table-hover align-middle mb-0">
                <thead className="sticky-top bg-white border-bottom">
                  <tr className="small text-uppercase text-muted">
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("priority")}
                      >
                        Priority {getSortIndicator("priority")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("ticketId")}
                      >
                        Ticket ID {getSortIndicator("ticketId")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("status")}
                      >
                        Status {getSortIndicator("status")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("subject")}
                      >
                        Subject {getSortIndicator("subject")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("assignee")}
                      >
                        Assignee {getSortIndicator("assignee")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("requester")}
                      >
                        Requester {getSortIndicator("requester")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("organization")}
                      >
                        Organization {getSortIndicator("organization")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("createdDate")}
                      >
                        Created Date {getSortIndicator("createdDate")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("solvedDate")}
                      >
                        Solve Date {getSortIndicator("solvedDate")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("category")}
                      >
                        Category {getSortIndicator("category")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("remarks")}
                      >
                        Remarks {getSortIndicator("remarks")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("eta")}
                      >
                        ETA {getSortIndicator("eta")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("jiraTicketId")}
                      >
                        Jira {getSortIndicator("jiraTicketId")}
                      </button>
                    </th>
                    <th className="py-2 px-3 fw-semibold text-nowrap">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-reset fw-semibold text-uppercase small"
                        onClick={() => handleSort("jiraStatus")}
                      >
                        Jira Status {getSortIndicator("jiraStatus")}
                      </button>
                    </th>
                  </tr>
                </thead>

                {/* Render sorted and filtered tickets */}
                <tbody>
                  {sortedTickets.map((ticket) => (
                    <tr
                      key={ticket.ticketId}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/tickets/${ticket.ticketId}`)
                      }
                    >
                      <td className="px-3 text-nowrap">{ticket.priority}</td>
                      <td className="px-3 text-nowrap">
                        <a
                          href={`https://inpixon.zendesk.com/agent/tickets/${ticket.ticketId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ticket.ticketId}
                        </a>
                      </td>
                      <td className="px-3 text-nowrap">
                        <span
                          className={`badge rounded-pill px-2 py-1 ${statusBadge(ticket.status)}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-3">
                        <div
                          className="fw-semibold text-truncate"
                          style={{ maxWidth: 360 }}
                        >
                          {ticket.subject}
                        </div>
                      </td>
                      <td className="px-3 text-nowrap">{ticket.assignee}</td>
                      <td className="px-3 text-nowrap">{ticket.requester}</td>
                      <td className="px-3 text-nowrap">
                        {ticket.organization}
                      </td>
                      <td className="px-3 text-nowrap text-muted">
                        {ticket.createdDate}
                      </td>
                      <td className="px-3 text-nowrap text-muted">
                        {ticket.solvedDate}
                      </td>
                      <td className="px-3 text-nowrap">{ticket.category}</td>
                      <td className="px-3">{ticket.remarks}</td>
                      <td className="px-3 text-nowrap">{ticket.eta}</td>
                      <td className="px-3 text-nowrap">
                        {ticket.jiraTicketId}
                      </td>
                      <td className="px-3 text-nowrap">{ticket.jiraStatus}</td>
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
};
