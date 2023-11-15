import { createAsyncThunk } from "@reduxjs/toolkit";

const localUrl = import.meta.env.VITE_FETCH_URL;

export interface LogInterface {
  username: string;
  password: string;
}

export const logIn = createAsyncThunk(
  "login/log",
  async (log: LogInterface) => {
    try {
      const response = await fetch(`${localUrl}login`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: log.username,
          password: log.password,
        }),
      });
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
);
