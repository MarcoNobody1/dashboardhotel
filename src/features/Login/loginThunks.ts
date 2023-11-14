import { createAsyncThunk } from "@reduxjs/toolkit";
import bookings from "../../data/MirandaDashboard.bookings.json";

const localUrl = import.meta.env.VITE_FETCH_URL;

export interface LogInterface {
  username: string;
}

export const logIn = createAsyncThunk(
  "login/log",
  async (log: LogInterface) => {
    const response = await fetch(`${localUrl}login`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: log.username,
      }),
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  }
);
