import { configureStore } from '@reduxjs/toolkit';
import { bookingSlice } from '../features/Bookings/bookingSlice';
import { roomSlice } from '../features/Rooms/roomSlice';
import { contactSlice } from '../features/Contact/contactSlice';

export const store = configureStore({
    reducer: {
      bookings: bookingSlice.reducer,
      rooms: roomSlice.reducer,
      contacts: contactSlice.reducer,
    },
  });