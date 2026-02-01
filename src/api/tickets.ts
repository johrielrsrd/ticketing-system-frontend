import { apiFetch } from "../core/services/api";

type TicketsMode = "my-tickets" | "all-tickets";

export const fetchTickets = (mode: TicketsMode) =>
  apiFetch(mode === "my-tickets" ? "/api/tickets/my-tickets" : "/api/tickets", {
    method: "GET",
    credentials: "include",
  });

export const uploadTicketsCsv = (formData: FormData) =>
  apiFetch("/api/tickets/upload-csv", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
