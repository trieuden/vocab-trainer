import { CreateRolePermissionDTO, RolePermissionModel } from '../models/RolePermissionModel';
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

export const createRolePermission = async (rolePermission: CreateRolePermissionDTO): Promise<RolePermissionModel> => {
  try {
    const res = await api.post('/role-permissions', rolePermission);
    return res.data as RolePermissionModel;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteRolePermission = async (rolePermissionId: string): Promise<void> => {
  try {
    await api.delete(`/role-permissions/${rolePermissionId}/id`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
