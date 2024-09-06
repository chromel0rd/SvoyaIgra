import { createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "../../../services/questionService";

const getQuestionThunk = createAsyncThunk('question/getQuestion', async () => {
    const data = await questionService.getQuestion()
    return data
})

export default getQuestionThunk;