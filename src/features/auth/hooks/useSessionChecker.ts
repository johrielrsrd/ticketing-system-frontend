import type { AppDispatch } from "@/core/store/store";
import { fetchSession } from "@/features/auth/services/authApi";
import { loginSuccess } from "@/features/auth/store/authSlice";

type SessionCheckerParams = {
  dispatch: AppDispatch;
  setIsSessionLoading: (value: boolean) => void;
};

export const useSessionChecker = async (params: SessionCheckerParams) => {
  const { dispatch, setIsSessionLoading } = params;
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
