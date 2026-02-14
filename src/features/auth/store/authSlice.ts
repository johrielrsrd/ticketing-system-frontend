import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchSession } from "../services/authApi";

type AuthState = {
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const checkSession = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/checkSession", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchSession();

    if (!response.ok) {
      return rejectWithValue("Session check not okay: " + response.statusText);
    }

    const data = await response.json();
    return data.username;
  } catch (err) {
    return rejectWithValue("Session check rejected: " + err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.username = null;
    },
  },

  extraReducers: (builder) => {
    // Handle checkSession async thunk states
    builder.addCase(checkSession.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(checkSession.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.username = null;
      state.error = action.payload || "Unknown error during session check";
      state.isLoading = false;
    });
  },
});

export const { loginSuccess, logoutSuccess, clearError } = authSlice.actions;
export default authSlice.reducer;
