import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../../../types/userTypes';
import { checkUserThunk, loginThunk, logoutThunk, signUpThunk } from './authThunks';

type UserSliceType = { accessToken: string; user: UserState; count: number };

const initialState: UserSliceType = { accessToken: '', user: { status: 'pending' }, count: 0 };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<UserSliceType['accessToken']>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserThunk.pending, (state) => {
        state.user = { status: 'pending' };
      })
      .addCase(checkUserThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = { ...payload.user, status: 'logged' };
      })
      .addCase(checkUserThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(signUpThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = { ...payload.user, status: 'logged' };
      })
      .addCase(signUpThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = { ...payload.user, status: 'logged' };
      })
      .addCase(loginThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      });
  },
});

export default authSlice.reducer;
