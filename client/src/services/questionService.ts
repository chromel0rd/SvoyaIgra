import type { AxiosInstance } from 'axios';
import type { QuestionType } from '../types/questionTypes';
import QuestionSchema from '../utils/questionValidations';
import axiosInstance from './apiInstance';

class QuestionService {
  constructor(private readonly client: AxiosInstance) {}

  async getQuestion(): Promise<QuestionType[]> {
    const { data } = await this.client<QuestionType[]>('/questions');
    return QuestionSchema.array().parse(data);
  }
}

export default new QuestionService(axiosInstance)