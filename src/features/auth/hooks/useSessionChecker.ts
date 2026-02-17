import type { AppDispatch, RootState } from "@/core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkSession } from "@/features/auth/store/authSlice";

export const useSessionChecker = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.isAuthenticated) dispatch(checkSession());
  }, [dispatch, authState.isAuthenticated]);

  return { isAuthenticated: authState.isAuthenticated, isLoading: authState.isSessionLoading };
};
