import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    isLoggedIn: boolean;
    username: string | null;
};

const initialState: AuthState = {
    isLoggedIn: false,
    username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;