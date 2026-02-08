export type TicketsPageProps = {
  mode?: "my-tickets" | "all-tickets";
};

export interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface SolveRate {
  solveRatePercentage: number;
  solvedCount: number;
  unsolvedCount: number;
  totalCount: number;
}