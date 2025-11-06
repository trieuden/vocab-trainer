import { RoleModel } from './RoleModel';

export type UserModel = {
  id: string;
  username: string;
  avatar?: string;
  gender?: string;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleModel;
};
