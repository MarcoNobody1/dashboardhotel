import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../Interfaces/Interfaces";
import { getToken } from "../generalFetch";

const localUrl = import.meta.env.VITE_FETCH_URL;

export const getData = createAsyncThunk<BookingInterface[]>(
  "bookings/getData",
  async () => {
    const response = await fetch(`${localUrl}bookings`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    return data as BookingInterface[];
  }
);

export const deleteData = createAsyncThunk(
  "bookings/deleteData",
  async (id: string) => {
    const response = await fetch(`${localUrl}bookings/${id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    return id as string;
  }
);

export const get1Data = createAsyncThunk(
  "bookings/get1Data",
  async (id: string) => {
    const response = await fetch(`${localUrl}bookings/${id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data as BookingInterface;
  }
);
