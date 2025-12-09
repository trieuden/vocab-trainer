import { RoleModel } from './RoleModel';
import { Gender } from '../enums/UserEnum';
import { UserPermissionModel } from './UserPermissionModel';

export type UserModel = {
  id: string;
  username: string;
  name: string;
  birthDate?: Date;
  phoneNumber: string;
  avatar?: string;
  gender?: string;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleModel;
  lastActiveAt?: Date;
  userPermissions?: UserPermissionModel[];
};

export type CreateUserDto = {
  username: string;
  password: string;
  name: string;
  avatar?: File;
  roleId: string;
  gender?: Gender;
  birthDate: string;
  phoneNumber: string;
  email: string;
};
export type UpdateUserDto = {
  password?: string;
  name?: string;
  avatar?: File;
  gender?: Gender;
  birthDate?: string;
  phoneNumber?: string;
  isDeleteAvatar?: Boolean;
};
