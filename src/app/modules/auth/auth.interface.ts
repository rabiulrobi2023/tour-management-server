import { Types } from "mongoose";
import { Role } from "../user/user.ifterface";

export enum ITokenName {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IJwtPayload {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: Role;
}
