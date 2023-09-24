import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
  }
  res.status(500).json({
    error: {
      message: "Something went wrong",
    },
  });
};
