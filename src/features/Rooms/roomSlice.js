import { createSlice } from "@reduxjs/toolkit";
import { getRoomsData, deleteRoomsData, get1RoomData } from "./roomThunks";


const initialState = {
    error: "null",
    initialFetch: [],
    roomDetail:[],
    status: "idle",
    deleteStatus: 'fulfilled',
  };
  
  export const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(getRoomsData.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.initialFetch = action.payload;
        })
        .addCase(getRoomsData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(getRoomsData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
        .addCase(deleteRoomsData.fulfilled, (state, action) => {
          state.deleteStatus = "fulfilled";
          state.initialFetch = state.initialFetch.filter((room) => {return room.room_name.id !== action.payload});
        })
        .addCase(deleteRoomsData.pending, (state, action) => {
          state.deleteStatus = "pending";
        })
        .addCase(deleteRoomsData.rejected, (state, action) => {
          state.deleteStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(get1RoomData.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.roomDetail = state.initialFetch.filter((room) => {return room.room_name.id === action.payload});
        })
        .addCase(get1RoomData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(get1RoomData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const roomsInfo = (state) => state.rooms.initialFetch;
  export const roomstatusinfo = (state) => state.rooms.status;
  export const roomdetailData = (state) => state.rooms.roomDetail[0];
  export const roomdeleteStatus = (state) => state.rooms.deleteStatus;