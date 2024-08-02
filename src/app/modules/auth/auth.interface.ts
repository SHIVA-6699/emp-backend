import { TRoleType } from "../user/user.constant";

export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  email: string;
  password: string;
  role: TRoleType;
};
