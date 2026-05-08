import { useParams } from "react-router-dom";

export const TicketDetailPage = () => {
  const { ticketId, ticketStatus } = useParams();

  // Implementation for ticket detail page
  return (
    <div>
      <h1>Ticket Details</h1>
      <p>Ticket Id: {ticketId}</p>
      <p>Ticket Status: {ticketStatus}  </p>
    </div>
  );
};
