import { createSlice } from "@reduxjs/toolkit";
import { getData } from "./bookingThunks";


const initialState = {
    error: "null",
    initialFetch: [],
    status: "idle",
  };
  
  export const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(getData.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.initialFetch = action.payload;
        })
        .addCase(getData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(getData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const info = (state) => state.bookings.initialFetch;
  export const statusinfo = (state) => state.bookings.status;