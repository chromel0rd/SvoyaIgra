import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';
import type { UserLoginType, UserSignUpType } from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk('auth/checkUser', async () => {
  const data = await authService.check();
  return data;
});

export const signUpThunk = createAsyncThunk('auth/signup', async (formData: UserSignUpType) => {
  const data = await authService.signUp(formData);
  return data;
});

export const loginThunk = createAsyncThunk('auth/login', async (formData: UserLoginType) => {
  const data = await authService.login(formData);
  return data;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    await authService.logout(); // Ожидаем выполнения логаута
    return undefined; // Явно возвращаем 
  });
