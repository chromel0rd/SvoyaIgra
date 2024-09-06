import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '../../../types/userTypes';
import getRatingThunk from './ratingThunks';

const initialState: UserType[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRatingThunk.fulfilled, (_, action) => action.payload);
  },
});

export default usersSlice.reducer;
