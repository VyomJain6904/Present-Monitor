export class AppError extends Error {
	public statusCode: number;
	public isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class ValidationError extends AppError {
	constructor(
		message: string = "Invalid input data. Please check your request and try again.",
	) {
		super(message, 400);
	}
}

export class AuthenticationError extends AppError {
	constructor(
		message: string = "Authentication failed. Please check your credentials or login again.",
	) {
		super(message, 401);
	}
}

export class NotFoundError extends AppError {
	constructor(
		message: string = "The requested resource could not be found on the server.",
	) {
		super(message, 404);
	}
}

export class ServerDownError extends AppError {
	constructor(
		message: string = "College website server is currently unavailable. Please try again later.",
	) {
		super(message, 503);
	}
}

export class DatabaseError extends AppError {
	constructor(
		message: string = "Database operation failed. Please try again later.",
	) {
		super(message, 500);
	}
}
