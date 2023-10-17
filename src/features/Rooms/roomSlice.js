import { createSlice } from "@reduxjs/toolkit";
import { getRoomsData, deleteRoomsData, get1RoomData, addRoomData } from "./roomThunks";


const initialState = {
    error: "null",
    rooms: [],
    roomDetail:[],
    status: "idle",
    roomIdStatus:"idle",
    deleteStatus: 'fulfilled',
    addRoomStatus: 'idle',
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
          state.rooms = action.payload;
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
          state.rooms = state.rooms.filter((room) => {return room.room_name.id !== action.payload});
        })
        .addCase(deleteRoomsData.pending, (state, action) => {
          state.deleteStatus = "pending";
        })
        .addCase(deleteRoomsData.rejected, (state, action) => {
          state.deleteStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(get1RoomData.fulfilled, (state, action) => {
          state.roomIdStatus = "fulfilled";
          state.roomDetail = state.rooms.filter((room) => {return room.room_name.id === action.payload});
        })
        .addCase(get1RoomData.pending, (state, action) => {
          state.roomIdStatus = "pending";
        })
        .addCase(get1RoomData.rejected, (state, action) => {
          state.roomIdStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(addRoomData.fulfilled, (state, action) => {
          state.addRoomStatus = "fulfilled";
          state.rooms =[ ...state.rooms, action.payload];

        })
        .addCase(addRoomData.pending, (state, action) => {
          state.addRoomStatus = "pending";
        })
        .addCase(addRoomData.rejected, (state, action) => {
          state.addRoomStatus = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const roomsInfo = (state) => state.rooms.rooms;
  export const roomstatusinfo = (state) => state.rooms.status;
  export const roomdetailData = (state) => state.rooms.roomDetail[0];
  export const roomdeleteStatus = (state) => state.rooms.deleteStatus;
  export const roomIdStatus = (state) => state.rooms.roomIdStatus;
  export const addRoomStatus = (state) => state.rooms.addRoomStatus;