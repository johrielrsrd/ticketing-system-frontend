import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/core/store/store";
import type { RootState } from "@/core/store/store";
import { logIn } from "../store/authSlice";


export type LoginCredentials = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogin = (credentials: LoginCredentials) => {
    dispatch(logIn(credentials));
  };

  return { handleLogin, loginError: authState.error, isLoginLoading: authState.isLoginLoading };
};
