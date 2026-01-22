import { PermissionModel } from '../models/PermissionModel';
import api from './api';

export const getAllPermissions = async (): Promise<PermissionModel> => {
  try {
    const res = await api.get('permissions');
    return res.data as PermissionModel;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
