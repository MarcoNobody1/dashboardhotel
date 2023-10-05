import { createAsyncThunk } from "@reduxjs/toolkit";
import { roomsData } from "../../data/roomsjson";

const delay = (data, time = 400) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getRoomsData = createAsyncThunk("rooms/getRoomsData", async () => {

  return await delay(roomsData);
});

export const deleteRoomsData = createAsyncThunk("rooms/deleteRoomsData", async (id) => {
  return await delay(id);
});

export const get1RoomData = createAsyncThunk("rooms/get1RoomData", async (id) => {
  return await delay(id);
});