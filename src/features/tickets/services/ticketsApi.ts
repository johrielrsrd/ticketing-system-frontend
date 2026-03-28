import { apiFetch } from "../../../core/services/api";

export const fetchTickets = () =>
  apiFetch("/api/tickets/my-tickets", {
    method: "GET",
    credentials: "include",
  });

export const uploadTicketsCsv = (formData: FormData) =>
  apiFetch("/api/tickets/upload-csv", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
