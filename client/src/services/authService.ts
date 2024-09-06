import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiResponseType, UserLoginType, UserSignUpType } from '../types/userTypes';
import { UserResponseSchema } from '../utils/validations';
import axiosInstance from './apiInstance';

class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async check(): Promise<ApiResponseType> {
    const { data } = await this.client<ApiResponseType>('/tokens/refresh');
    return data;
  }

  async signUp(formData: UserSignUpType): Promise<ApiResponseType> {
    const { data } = await this.client.post<ApiResponseType>('/auth/signup', formData);

    return UserResponseSchema.parse(data);
  }

  async login(formData: UserLoginType): Promise<ApiResponseType> {
    const { data } = await this.client.post<ApiResponseType>('/auth/login', formData);

    return UserResponseSchema.parse(data);
  }

  async logout(): Promise<AxiosResponse> {
    return this.client('/auth/logout');
  }
}

export default new AuthService(axiosInstance);
