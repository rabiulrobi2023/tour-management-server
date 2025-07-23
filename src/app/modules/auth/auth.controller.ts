import httpStatus from "http-status-codes";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setCookie } from "../../utils/setCookie";
import { userLogout } from "../../utils/userLogout";
import { ITokenName } from "./auth.interface";
import { AuthService } from "./auth.service";
import { IUser } from "../user/user.ifterface";
import { envVariable } from "../../config/envConfig";
import AppError from "../../errors/AppError";
import { generateUserTokens } from "../../utils/userTokens";

const credentialLogin = catchAsync(async (req, res, next) => {
  const result = await AuthService.credentialLogin(req.body);

  setCookie(res, ITokenName.accessToken, result.accessToken);
  setCookie(res, ITokenName.refreshToken, result.refreshToken);

  sendResponse(res, {
    message: "User login successfull",
    data: result,
  });
});

const createNewAccessToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await AuthService.createNewAccessToken(refreshToken);

  setCookie(res, ITokenName.accessToken, result.accessToken);

  sendResponse(res, {
    message: "New access token generated successfully",
    data: result,
  });
});

const logout = catchAsync(async (req, res, next) => {
  userLogout(res, ITokenName.accessToken);
  userLogout(res, ITokenName.refreshToken);
  sendResponse(res, {
    message: "User logout successfully",
    data: null,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const verifiedToken = req.user;

  const result = await AuthService.changePassword(
    oldPassword,
    newPassword,
    verifiedToken as JwtPayload
  );
  sendResponse(res, {
    message: "Passowrd changed successfully",
    data: result,
  });
});

const googleCallBack = catchAsync(async (req, res, next) => {
  const redirectTo = req.query.state;

  const user = req.user;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const tokens = generateUserTokens(user);

  setCookie(res, envVariable.JWT_SECRET, tokens.jwtWebToken);
  setCookie(res, envVariable.JWT_REFRESH_SECRET, tokens.jwtRefreshToken);

  res.redirect(`${envVariable.FORNTEND_URL}/${redirectTo}`);
});

export const AuthController = {
  credentialLogin,
  createNewAccessToken,
  logout,
  changePassword,
  googleCallBack,
};
