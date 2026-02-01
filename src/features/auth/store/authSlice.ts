import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    isAuthenticated: boolean;
    username: string | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;