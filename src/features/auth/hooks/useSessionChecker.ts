import type { AppDispatch } from "@/core/store/store";
import { useDispatch } from "react-redux";
import { fetchSession } from "@/features/auth/services/authApi";
import { loginSuccess } from "@/features/auth/store/authSlice";
import { useEffect, useState } from "react";

export const useSessionChecker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setIsSessionLoading(true);

      try {
        const response = await fetchSession();

        if (response.ok) {
          const data = await response.json();
          dispatch(loginSuccess(data.username));
        }
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setIsSessionLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  return { isSessionLoading };
};
