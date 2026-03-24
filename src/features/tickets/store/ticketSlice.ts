import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTickets } from "../services/ticketsApi";

type TicketsMode = "my-tickets" | "all-tickets";

export interface Ticket {
  priority: string;
  ticketId: number;
  status: string;
  subject: string;
  assignee: string;
  requester: string;
  organization: string;
  createdDate: string;
  solvedDate: string | null;
  category: string;
  remarks: string;
  eta: string | null;
  jiraTicketId: string;
  jiraStatus: string;  
}

type TicketsState = {
  items: Ticket[];
  mode: TicketsMode;
  isLoading: boolean;
  error: string | null;
};

const initialState: TicketsState = {
  items: [],
  mode: "my-tickets",
  isLoading: false,
  error: null,
};

export const loadTickets = createAsyncThunk<
  Ticket[],
  TicketsMode,
  { rejectValue: string }
>("tickets/loadTickets", async (mode, { rejectWithValue }) => {
  try {
    const response = await fetchTickets(mode);

    if (!response.ok) {
      const errorText = await response.json();
      return rejectWithValue(
        "Fetch tickets failed: " + (errorText.message || response.statusText),
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue("Fetch tickets error: " + err);
  }
});

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTickets.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.mode = action.meta.arg;
    });
    builder.addCase(loadTickets.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loadTickets.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Unknown error during tickets fetch";
    });
  },
});

export const { clearError } = ticketsSlice.actions;
export default ticketsSlice.reducer;
