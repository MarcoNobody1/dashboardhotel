import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingsData } from "../../data/bookingsjson";

const delay = (data, time = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getData = createAsyncThunk("bookings/getData", async () => {
  return await delay(bookingsData);
});
