import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/environment";
import { AuthenticationError } from "../utils/customError";

// Define user interface for better type safety
interface JwtPayload {
	id: string;
	role: string;
	// Add other relevant fields from your JWT token
}

// Extend Express Request type to include user
declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}

export const authenticateRequest = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader?.startsWith("Bearer ")) {
			throw new AuthenticationError("Invalid authorization header");
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			throw new AuthenticationError("No token provided");
		}

		const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
		req.user = decoded;
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			next(new AuthenticationError("Invalid or expired token"));
		} else {
			next(error);
		}
	}
};

export const checkPermission = (requiredRole?: string) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		try {
			if (!req.user) {
				throw new AuthenticationError("Authentication required");
			}

			if (requiredRole && req.user.role !== requiredRole) {
				throw new AuthenticationError("Insufficient permissions");
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};
