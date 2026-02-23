import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchSession, login } from "../services/authApi";
import type { RootState } from "@/core/store/store";

type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  hasCheckedSession: boolean;
  isSessionLoading: boolean;
  isLoginLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  hasCheckedSession: false,
  isSessionLoading: false,
  isLoginLoading: false,
  error: null,
};

export const checkSession = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/checkSession", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchSession();

    if (!response.ok) {
      console.log("Session check failed with status:", response.status);
      return rejectWithValue("Session check not okay: " + response.statusText);
    }

    const data = await response.json();
    console.log("Session check response data:", data);
    return data;
  } catch (err) {
    return rejectWithValue("Session check rejected: " + err);
  }
});

export const logIn = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>("auth/logIn", async (credentials, { rejectWithValue }) => {
  try {
    const response = await login(credentials.username, credentials.password);

    if (!response.ok) {
      const errorText = await response.json();
      console.log("Login failed with status:", response.status, "and message:", errorText.message);
      return rejectWithValue(
        "Login failed: " + (errorText.message || response.statusText),
      );
    }

    const data = await response.json();
    console.log("Login response data:", data);
    return data;
  } catch (err) {
    return rejectWithValue("Login error: " + err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },

    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.hasCheckedSession = true;
    },
  },

  extraReducers: (builder) => {
    // Handle checkSession async thunk states
    builder.addCase(checkSession.pending, (state) => {
      state.isSessionLoading = true;
      state.error = null;
    });
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.hasCheckedSession = true;
      state.isSessionLoading = false;
      state.error = null;
    });
    builder.addCase(checkSession.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.hasCheckedSession = true;
      state.isSessionLoading = false;
    });

    // Handle logIn async thunk states
    builder.addCase(logIn.pending, (state) => {
      state.isLoginLoading = true;
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.hasCheckedSession = true;
      state.isLoginLoading = false;
      state.error = null;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.hasCheckedSession = true;
      state.isLoginLoading = false;
      state.error = action.payload || "Unknown error during login";
    });
  },
});

export const { logoutSuccess, clearError } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsSessionLoading = (state: RootState) => state.auth.isSessionLoading;
export const selectHasCheckedSession = (state: RootState) => state.auth.hasCheckedSession;

export default authSlice.reducer;
