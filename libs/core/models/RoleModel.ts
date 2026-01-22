import { RolePermissionModel } from './RolePermissionModel';
import { UserModel } from './UserModel';

export type RoleModel = {
  id: string;
  roleName: string;
  rolePermissions?: RolePermissionModel[];
};
