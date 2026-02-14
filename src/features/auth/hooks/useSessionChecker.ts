import type { AppDispatch } from "@/core/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkSession } from "@/features/auth/store/authSlice";

export const useSessionChecker = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
};
