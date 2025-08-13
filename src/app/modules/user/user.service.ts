import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { IAuthProvider, IUser, Role } from "./user.ifterface";
import { User } from "./user.model";
import { passwordHashing } from "../../utils/passwordHashing";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "The email already registered");
  }

  const hashPassword = await passwordHashing(payload.password as string);

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

const getSingleUser = async (id: string) => {
  const result = await User.findById(id).select("-password");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
  verifiedToken: JwtPayload
) => {
  const isUserExist = User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (payload.role) {
    if (verifiedToken.role === Role.user || verifiedToken.role === Role.guide) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Only admin or super-admin can change role"
      );
    }
    if (payload.role === Role.superAdmin && verifiedToken.role === Role.admin) {
      throw new AppError(httpStatus.FORBIDDEN, "Admin can not change his role");
    }
  }

  if (payload.status || payload.isDeleted || payload.isVerified) {
    if (verifiedToken.role === Role.user || verifiedToken.role === Role.guide) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Your are not authorized to delete or change status or approve any user"
      );
    }
  }

  if (payload.password) {
    payload.password = await passwordHashing(payload.password);
  }

  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
