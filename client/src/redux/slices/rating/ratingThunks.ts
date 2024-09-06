import { createAsyncThunk } from '@reduxjs/toolkit';
import ratingService from '../../../services/ratingService';

const getRatingThunk = createAsyncThunk('auth/rating', async () => {
  const data = await ratingService.getRating();
  return data;
});

export default getRatingThunk;
