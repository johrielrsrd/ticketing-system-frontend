import type { AppDispatch, RootState } from "@/core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkSession } from "@/features/auth/store/authSlice";

export const useSessionChecker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSessionLoading = useSelector(
    (state: RootState) => state.auth.isLoading,
  );

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return { isSessionLoading };
};
