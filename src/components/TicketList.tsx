
export type Ticket = {
  id: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
};

type TicketListProps = {
  tickets: Ticket[];
};

function TicketList({ tickets }: TicketListProps) {
  return (
    <div>
      
    <ul>
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          className="ticket-item"
        >
          <strong>{ticket.subject}</strong> - {ticket.description} <br />
          Status: {ticket.status} | Priority: {ticket.priority} <br />
          Created: {new Date(ticket.createdAt).toLocaleString()}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default TicketList;
