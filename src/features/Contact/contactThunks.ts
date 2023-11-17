import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../Interfaces/Interfaces";
import { getToken } from "../generalFetch";

const localUrl = import.meta.env.VITE_FETCH_URL;

export const getContactsData = createAsyncThunk<ContactInterface[]>(
  "contacts/getContactData",
  async () => {
    const response = await fetch(`${localUrl}contacts`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    return data as ContactInterface[];
  }
);

export const deleteContactsData = createAsyncThunk(
  "contacts/deleteContactsData",
  async (id: string) => {
    const response = await fetch(`${localUrl}contacts/${id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    return id as string;
  }
);

export const get1ContactData = createAsyncThunk(
  "contacts/get1ContactData",
  async (id: string) => {
    const response = await fetch(`${localUrl}contacts/${id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    return data as ContactInterface;
  }
);
export const archiveData = createAsyncThunk(
  "contacts/archiveData",
  async (update: ContactInterface) => {
    const response = await fetch(`${localUrl}contacts/${update._id}`, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
      body: JSON.stringify({
        archived: !update.archived
      }),
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    return update._id as string;
  }
);
