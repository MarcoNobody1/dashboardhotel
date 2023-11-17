import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../Interfaces/Interfaces";
import { getToken } from "../generalFetch";

const localUrl = import.meta.env.VITE_FETCH_URL;

export const getRoomsData = createAsyncThunk<RoomInterface[]>("rooms/getRoomsData", async () => {

 
  const response = await fetch(`${localUrl}rooms`, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    }
  });
  if (!response.ok) throw new Error(`Status: ${response.status}`);
  const data = await response.json();

  return data as RoomInterface[];
});

export const deleteRoomsData = createAsyncThunk("rooms/deleteRoomsData", async (id:string) => {
  const response = await fetch(`${localUrl}rooms/${id}`, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
  });
  if (!response.ok) throw new Error(`Status: ${response.status}`);

  return id as string;
});

export const get1RoomData = createAsyncThunk("rooms/get1RoomData", async (id:string) => {
  const response = await fetch(`${localUrl}rooms/${id}`, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    }
  });
  if (!response.ok) throw new Error(`Status: ${response.status}`);
  const data = await response.json();
  return data;
});

export const addRoomData = createAsyncThunk("rooms/addRoomData", async (room:Partial<RoomInterface>) => {
  
  const response = await fetch(`${localUrl}rooms`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(room)
  });
  if (!response.ok) throw new Error(`Status: ${response.status}`);

  return room as RoomInterface;
})

export const updateRoomData = createAsyncThunk("rooms/updateRoomData", async (room:Partial<RoomInterface>) => {
  const response = await fetch(`${localUrl}rooms/${room._id}`, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(room)
  });
  if (!response.ok) throw new Error(`Status: ${response.status}`);

  return room as RoomInterface;
})