import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ticketService, type Ticket, type SolveRate } from '@/features/tickets/services/ticketApi';

interface TicketState {
  tickets: Ticket[];
  solveRate: SolveRate | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    searchQuery: string;
    statusFilter: string;
    hideClosedSolved: boolean;
  };
  sorting: {
    column: keyof Ticket | null;
    direction: 'asc' | 'desc';
  };
}

const initialState: TicketState = {
  tickets: [],
  solveRate: null,
  isLoading: false,
  error: null,
  filters: {
    searchQuery: '',
    statusFilter: '',
    hideClosedSolved: false,
  },
  sorting: {
    column: null,
    direction: 'asc',
  },
};

// Async thunks
export const fetchMyTickets = createAsyncThunk('tickets/fetchMyTickets', async (_, { rejectWithValue }) => {
  const response = await ticketService.getMyTickets();
  if (response.ok && response.data) {
    return response.data;
  }
  return rejectWithValue(response.error || 'Failed to fetch tickets');
});

export const fetchAllTickets = createAsyncThunk('tickets/fetchAllTickets', async (_, { rejectWithValue }) => {
  const response = await ticketService.getAllTickets();
  if (response.ok && response.data) {
    return response.data;
  }
  return rejectWithValue(response.error || 'Failed to fetch tickets');
});

export const fetchSolveRate = createAsyncThunk('tickets/fetchSolveRate', async (_, { rejectWithValue }) => {
  const response = await ticketService.getSolveRate();
  if (response.ok && response.data) {
    return response.data;
  }
  return rejectWithValue(response.error || 'Failed to fetch solve rate');
});

export const uploadCsv = createAsyncThunk('tickets/uploadCsv', async (file: File, { rejectWithValue }) => {
  const response = await ticketService.uploadCsv(file);
  if (response.ok) {
    return response.data;
  }
  return rejectWithValue(response.error || 'Upload failed');
});

// Slice
const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.statusFilter = action.payload;
    },
    setHideClosedSolved: (state, action: PayloadAction<boolean>) => {
      state.filters.hideClosedSolved = action.payload;
    },
    setSorting: (state, action: PayloadAction<{ column: keyof Ticket; direction: 'asc' | 'desc' }>) => {
      state.sorting = action.payload;
      // Sort tickets
      const sorted = [...state.tickets].sort((a, b) => {
        const valA = a[action.payload.column];
        const valB = b[action.payload.column];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return action.payload.direction === 'asc' ? valA - valB : valB - valA;
        }

        if (action.payload.column === 'createdAt') {
          const dateA = new Date(valA).getTime();
          const dateB = new Date(valB).getTime();
          return action.payload.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return action.payload.direction === 'asc'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
      state.tickets = sorted;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch My Tickets
    builder
      .addCase(fetchMyTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchMyTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch All Tickets
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Solve Rate
    builder
      .addCase(fetchSolveRate.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSolveRate.fulfilled, (state, action: PayloadAction<SolveRate>) => {
        state.solveRate = action.payload;
      })
      .addCase(fetchSolveRate.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Upload CSV
    builder
      .addCase(uploadCsv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadCsv.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setStatusFilter, setHideClosedSolved, setSorting, clearFilters, clearError } =
  ticketSlice.actions;
export default ticketSlice.reducer;
