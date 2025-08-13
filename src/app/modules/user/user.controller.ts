/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createuser = catchAsync(async (req, res, next) => {
  const result = await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, { message: "User retrived successfull", data: result });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);
  sendResponse(res, {
    message: "User retrived successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;

  const verifiedToken = req.user;
  const result = await UserService.updateUser(
    id,
    payload,
    verifiedToken as JwtPayload
  );
  sendResponse(res, {
    message: "Account updated successfull",
    data: result,
  });
});
export const UserController = {
  createuser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
