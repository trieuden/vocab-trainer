import { PermissionModel } from './PermissionModel';
import { UserModel } from './UserModel';

export type UserPermissionModel = {
  id: string;
  user: UserModel;
  permission?: PermissionModel;
};
export type CreateUserPermissionDto = {
  userId: string;
  permissionId: string;
};
