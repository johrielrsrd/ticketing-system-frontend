import type { Ticket } from "../types/types";
import { useState } from "react";

type FilterProps = {
  tickets: Ticket[];
};

export const useTicketsFilter = (props: FilterProps) => {
  const { tickets } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [hideClosedSolved, setHideClosedSolved] = useState(false);

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

  return {
    displayedTickets,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    hideClosedSolved,
    setHideClosedSolved,
  };
};
