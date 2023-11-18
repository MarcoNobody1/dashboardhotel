import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../Interfaces/Interfaces";
import { generalFetch } from "../generalFetch";

export const getData = createAsyncThunk<BookingInterface[]>(
  "bookings/getData",
  async () => {
    try {
      const response = await generalFetch({ url: "bookings" });
      return response as BookingInterface[];
    } catch (error) {
      throw error;
    }
  }
);

export const deleteData = createAsyncThunk(
  "bookings/deleteData",
  async (id: string) => {
    try {
      await generalFetch({ url: `bookings/${id}`, method: "delete" });
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export const get1Data = createAsyncThunk(
  "bookings/get1Data",
  async (id: string) => {
    try {
      const response = await generalFetch({ url: `bookings/${id}` });
      return response as BookingInterface;
    } catch (error) {
      throw error;
    }
  }
);
