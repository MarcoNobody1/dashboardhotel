import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingsData } from "../../data/bookingsjson";
import bookings from "../../data/MirandaDashboard.bookings.json";
import { BookingInterface } from "../Interfaces/Interfaces";

const delay = (data:BookingInterface[] | string | BookingInterface, time:number = 400) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getData = createAsyncThunk<BookingInterface[]>("bookings/getData", async () => {
  return( await delay(bookings)) as BookingInterface[];
});

export const deleteData = createAsyncThunk("bookings/deleteData", async (id:string) => {
  return (await delay(id)) as string;
});

export const get1Data = createAsyncThunk("bookings/get1Data", async (id:string) => {
  return (await delay(id)) as string;
});