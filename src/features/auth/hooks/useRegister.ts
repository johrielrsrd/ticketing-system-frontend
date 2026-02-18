import { useState } from "react";
import { register } from "@/features/auth/services/authApi";
import { logIn } from "@/features/auth/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/core/store/store";

export type RegistrationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  );

  const handleRegister = async (credentials: RegistrationPayload) => {
    const { firstName, lastName, email, username, password } = credentials;
    setRegistrationError(null);

    // Helper to safely parse JSON (returns null if parsing fails)
    const safeJson = async <T>(res: Response): Promise<T | null> =>
      res.json().catch(() => null);

    try {
      const response = await register({
        firstName,
        lastName,
        email,
        username,
        password,
      });

      console.log("Registration response:", response);

      const data = await safeJson<{ message?: string }>(response);

      if (response.ok) {
        console.log("Registration successful:", data);

        // Automatically log in after successful registration
        dispatch(logIn({ username, password }));

        console.log("Auto-login successful:");

        setRegistrationError("Registration successful! Redirecting...");

        setTimeout(() => {
          navigate("/tickets");
        }, 1000);
      } else {
        setRegistrationError(
          data?.message ??
            `Registration failed: ${response.status} ${response.statusText}`,
        );
      }
    } catch (err) {
      console.log("Registration error:", err);
      setRegistrationError("Network error. Please try again.");
    }
  };
  return { handleRegister, registrationError };
};
