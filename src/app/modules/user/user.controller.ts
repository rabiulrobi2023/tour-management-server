/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createuser = catchAsync(async (req, res, next) => {
  const result = await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
    data: result
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, { message: "User retrived successfull", data: result });
});
export const UserController = {
  createuser,
  getAllUsers,
};
