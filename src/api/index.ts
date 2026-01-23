const DEFAULT_API_BASE_URL = "http://localhost:8080";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

const buildApiUrl = (path: string) =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const getSession = () =>
  fetch(buildApiUrl("/api/auth/me"), {
    method: "GET",
    credentials: "include",
  });

export const login = (username: string, password: string) =>
  fetch(buildApiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

export const register = (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) =>
  fetch(buildApiUrl("/api/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      username,
      password,
    }),
  });

export const logout = () =>
  fetch(buildApiUrl("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
  });

export const fetchCurrentUser = async <T>() => {
  const response = await fetch(buildApiUrl("/api/users/me"), {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as T;
};

export const uploadTicketsCsv = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(buildApiUrl("/api/tickets/upload-csv"), {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(responseText || "Upload failed");
  }

  return responseText;
};

export const fetchTickets = (mode: "my-tickets" | "all-tickets") =>
  fetch(
    buildApiUrl(
      mode === "my-tickets" ? "/api/tickets/my-tickets" : "/api/tickets"
    ),
    {
      method: "GET",
      credentials: "include",
    }
  );

export const fetchSolveRate = () =>
  fetch(buildApiUrl("/api/analytics/solve-rate"), {
    method: "GET",
    credentials: "include",
  });
