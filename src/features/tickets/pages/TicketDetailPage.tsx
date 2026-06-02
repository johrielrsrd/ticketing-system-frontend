import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTicketById } from "../services/ticketsApi";
import { type Ticket } from "../store/ticketSlice";

export const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setLoading(true);
        const response = await fetchTicketById(Number(ticketId));
        if (!response.ok) throw new Error("Ticket not found");
        const data = await response.json();
        setTicket(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [ticketId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ticket) return <p>"Ticket is missing."</p>

  return (
    <div>
      <h1>Ticket Details</h1>
      <p>Ticket Id: {ticket.ticketId}</p>
      <p>Ticket Status: {ticket.status}</p>
      <p>Ticket Subject: {ticket.subject}</p>
      <p>Ticket Assignee: {ticket.assignee}</p>
      <p>Ticket Requester: {ticket.requester}</p>
      <p>Ticket Organization: {ticket.organization}</p>
      <p>Ticket Created Date: {ticket.createdDate}</p>
      <p>Ticket Solved Date: {ticket.solvedDate || "N/A"}</p>
      <p>Ticket Category: {ticket.category}</p>
      <p>Ticket Remarks: {ticket.remarks}</p>
      <p>Ticket ETA: {ticket.eta || "N/A"}</p>
      <p>Jira Ticket Id: {ticket.jiraTicketId}</p>
      <p>Jira Status: {ticket.jiraStatus}</p>
    </div>
  );
};
