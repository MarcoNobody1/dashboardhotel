import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactMessages } from "../../data/contactjson";
import { ContactInterface } from "../Interfaces/Interfaces";

const delay = (data:ContactInterface[] | string | ContactInterface, time:number = 400) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getContactsData = createAsyncThunk<ContactInterface[]>("contacts/getContactData", async () => {

  return (await delay(contactMessages)) as ContactInterface[];
});

export const deleteContactsData = createAsyncThunk("contacts/deleteContactsData", async (id:string) => {
  return (await delay(id)) as string;
});

export const get1ContactData = createAsyncThunk("contacts/get1ContactData", async (id:string) => {
  return (await delay(id)) as string;
});
export const archiveData = createAsyncThunk("contacts/archiveData", async (id:string) => {
  return await delay(id);
});