import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../Interfaces/Interfaces";
import { generalFetch } from "../generalFetch";

export const getContactsData = createAsyncThunk<ContactInterface[]>(
  "contacts/getContactData",
  async () => {
    try {
      const response = await generalFetch({ url: "contacts" });
      return response as ContactInterface[];
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContactsData = createAsyncThunk(
  "contacts/deleteContactsData",
  async (id: string) => {
    try {
      await generalFetch({ url: `contacts/${id}`, method: "delete" });
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export const get1ContactData = createAsyncThunk(
  "contacts/get1ContactData",
  async (id: string) => {
    try {
      const response = await generalFetch({ url: `contacts/${id}` });
      return response as ContactInterface;
    } catch (error) {
      throw error;
    }
  }
);
export const archiveData = createAsyncThunk(
  "contacts/archiveData",
  async (update: ContactInterface) => {
    try {
      await generalFetch({ url: `contacts/${update._id}`, method: "PUT", data: update });
      return update._id;
    } catch (error) {
      throw error;
    }
  }
);
