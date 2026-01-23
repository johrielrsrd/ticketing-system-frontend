import { apiFetch } from "./client";

export const fetchSolveRate = () =>
  apiFetch("/api/analytics/solve-rate", {
    method: "GET",
    credentials: "include",
  });
