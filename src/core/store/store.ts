import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/store/authSlice";
import ticketsReducer from "@/features/tickets/store/ticketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // this key becomes state.auth
    tickets: ticketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
