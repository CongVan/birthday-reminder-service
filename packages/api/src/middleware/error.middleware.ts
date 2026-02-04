import { config } from "@birthday-reminder-service/shared";
import type { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import z, { ZodError } from "zod";
import { AppError } from "../common/errors/app-error";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const error = err;

	let statusCode = error.statusCode || 500;
	let message = error.message || "Internal Server Error";

	if (error instanceof MongooseError.ValidationError) {
		message = error.message;
		statusCode = 400;
	}

	if (error instanceof ZodError) {
		message = z.treeifyError(error).errors[0];
		statusCode = 400;
	}

	if (error instanceof AppError) {
		statusCode = error.statusCode;
		message = error.message;
	}

	if (config.IS_DEV) {
		console.error("Error:", error);
	}

	res.status(statusCode).json({
		success: false,
		error: message,
		...(config.IS_DEV && { stack: error.stack }),
	});
};
