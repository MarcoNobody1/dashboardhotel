import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../Interfaces/Interfaces";
import { RootState } from "../../app/store";
import { deleteUsersData, get1UserData, getUsersData } from "./userThunks";

interface UserInitialState {
  error: string | undefined,
  users: UserInterface[],
  userDetails:UserInterface[],
  status:'idle' | 'fulfilled' | 'pending' | 'rejected',
  deleteStatus:'idle' | 'fulfilled' | 'pending' | 'rejected',
}


const initialState: UserInitialState = {
    error: "null",
    users: [],
    userDetails:[],
    status: "idle",
    deleteStatus: 'fulfilled',
  };
  
  export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
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
          state.users = state.users.filter((user) => {return user.name.id !== action.payload});
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
          state.userDetails = state.users.filter((user) => {return user.name.id === action.payload});
        })
        .addCase(get1UserData.pending, (state) => {
          state.status = "pending";
        })
        .addCase(get1UserData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const info = (state:RootState) => state.users.users;
  export const statusinfo = (state:RootState) => state.users.status;
  export const detailData = (state:RootState) => state.users.userDetails[0];
  export const deleteStatus = (state:RootState) => state.users.deleteStatus;