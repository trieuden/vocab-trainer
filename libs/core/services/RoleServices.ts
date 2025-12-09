import { RoleModel } from '../models/RoleModel';
import api from './api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getAllRoles = async (): Promise<RoleModel[]> => {
  try {
    const res = await api.get(`${API_URL}/roles`);
    return res.data as RoleModel[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
