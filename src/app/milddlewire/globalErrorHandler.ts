/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";

import { ErrorRequestHandler } from "express";
import { envVariable } from "../config/envConfig";
import AppError from "../errors/AppError";
import { TErrorSources } from "../interface/error.interface";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  let statusCode = 500;
  let message = "Somthing went worng";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "",
    },
  ];

  if (err.code === 11000) {
    statusCode = httpStatus.CONFLICT;
    message = `${Object.values(err.keyValue)[0]} is duplicate`;
  } else if (err.name === "ValidationError") {
    statusCode = httpStatus.BAD_REQUEST;
    message = err?._message;
    const errors = Object.values(err.errors);
    errors.forEach((err: any) =>
      errorSources.push({
        path: err?.path,
        message: err?.message,
      })
    );
  } else if (err.name === "CastError") {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Invalid mongodb Id";
  } else if (err.name === "ZodError") {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Zod Error";

    err.issues.forEach((error: any) =>
      errorSources.push({
        path: error.path.join(" inside "),
        message: error.message,
      })
    );
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: envVariable.NODE_ENV === "development" ? err : "null",
    stack: envVariable.NODE_ENV === "development" ? err.stack : "null",
  });
};
