import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./loginThunks";
import { LogInterface } from "./loginThunks";
import { RootState } from "../../app/store";

interface LoginInitialState {
  error: string | undefined;
  status: "idle" | "fulfilled" | "pending" | "rejected";
  username: string;
  email: string;
}

const initialState: LoginInitialState = {
  error: "null",
  status: "idle",
  username: "",
  email: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.username = action.payload.payload.username;
        state.email = action.payload.payload.email;
      })
      .addCase(logIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const loginUsername = (state: RootState) => state.login.username;
export const loginEmail = (state: RootState) => state.login.email;
export const loginStatus = (state: RootState) => state.login.status;
export const { resetState } = loginSlice.actions;