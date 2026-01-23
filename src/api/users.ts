import { apiFetch } from "./client";

export const fetchCurrentUser = () =>
  apiFetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });
