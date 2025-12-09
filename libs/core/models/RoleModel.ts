import { RolePermissionModel } from './RolePermissionModel';
import { UserModel } from './UserModel';

export type RoleModel = {
  id: string;
  role_name: string;
  rolePermissions?: RolePermissionModel[];
};
