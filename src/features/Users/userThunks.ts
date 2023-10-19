import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersData } from "../../data/usersjson";
import { UserInterface } from "../Interfaces/Interfaces";
const delay = (data:UserInterface[] | string | UserInterface, time = 400) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getUsersData = createAsyncThunk<UserInterface[]>("users/getUsersData", async () => {

  return (await delay(usersData))as UserInterface[];
});

export const deleteUsersData = createAsyncThunk("users/deleteUsersData", async (id:string) => {
  return (await delay(id)) as string;
});

export const get1UserData = createAsyncThunk("users/get1UserData", async (id:string) => {
  return (await delay(id)) as string;
});

export const addUserData = createAsyncThunk("rooms/addUserData", async (user:UserInterface) => {
  
  return( await delay(user)) as UserInterface;
})