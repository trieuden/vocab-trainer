import { WordModel } from '../models';
import api from './api';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getAllWords = async (): Promise<WordModel[]> => {
  try {
    const res = await api.get<WordModel[]>(`${API_URL}/words`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
