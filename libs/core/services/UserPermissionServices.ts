import { CreateUserPermissionDto } from './../models/UserPermissionModel';
import api from './api';

export const createUserPermission = async (userPermission: CreateUserPermissionDto) => {
  try {
    const res = await api.post(`/user-permissions`, userPermission);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserPermission = async (userPermissionId: string) => {
  console.log(userPermissionId);

  try {
    const res = await api.delete(`/user-permissions/${userPermissionId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
