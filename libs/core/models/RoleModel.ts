import { UserModel } from './UserModel';

export type RoleModel = {
  id: string;
  role_name: string;
  user: UserModel[];
};
