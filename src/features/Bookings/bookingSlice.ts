import { createSlice } from "@reduxjs/toolkit";
import { getData, deleteData, get1Data } from "./bookingThunks";
import { BookingInterface } from "../Interfaces/Interfaces";
import { RootState } from "../../app/store";

interface BookingInitialState {
    error: string | undefined,
    bookings: BookingInterface[],
    bookingDetail:BookingInterface[],
    status:'idle' | 'fulfilled' | 'pending' | 'rejected',
    getBookingStatus:'idle' | 'fulfilled' | 'pending' | 'rejected',
    deleteStatus:'idle' | 'fulfilled' | 'pending' | 'rejected',
}


const initialState: BookingInitialState = {
    error: "null",
    bookings: [],
    bookingDetail:[],
    status: "idle",
    getBookingStatus:"idle",
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
        .addCase(getData.pending, (state) => {
          state.status = "pending";
        })
        .addCase(getData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
        .addCase(deleteData.fulfilled, (state, action) => {
          state.deleteStatus = "fulfilled";
          state.bookings = state.bookings.filter((booking) => {return booking._id !== action.payload});
        })
        .addCase(deleteData.pending, (state) => {
          state.deleteStatus = "pending";
        })
        .addCase(deleteData.rejected, (state, action) => {
          state.deleteStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(get1Data.fulfilled, (state, action) => {
          state.getBookingStatus = "fulfilled";
          state.bookingDetail = state.bookings.filter((booking) => {return booking._id === action.payload});
        })
        .addCase(get1Data.pending, (state) => {
          state.getBookingStatus = "pending";
        })
        .addCase(get1Data.rejected, (state, action) => {
          state.getBookingStatus = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const info = (state:RootState) => state.bookings.bookings;
  export const statusinfo = (state:RootState) => state.bookings.status;
  export const detailData = (state:RootState) => state.bookings.bookingDetail[0];
  export const bookingDeleteStatus = (state:RootState) => state.bookings.deleteStatus;
  export const bookingIdStatus = (state:RootState) => state.bookings.getBookingStatus;