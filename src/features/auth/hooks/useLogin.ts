import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/api";
import { loginSuccess } from "@/features/auth/store/authSlice";

export type LoginCredentials = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: LoginCredentials) => {
    const { username, password } = credentials;
    setLoginError(null);
    setIsLoading(true);

    try {
      const response = await login(username, password);

      if (response.ok) {
        dispatch(loginSuccess(username));
      } else {
        const errorText = await response.text();
        setLoginError(errorText || "Invalid username or password");
      }
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError("Network error");
      }
    }
  };

  return { handleLogin, loginError, isLoading };
};
