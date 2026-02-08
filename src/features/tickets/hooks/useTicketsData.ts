import { useState, useEffect } from "react";
import { fetchTickets } from "../services/ticketsApi";
import { type Ticket } from "../types/types";

export const useTicketsData = (mode: "my-tickets" | "all-tickets") => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setError(null);
        const response = await fetchTickets(mode);

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
    loadTickets();
  }, [mode]);

  return { tickets, loading, error, setTickets };
};
