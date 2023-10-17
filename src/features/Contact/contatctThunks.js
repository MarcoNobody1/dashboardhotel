import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactMessages } from "../../data/contactjson";

const delay = (data, time = 400) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export const getContactsData = createAsyncThunk("contacts/getContactData", async () => {

  return await delay(contactMessages);
});

export const deleteContactsData = createAsyncThunk("contacts/deleteContactsData", async (id) => {
  return await delay(id);
});

export const get1ContactData = createAsyncThunk("contacts/get1ContactData", async (id) => {
  return await delay(id);
});

export const archiveData = createAsyncThunk("contacts/archiveData", async (id) => {
  return await delay(id);
});