import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../Interfaces/Interfaces";
import users from "../../data/MirandaDashboard.users.json";
const delay = (data:UserInterface[] | string | UserInterface, time = 400) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

const localUrl = import.meta.env.VITE_FETCH_URL;
const token = localStorage.getItem("token") || "";

export const getUsersData = createAsyncThunk<UserInterface[]>(
  "users/getUsersData",
  async () => {
   

    const response = await fetch(`${localUrl}users`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      }
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    return data as UserInterface[];
  }
);

export const deleteUsersData = createAsyncThunk("users/deleteUsersData", async (id:string) => {
  return (await delay(id)) as string;
});

export const get1UserData = createAsyncThunk("users/get1UserData", async (id:string) => {
  return (await delay(id)) as string;
});

export const addUserData = createAsyncThunk("rooms/addUserData", async (user:UserInterface) => {
  
  return( await delay(user)) as UserInterface;
})

export const updateUserData = createAsyncThunk("rooms/updateUserData", async (user:UserInterface) => {
  
  return( await delay(user)) as UserInterface;
})