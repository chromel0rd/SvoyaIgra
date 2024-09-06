import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import ratingReducer from './slices/rating/ratingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rating: ratingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
