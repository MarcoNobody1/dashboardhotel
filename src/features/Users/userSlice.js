import { createSlice } from "@reduxjs/toolkit";
import { getUsersData, deleteUsersData, get1UserData } from "./userThunks";


const initialState = {
    error: "null",
    initialFetch: [],
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
          state.initialFetch = action.payload;
        })
        .addCase(getUsersData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(getUsersData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
        .addCase(deleteUsersData.fulfilled, (state, action) => {
          state.deleteStatus = "fulfilled";
          state.initialFetch = state.initialFetch.filter((user) => {return user.name.id !== action.payload});
        })
        .addCase(deleteUsersData.pending, (state, action) => {
          state.deleteStatus = "pending";
        })
        .addCase(deleteUsersData.rejected, (state, action) => {
          state.deleteStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(get1UserData.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.userDetails = state.initialFetch.filter((user) => {return user.name.ida === action.payload});
        })
        .addCase(get1UserData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(get1UserData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const info = (state) => state.users.initialFetch;
  export const statusinfo = (state) => state.users.status;
  export const detailData = (state) => state.users.userDetails[0];
  export const deleteStatus = (state) => state.users.deleteStatus;