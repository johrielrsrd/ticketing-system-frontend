import { apiFetch } from "../core/services/api";

export const fetchCurrentUser = () =>
  apiFetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });
