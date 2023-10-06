import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersData } from "../../data/usersjson";
const delay = (data, time = 400) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getUsersData = createAsyncThunk("users/getUsersData", async () => {

  return await delay(usersData);
});

export const deleteUsersData = createAsyncThunk("users/deleteUsersData", async (id) => {
  return await delay(id);
});

export const get1UserData = createAsyncThunk("users/get1UserData", async (id) => {
  return await delay(id);
});