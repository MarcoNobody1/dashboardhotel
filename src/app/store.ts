import { configureStore } from '@reduxjs/toolkit';
import { bookingSlice } from '../features/Bookings/bookingSlice';
// import { roomSlice } from '../features/Rooms/roomSlice';
// import { contactSlice } from '../features/Contact/contactSlice';
// import { userSlice } from '../features/Users/userSlice';

export const store = configureStore({
    reducer: {
      bookings: bookingSlice.reducer,
      // rooms: roomSlice.reducer,
      // contacts: contactSlice.reducer,
      // users: userSlice.reducer,
    },
  });

  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch