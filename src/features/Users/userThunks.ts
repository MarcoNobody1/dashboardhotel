import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../Interfaces/Interfaces";

const delay = (data: UserInterface[] | string | UserInterface, time = 400) => {
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
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    return data as UserInterface[];
  }
);

export const deleteUsersData = createAsyncThunk(
  "users/deleteUsersData",
  async (id: string) => {
    const response = await fetch(`${localUrl}users/${id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    return id as string;
  }
);

export const get1UserData = createAsyncThunk(
  "users/get1UserData",
  async (id: string) => {
    const response = await fetch(`${localUrl}users/${id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    return data as UserInterface;
  }
);

export const addUserData = createAsyncThunk(
  "rooms/addUserData",
  async (user: Partial<UserInterface>) => {
    const response = await fetch(`${localUrl}users`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    return user;
  }
);

export const updateUserData = createAsyncThunk(
  "rooms/updateUserData",
  async (user: Partial<UserInterface>) => {
    const response = await fetch(`${localUrl}users/${user._id}`, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    return user;
  }
);
