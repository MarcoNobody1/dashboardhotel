import { configureStore } from '@reduxjs/toolkit';
import { bookingSlice } from '../features/Bookings/bookingSlice';
import { roomSlice } from '../features/Rooms/roomSlice';

export const store = configureStore({
    reducer: {
      bookings: bookingSlice.reducer,
      rooms: roomSlice.reducer,
    },
  });