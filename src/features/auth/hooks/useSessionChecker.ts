import type { AppDispatch, RootState } from "@/core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  checkSession,
  selectHasCheckedSession,
  selectIsAuthenticated,
  selectIsSessionLoading,
} from "@/features/auth/store/authSlice";

export const useSessionChecker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const isLoading = useSelector((state: RootState) => selectIsSessionLoading(state));
  const hasCheckedSession = useSelector((state: RootState) => selectHasCheckedSession(state));

  useEffect(() => {
    if (!isAuthenticated && !hasCheckedSession && !isLoading) {
      dispatch(checkSession());
    }
  }, [dispatch, hasCheckedSession, isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading, hasCheckedSession };
};
