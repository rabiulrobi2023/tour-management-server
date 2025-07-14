import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { IAuthProvider, IUser } from "./user.ifterface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import { envVariable } from "../../config/envConfig";

const createUser = async (payload: Partial<IUser>) => {
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "The email already registered");
  }

  const hashPassword = await bcrypt.hash(
    payload.password as string,
    Number(envVariable.SALT)
  );

  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: payload.email as string,
  };

  const result = await User.create({
    ...payload,
    auths: [authProvider],
    password: hashPassword,
  });
  return result;
};

const getAllUsers = async () => {
  const result = await User.find();
  const total = await User.countDocuments();
  return {
    data: result,
    meta: { total: total },
  };
};

export const UserService = {
  createUser,
  getAllUsers,
};
