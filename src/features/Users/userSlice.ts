import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../Interfaces/Interfaces";
import { RootState } from "../../app/store";
import {
  deleteUsersData,
  get1UserData,
  getUsersData,
  addUserData,
  updateUserData,
} from "./userThunks";

interface UserInitialState {
  error: string | undefined;
  users: UserInterface[];
  userDetails: UserInterface[];
  status: "idle" | "fulfilled" | "pending" | "rejected";
  deleteStatus: "idle" | "fulfilled" | "pending" | "rejected";
  addUserStatus: "idle" | "fulfilled" | "pending" | "rejected";
  updateUserStatus: "idle" | "fulfilled" | "pending" | "rejected";
}

const initialState: UserInitialState = {
  error: "null",
  users: [],
  userDetails: [],
  status: "idle",
  deleteStatus: "fulfilled",
  addUserStatus: "idle",
  updateUserStatus: "fulfilled",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(getUsersData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(deleteUsersData.fulfilled, (state, action) => {
        state.deleteStatus = "fulfilled";
        state.users = state.users.filter((user) => {
          return user.name.id !== action.payload;
        });
      })
      .addCase(deleteUsersData.pending, (state) => {
        state.deleteStatus = "pending";
      })
      .addCase(deleteUsersData.rejected, (state, action) => {
        state.deleteStatus = "rejected";
        state.error = action.error.message;
      })
      .addCase(get1UserData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userDetails = state.users.filter((user) => {
          return user.name.id === action.payload;
        });
      })
      .addCase(get1UserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(get1UserData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(addUserData.fulfilled, (state, action) => {
        state.addUserStatus = "fulfilled";
        state.users = [...state.users, action.payload];
      })
      .addCase(addUserData.pending, (state) => {
        state.addUserStatus = "pending";
      })
      .addCase(addUserData.rejected, (state, action) => {
        state.addUserStatus = "rejected";
        state.error = action.error.message;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.updateUserStatus = "fulfilled";
        const userIndex = state.users.findIndex(
          (user) => user.name.id === action.payload.name.id
        );

        state.users[userIndex] = {
          ...state.users[userIndex],
          ...action.payload,
        };
      })
      .addCase(updateUserData.pending, (state) => {
        state.updateUserStatus = "pending";
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.updateUserStatus = "rejected";
        state.error = action.error.message;
      });
  },
});

export const usersInfo = (state: RootState) => state.users.users;
export const usersStatusinfo = (state: RootState) => state.users.status;
export const userDetailData = (state: RootState) => state.users.userDetails[0];
export const userDeleteStatus = (state: RootState) => state.users.deleteStatus;
export const userAddUserStatus = (state: RootState) => state.users.addUserStatus;
export const userUpdateStatus = (state: RootState) => state.users.updateUserStatus;
