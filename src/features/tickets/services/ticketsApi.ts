import { apiFetch } from "../../../core/services/api";

export const fetchTickets = (mode: "my-tickets" | "all-tickets") =>
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
