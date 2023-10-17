import { createSlice } from "@reduxjs/toolkit";
import { getContactsData, deleteContactsData, get1ContactData, archiveData } from "./contactThunks";
import { ContactInterface } from "../Interfaces/Interfaces";
import { RootState } from "../../app/store";

interface RoomInitialState {
  error: string | undefined,
  contacts: ContactInterface[],
  contactDetail:ContactInterface[],
  status:'idle' | 'fulfilled' | 'pending' | 'rejected',
  detailStatus:'idle' | 'fulfilled' | 'pending' | 'rejected',
  deleteStatus:'idle' | 'fulfilled' | 'pending' | 'rejected',
  archiveStatus: 'idle' | 'fulfilled' | 'pending' | 'rejected',
}

const initialState: RoomInitialState = {
    error: "null",
    contacts: [],
    contactDetail:[],
    status: "idle",
    detailStatus:'idle',
    deleteStatus: 'fulfilled',
    archiveStatus:'idle',
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
          state.contacts = action.payload;
        })
        .addCase(getContactsData.pending, (state) => {
          state.status = "pending";
        })
        .addCase(getContactsData.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        })
        .addCase(deleteContactsData.fulfilled, (state, action) => {
          state.deleteStatus = "fulfilled";
          state.contacts = state.contacts.filter((contact) => {return contact.date.id !== action.payload});
        })
        .addCase(deleteContactsData.pending, (state) => {
          state.deleteStatus = "pending";
        })
        .addCase(deleteContactsData.rejected, (state, action) => {
          state.deleteStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(get1ContactData.fulfilled, (state, action) => {
          state.detailStatus = "fulfilled";
          state.contactDetail = state.contacts.filter((contact) => {return contact.date.id === action.payload});
        })
        .addCase(get1ContactData.pending, (state) => {
          state.detailStatus = "pending";
        })
        .addCase(get1ContactData.rejected, (state, action) => {
          state.detailStatus = "rejected";
          state.error = action.error.message;
        })
        .addCase(archiveData.fulfilled, (state, action) => {
          state.archiveStatus = "fulfilled";
          const contactIndex = state.contacts.findIndex((contact) => contact.date.id === action.payload);
          if (contactIndex !== -1) {
           state.contacts[contactIndex].archived = !state.contacts[contactIndex].archived;
           }
        })
        .addCase(archiveData.pending, (state) => {
          state.archiveStatus = "pending";
        })
        .addCase(archiveData.rejected, (state, action) => {
          state.archiveStatus = "rejected";
          state.error = action.error.message;
        })
    },
  });

  export const contactsInfo = (state:RootState) => state.contacts.contacts;
  export const contactstatusinfo = (state:RootState) => state.contacts.status;
  export const contactdetailData = (state:RootState) => state.contacts.contactDetail[0];
  export const contactdeleteStatus = (state:RootState) => state.contacts.deleteStatus;
  export const detailStatus = (state:RootState) => state.contacts.detailStatus;
  export const archiveStatus = (state:RootState) => state.contacts.archiveStatus;