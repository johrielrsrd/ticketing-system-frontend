import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/core/store/store";
import { loadTickets } from "../store/ticketSlice";

export const useTicketsData = (mode: "my-tickets" | "all-tickets") => {
  const dispatch = useDispatch<AppDispatch>();
  const ticketsState = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    dispatch(loadTickets(mode));
  }, [dispatch, mode]);

  return {
    tickets: ticketsState.items,
    loading: ticketsState.isLoading,
    error: ticketsState.error,
  };
};
