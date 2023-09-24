import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
  statusCode: number = 500 // Default status code is 500
) => {
  console.error('Error:', err);

  if (statusCode === 500) {
    console.error(err);
    res.status(statusCode).json({
        error: {
          message: err.message || 'Something went wrong'
        }
      });
  }

  res.status(statusCode).json({
    error: {
      message: err.message || 'Something went wrong'
    }
  });
};
