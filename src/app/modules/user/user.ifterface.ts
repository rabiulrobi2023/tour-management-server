import { Types } from "mongoose";

export enum Status {
  active = "active",
  inactive = "inactive",
  blocked = "blocked",
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export enum Role {
  superAdmin = "superAdmin",
  user = "user",
  admin = "admin",
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: Role;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted: boolean;
  status: Status;
  isVerified: boolean;
  auths: IAuthProvider[];
  bookings: Types.ObjectId[];
  guides: Types.ObjectId[];
}
