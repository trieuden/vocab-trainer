import api from './api';
import { CreateUserDto, UpdateUserDto, UserModel } from '../models';
import { UserStatus } from '../enums/UserEnum';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getAllUsers = async (): Promise<UserModel[]> => {
  try {
    const res = await api.get(`${API_URL}/users`);
    return res.data as UserModel[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserByRole = async (roleName: string): Promise<UserModel[]> => {
  try {
    const res = await api.get(`${API_URL}/users/${roleName}/role`);
    return res.data as UserModel[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const updateUser = async (userId: string, userData: Partial<UpdateUserDto>): Promise<UserModel | null> => {
  try {
    const res = await api.put(`${API_URL}/users/${userId}`, userData, { headers: { 'Content-Type': 'multipart/form-data' } });

    return res.data as UserModel;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createUser = async (userData: CreateUserDto): Promise<UserModel | null> => {
  try {
    const res = await api.post(`${API_URL}/users`, userData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data as UserModel;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    await api.patch(`${API_URL}/users/delete/${userId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteMultipleUsers = async (userIds: string[]): Promise<boolean> => {
  try {
    await api.patch(`${API_URL}/users/delete-multiple`, userIds);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const banUser = async (userId: string): Promise<void> => {
  try {
    await api.patch(`${API_URL}/users/${userId}/ban`);
  } catch (error) {
    console.error(error);
  }
};
export const unbannedUser = async (userId: string): Promise<void> => {
  try {
    await api.patch(`${API_URL}/users/${userId}/unbanned`);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsersWithRole = async (roleName: string, query?: string): Promise<UserModel[]> => {
  try {
    const res = await api.get(`${API_URL}/users/search/${roleName}/role`, { params: { search: query } });
    return res.data as UserModel[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
