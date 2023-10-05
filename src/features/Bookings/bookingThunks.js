import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingsData } from "../../data/bookingsjson";

const delay = (data, time = 400) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getData = createAsyncThunk("bookings/getData", async () => {
  return await delay(bookingsData);
});

export const deleteData = createAsyncThunk("bookings/deleteData", async (id) => {
  return await delay(id);
});

export const get1Data = createAsyncThunk("bookings/get1Data", async (id) => {
  return await delay(id);
});