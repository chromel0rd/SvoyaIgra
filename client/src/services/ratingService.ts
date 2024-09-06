import type { AxiosInstance } from 'axios';
import type { UserType } from '../types/userTypes';
import { UserBoardSchema } from '../utils/validations';
import axiosInstance from './apiInstance';

class RatingService {
  constructor(private readonly client: AxiosInstance) {}

  async getRating(): Promise<UserType[]> {
    const { data } = await this.client<UserType[]>('/auth/rating');
    return UserBoardSchema.parse(data);
  }
}

export default new RatingService(axiosInstance);
