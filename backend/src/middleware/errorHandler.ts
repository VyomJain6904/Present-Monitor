import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/environment";
import { AppError } from "../utils/customError";

interface ErrorResponse {
    status: string;
    statusCode: number;
    message: string;
    stack?: string;
    errors?: unknown[];
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Default error state
    const response: ErrorResponse = {
        status: "error",
        statusCode: 500,
        message: "Internal Server Error",
    };

    // Handle known application errors
    if (err instanceof AppError) {
        response.statusCode = err.statusCode;
        response.message = err.message;
    }

    // Handle validation errors (assuming Mongoose/validation errors have 'errors' property)
    if ('errors' in err) {
        response.statusCode = 400;
        response.message = "Validation Error";
        response.errors = Object.values(err.errors || {});
    }

    // Add stack trace in development environment
    if (ENV.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    // Structured logging
    console.error({
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        errorMessage: err.message,
        errorStack: err.stack,
        requestId: req.headers["x-request-id"],
    });

    res.status(response.statusCode).json(response);
};
