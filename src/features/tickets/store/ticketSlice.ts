import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTickets } from "../services/ticketsApi";


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
  ticketItems: Ticket[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TicketsState = {
  ticketItems: [],
  isLoading: false,
  error: null,
};

export const loadTickets = createAsyncThunk<
  Ticket[],
  void,
  { rejectValue: string }
>("tickets/loadTickets", async (_, {rejectWithValue}) => {
  try {
    const response = await fetchTickets();

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
    builder.addCase(loadTickets.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadTickets.fulfilled, (state, action) => {
      state.ticketItems = action.payload;
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
