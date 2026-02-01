import { apiFetch } from "../core/services/api";

export const fetchSolveRate = () =>
  apiFetch("/api/analytics/solve-rate", {
    method: "GET",
    credentials: "include",
  });
