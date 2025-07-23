import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.ifterface";
import {
  generateNewAccessTokenByRefrershToken,
  generateUserTokens,
} from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { passwordHashing } from "../../utils/passwordHashing";

const credentialLogin = async (payload: Partial<IUser>) => {
  const isUserExists = await User.findOne({ email: payload.email });

  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Wrong email id");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    isUserExists.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Wrong password");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = isUserExists.toObject();

  const userTokens = generateUserTokens(isUserExists);
  return {
    accessToken: userTokens.jwtWebToken,
    refreshToken: userTokens.jwtRefreshToken,
    user: rest,
  };
};

const createNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await generateNewAccessTokenByRefrershToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  oldPassword: string,
  newPassWord: string,
  verifiedToken: JwtPayload
) => {
  const user = await User.findById(verifiedToken.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user?.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password does not match");
  }

  user.password = await passwordHashing(newPassWord);
  user.save();
  return true;
};

const googleCallBack = async (payload: Partial<IUser>) => {
  const userTokens = generateUserTokens(payload);

  return {
    accessToken: userTokens.jwtWebToken,
    refreshToken: userTokens.jwtRefreshToken,
  };
};
export const AuthService = {
  credentialLogin,
  createNewAccessToken,
  changePassword,
  googleCallBack,
};
