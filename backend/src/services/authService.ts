import { Request, Response, NextFunction } from "express";
import * as authService from "./authService";
import { ValidationError } from "../utils/customErrors";
import { generateJWT } from "../utils/encryption";

export const registerStudent = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, phone, name, password, collegeId, department } =
			req.body;

		// Validate input
		if (!email || !phone || !name || !password) {
			throw new ValidationError("Missing required fields");
		}

		const student = await authService.registerStudent({
			email,
			phone,
			name,
			password,
			collegeId,
			department,
		});

		res.status(201).json({
			message: "Student registered successfully",
			studentId: student.id,
		});
	} catch (error) {
		next(error);
	}
};

export const loginStudent = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;

		const student = await authService.authenticateStudent(email, password);

		const token = generateJWT({
			id: student.id,
			email: student.email,
			collegeId: student.collegeId,
		});

		res.json({
			token,
			studentId: student.id,
			message: "Login successful",
		});
	} catch (error) {
		next(error);
	}
};
