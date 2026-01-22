import { PermissionModel } from './PermissionModel';

export type RolePermissionModel = {
  id: string;
  roleId: string;
  permissionId: string;
  permission?: PermissionModel;
};

export type CreateRolePermissionDTO = {
  roleId: string;
  permissionId: string;
};
