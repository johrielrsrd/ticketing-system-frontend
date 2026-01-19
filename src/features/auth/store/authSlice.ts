import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authService, type User } from '@/features/auth/services/authApi';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const checkSession = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
  const response = await authService.checkSession();
  if (response.ok && response.data) {
    return response.data;
  }
  return rejectWithValue(response.error || 'Session check failed');
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    const response = await authService.login({ username, password });
    if (response.ok) {
      const userResponse = await authService.getCurrentUser();
      if (userResponse.ok && userResponse.data) {
        return userResponse.data;
      }
    }
    return rejectWithValue(response.error || 'Login failed');
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const response = await authService.register(data);
    if (response.ok) {
      return true;
    }
    return rejectWithValue(response.error || 'Registration failed');
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Check Session
    builder
      .addCase(checkSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkSession.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkSession.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
