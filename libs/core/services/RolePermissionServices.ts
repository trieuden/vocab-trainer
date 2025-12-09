import { RolePermissionModel } from '../models/RolePermissionModel';
import api from './api';

export const getRolePermissionsByRoleId = async (roleId: string): Promise<RolePermissionModel[]> => {
  try {
    const res = await api.get(`/role-permissions/${roleId}/roleId`);
    return res.data as RolePermissionModel[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
