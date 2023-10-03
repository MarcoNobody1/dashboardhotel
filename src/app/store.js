import { configureStore } from '@reduxjs/toolkit';
import { bookingSlice } from '../features/Bookings/bookingSlice';

export const store = configureStore({
    reducer: {
      bookings: bookingSlice.reducer,
    },
  });