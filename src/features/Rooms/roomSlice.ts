import { createSlice } from "@reduxjs/toolkit";
import {
  getRoomsData,
  deleteRoomsData,
  get1RoomData,
  addRoomData,
  updateRoomData,
} from "./roomThunks";
import { RoomInterface } from "../Interfaces/Interfaces";
import { RootState } from "../../app/store";

interface RoomInitialState {
  error: string | undefined;
  rooms: RoomInterface[];
  roomDetail: RoomInterface[];
  status: "idle" | "fulfilled" | "pending" | "rejected";
  roomIdStatus: "idle" | "fulfilled" | "pending" | "rejected";
  deleteStatus: "idle" | "fulfilled" | "pending" | "rejected";
  addRoomStatus: "idle" | "fulfilled" | "pending" | "rejected";
  updateRoomStatus: "idle" | "fulfilled" | "pending" | "rejected";
}

const initialState: RoomInitialState = {
  error: "null",
  rooms: [],
  roomDetail: [],
  status: "idle",
  roomIdStatus: "idle",
  deleteStatus: "fulfilled",
  addRoomStatus: "idle",
  updateRoomStatus: "fulfilled",
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.rooms = action.payload;
      })
      .addCase(getRoomsData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getRoomsData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(deleteRoomsData.fulfilled, (state, action) => {
        state.deleteStatus = "fulfilled";
        state.rooms = state.rooms.filter((room) => {
          return room._id.$oid !== action.payload;
        });
      })
      .addCase(deleteRoomsData.pending, (state) => {
        state.deleteStatus = "pending";
      })
      .addCase(deleteRoomsData.rejected, (state, action) => {
        state.deleteStatus = "rejected";
        state.error = action.error.message;
      })
      .addCase(get1RoomData.fulfilled, (state, action) => {
        state.roomIdStatus = "fulfilled";
        state.roomDetail = state.rooms.filter((room) => {
          return room._id.$oid === action.payload;
        });
      })
      .addCase(get1RoomData.pending, (state) => {
        state.roomIdStatus = "pending";
      })
      .addCase(get1RoomData.rejected, (state, action) => {
        state.roomIdStatus = "rejected";
        state.error = action.error.message;
      })
      .addCase(addRoomData.fulfilled, (state, action) => {
        state.addRoomStatus = "fulfilled";
        state.rooms = [...state.rooms, action.payload];
      })
      .addCase(addRoomData.pending, (state) => {
        state.addRoomStatus = "pending";
      })
      .addCase(addRoomData.rejected, (state, action) => {
        state.addRoomStatus = "rejected";
        state.error = action.error.message;
      })
      .addCase(updateRoomData.fulfilled, (state, action) => {
        state.updateRoomStatus = "fulfilled";
        const roomIndex = state.rooms.findIndex(
          (room) => room._id.$oid === action.payload._id.$oid
        );

        state.rooms[roomIndex] = {...state.rooms[roomIndex], ...action.payload};
      })
      .addCase(updateRoomData.pending, (state) => {
        state.updateRoomStatus = "pending";
      })
      .addCase(updateRoomData.rejected, (state, action) => {
        state.updateRoomStatus = "rejected";
        state.error = action.error.message;
      });
  },
});

export const roomsInfo = (state: RootState) => state.rooms.rooms;
export const roomstatusinfo = (state: RootState) => state.rooms.status;
export const roomdetailData = (state: RootState) => state.rooms.roomDetail[0];
export const roomdeleteStatus = (state: RootState) => state.rooms.deleteStatus;
export const roomIdStatus = (state: RootState) => state.rooms.roomIdStatus;
export const addRoomStatus = (state: RootState) => state.rooms.addRoomStatus;
export const roomUpdateStatus = (state: RootState) => state.rooms.updateRoomStatus;