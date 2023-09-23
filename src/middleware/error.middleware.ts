import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    console.error('Error', err)
    const statusCode = err instanceof SyntaxError ? 400 : 500;
    res.status(statusCode).json({
        error: {
            message: err.message || 'Something went wrong'
        }
    })
}