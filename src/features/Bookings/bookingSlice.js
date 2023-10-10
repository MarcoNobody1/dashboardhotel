import { createSlice } from "@reduxjs/toolkit";
import { getData, deleteData, get1Data } from "./bookingThunks";


const initialState = {
    error: "null",
    bookings: [],
    bookingDetail:[],
    status: "idle",
    deleteStatus: 'fulfilled',
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
          state.bookings = action.payload;
        })
        .addCase(getData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(getData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
        .addCase(deleteData.fulfilled, (state, action) => {
          state.deleteStatus = "fulfilled";
          state.bookings = state.bookings.filter((booking) => {return booking.guest.id_reserva !== action.payload});
        })
        .addCase(deleteData.pending, (state, action) => {
          state.deleteStatus = "pending";
        })
        .addCase(deleteData.rejected, (state, action) => {
          state.deleteStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(get1Data.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.bookingDetail = state.bookings.filter((booking) => {return booking.guest.id_reserva === action.payload});
        })
        .addCase(get1Data.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(get1Data.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const info = (state) => state.bookings.bookings;
  export const statusinfo = (state) => state.bookings.status;
  export const detailData = (state) => state.bookings.bookingDetail[0];
  export const deleteStatus = (state) => state.bookings.deleteStatus;