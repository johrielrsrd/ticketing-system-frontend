import { apiFetch } from "../core/services/api";

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export const fetchSession = () =>
  apiFetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
  });

export const login = (username: string, password: string) =>
  apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

export const register = (payload: RegisterPayload) =>
  apiFetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const logout = () =>
  apiFetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
