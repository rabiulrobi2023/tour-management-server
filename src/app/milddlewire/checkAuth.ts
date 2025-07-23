/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { Role, Status } from "../modules/user/user.ifterface";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { envVariable } from "../config/envConfig";
import { verifyJwtToken } from "../utils/verifyJwtToken";
import { User } from "../modules/user/user.model";

const checkAuth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken as string;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "No access token");
    }

    let verifiedToken;

    try {
      verifiedToken = verifyJwtToken(
        token,
        envVariable.JWT_SECRET
      ) as JwtPayload;
    } catch (err: any) {
      throw new AppError(httpStatus.UNAUTHORIZED, err);
    }

    const { role, email } = verifiedToken;

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized user");
    }

    const isUserExist = await User.findOne({ email: email });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (isUserExist.status === Status.blocked) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is blocked");
    }

    if (isUserExist.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
    }

    req.user = verifiedToken;
    next();
  });
};

export default checkAuth;
