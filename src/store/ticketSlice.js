import { createSlice, current } from "@reduxjs/toolkit";
import TicketsDB from "../components/ticketsDB";
import ticketsFilter from "../utilities/ticketsFilter";
import { getSearchID, getTickets } from "./asyncThunk";

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    valueFilterTransfer: [],
    showAllTickets: true,
    status: null,
    error: null,
    loading: true,
    stop: false,
    skipError500: 0,
    searchID: false,
  },
  reducers: {
    switchFilterAll(state, action) {
      state.showAllTickets = action.payload;
    },

    setValueFilterTicket(state, action) {
      if (action.payload.isChecked) {
        state.valueFilterTransfer.push(action.payload.filterValue);
      } else {
        state.valueFilterTransfer = state.valueFilterTransfer.filter(
          (item) => item !== action.payload.filterValue
        );
      }
    },

    filterReducer(state, action) {
      const currentTickets = current(state.tickets);
      state.tickets = ticketsFilter(currentTickets, action.payload);
    },
  },

  extraReducers: {
    [getSearchID.fulfilled]: (state, action) => {
      document.cookie = `searchId = ${action.payload}`;
      state.searchID = true;
    },
    [getTickets.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getTickets.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.stop = action.payload.stop;
      state.initialTickets = [
        ...state.tickets,
        ...TicketsDB(action.payload.tickets),
      ];
      state.tickets = [...state.tickets, ...TicketsDB(action.payload.tickets)];
    },

    [getTickets.rejected]: (state, action) => {
      if (action.error.message == 500) {
        state.skipError500 += 1;
      } else {
        state.loading = false;
        state.error = true;
      }
    },
  },
});

export const {
  optionsReducer,
  filterReducer,
  switchFilterAll,
  setValueFilterTicket,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
