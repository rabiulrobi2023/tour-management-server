import httpStatus from "http-status-codes";
import { envVariable } from "../config/envConfig";
import AppError from "../errors/AppError";
import { IUser, Status } from "../modules/user/user.ifterface";
import { generateJwtToken } from "./generateJwtToken";
import { verifyJwtToken } from "./verifyJwtToken";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

export const generateUserTokens = (payload: Partial<IUser>) => {
  const jwtWebToken = generateJwtToken(
    payload,
    envVariable.JWT_SECRET,
    envVariable.JWT_EXPIRE
  );
  const jwtRefreshToken = generateJwtToken(
    payload,
    envVariable.JWT_REFRESH_SECRET,
    envVariable.JWT_REFRESH_EXPIRE
  );

  return {
    jwtWebToken,
    jwtRefreshToken,
  };
};

export const generateNewAccessTokenByRefrershToken = async (
  refreshToken: string
) => {
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "No refresh token from cookies");
  }
  const verifyRefreshToken = verifyJwtToken(
    refreshToken,
    envVariable.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExist = await User.findById(verifyRefreshToken.id);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  if (
    isUserExist.status === Status.blocked ||
    isUserExist.status === Status.inactive
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.status}`);
  }

  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  const newAccessToken = generateJwtToken(
    isUserExist,
    envVariable.JWT_SECRET,
    envVariable.JWT_EXPIRE
  );
  return newAccessToken;
};
