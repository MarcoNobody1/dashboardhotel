import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../Interfaces/Interfaces";
import { generalFetch } from "../generalFetch";

export const getUsersData = createAsyncThunk<UserInterface[]>(
  "users/getUsersData",
  async () => {
    try {
      const response = await generalFetch({ url: "users" });
      return response as UserInterface[];
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUsersData = createAsyncThunk(
  "users/deleteUsersData",
  async (id: string) => {
    try {
      await generalFetch({ url: `users/${id}`, method: "delete" });
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export const get1UserData = createAsyncThunk(
  "users/get1UserData",
  async (id: string) => {
    try {
      const response = await generalFetch({ url: `users/${id}` });
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export const addUserData = createAsyncThunk(
  "rooms/addUserData",
  async (user: Partial<UserInterface>) => {
    try {
      await generalFetch({ url: `users/`, method: "POST", data: user });
      return user as UserInterface;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserData = createAsyncThunk(
  "rooms/updateUserData",
  async (user: Partial<UserInterface>) => {
    try {
      await generalFetch({ url: `users/${user._id}`, method: "PUT", data: user });
      return user;
    } catch (error) {
      throw error;
    }
  }
);
