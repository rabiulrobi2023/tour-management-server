/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { envVariable } from "../config/envConfig";
import AppError from "../errors/AppError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Somthing went worng";

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: envVariable.NODE_ENV === "development" ? err.stack : "null",
  });
};
