import { createSlice } from "@reduxjs/toolkit";
import { getContactsData, deleteContactsData, get1ContactData } from "./contatctThunks";


const initialState = {
    error: "null",
    initialFetch: [],
    contactDetail:[],
    status: "idle",
    deleteStatus: 'fulfilled',
  };
  
  export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(getContactsData.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.initialFetch = action.payload;
        })
        .addCase(getContactsData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(getContactsData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
        .addCase(deleteContactsData.fulfilled, (state, action) => {
          state.deleteStatus = "fulfilled";
          state.initialFetch = state.initialFetch.filter((contact) => {return contact.date.id !== action.payload});
        })
        .addCase(deleteContactsData.pending, (state, action) => {
          state.deleteStatus = "pending";
        })
        .addCase(deleteContactsData.rejected, (state, action) => {
          state.deleteStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(get1ContactData.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.contactDetail = state.initialFetch.filter((contact) => {return contact.date.id === action.payload});
        })
        .addCase(get1ContactData.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(get1ContactData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const contactsInfo = (state) => state.contacts.initialFetch;
  export const contactstatusinfo = (state) => state.contacts.status;
  export const contactdetailData = (state) => state.contacts.contactDetail[0];
  export const contactdeleteStatus = (state) => state.contacts.deleteStatus;