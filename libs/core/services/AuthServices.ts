import { headers } from 'next/headers';
import { LoginDto, UserModel } from '../models';
import api from './api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const LoginApi = async (loginDto: LoginDto): Promise<string> => {
  try {
    const res = await api.post(`${API_URL}/auth/login`, loginDto);
    const data = res.data as { accessToken: string };
    return data.accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMe = async (): Promise<UserModel> => {
  try {
    const res = await api.get(`${API_URL}/auth/profile`);
    return res.data as UserModel;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
