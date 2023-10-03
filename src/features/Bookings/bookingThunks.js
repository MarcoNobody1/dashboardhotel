import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingsData } from "../../data/bookingsjson";

export const getData = createAsyncThunk("bookings/getData", async () => {
  return bookingsData;
});
