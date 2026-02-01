import { useState } from "react";
import { register } from "@/api";

export type RegistrationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export const useRegister = () => {
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  );

  const handleRegister = async (credentials: RegistrationPayload) => {
    const { firstName, lastName, email, username, password } = credentials;
    setRegistrationError(null);

    try {
      const response = await register({
        firstName,
        lastName,
        email,
        username,
        password,
      });

      if (response.ok) {
        setRegistrationError("Registration successful! Please log in.");
      } else {
        const errorText = await response.text();
        setRegistrationError("Registration failed: " + errorText);
      }
    } catch (err) {
      setRegistrationError("Network error " + err);
    }
  };
  return { handleRegister, registrationError };
};
