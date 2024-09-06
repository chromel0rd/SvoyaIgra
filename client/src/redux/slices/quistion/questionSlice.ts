import { createSlice } from '@reduxjs/toolkit';
import type { QuestionType } from '../../../types/questionTypes';
import getQuestionThunk from './questionThunk';

const initialState: QuestionType[] = [];

const QuestionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getQuestionThunk.fulfilled, (_, action) => action.payload.map((el) => ({...el, isAnswer: false})))
      .addCase(getQuestionThunk.rejected, () => []);
  },
});

export default QuestionSlice.reducer;
