import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../Interfaces/Interfaces";
import { generalFetch } from "../generalFetch";


export const getRoomsData = createAsyncThunk<RoomInterface[]>("rooms/getRoomsData", async () => {
  try {
    const response = await generalFetch({ url: "rooms" });
    return response as RoomInterface[];
  } catch (error) {
    throw error;
  }
});

export const deleteRoomsData = createAsyncThunk("rooms/deleteRoomsData", async (id:string) => {
  try {
    await generalFetch({ url: `rooms/${id}`, method: "delete" });
    return id;
  } catch (error) {
    throw error;
  }
});

export const get1RoomData = createAsyncThunk("rooms/get1RoomData", async (id:string) => {
  try {
    const response = await generalFetch({ url: `rooms/${id}` });
    return response as RoomInterface;
  } catch (error) {
    throw error;
  }
});

export const addRoomData = createAsyncThunk("rooms/addRoomData", async (room:Partial<RoomInterface>) => {
  try {
    await generalFetch({ url: `rooms/`, method: "POST", data: room });
    return room as RoomInterface;
  } catch (error) {
    throw error;
  }
})

export const updateRoomData = createAsyncThunk("rooms/updateRoomData", async (room:Partial<RoomInterface>) => {
  try {
    await generalFetch({ url: `rooms/${room._id}`, method: "PUT", data: room });
    return room;
  } catch (error) {
    throw error;
  }
})