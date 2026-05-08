import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/core/store/store";
import { loadTickets } from "../store/ticketSlice";

export const useTicketsData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ticketsState = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

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


  return {
    tickets: ticketsState.ticketItems,
    loading: ticketsState.isLoading,
    error: ticketsState.error,
    statusBadge: statusBadgeClass,
  };
};
