import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../Interfaces/Interfaces";
import rooms from "../../data/MirandaDashboard.rooms.json";

const delay = (data:RoomInterface[] | string | RoomInterface, time:number = 400) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getRoomsData = createAsyncThunk<RoomInterface[]>("rooms/getRoomsData", async () => {

  return (await delay(rooms)) as RoomInterface[];
});

export const deleteRoomsData = createAsyncThunk("rooms/deleteRoomsData", async (id:string) => {
  return (await delay(id)) as string;
});

export const get1RoomData = createAsyncThunk("rooms/get1RoomData", async (id:string) => {
  return( await delay(id)) as string;
});

export const addRoomData = createAsyncThunk("rooms/addRoomData", async (room:RoomInterface) => {
  
  return( await delay(room)) as RoomInterface;
})

export const updateRoomData = createAsyncThunk("rooms/updateRoomData", async (room:RoomInterface) => {
  
  return( await delay(room)) as RoomInterface;
})