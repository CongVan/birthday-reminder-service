import type { NextFunction, Request, Response } from "express";
import {
	CreateUserRequestSchema,
	RetrieveUserRequestSchema,
	UpdateUserRequestSchema,
} from "@/modules/users/user.schema";
import { withValidator } from "./withValidator.utils";

describe("withValidator", () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNext: jest.Mock<NextFunction>;

	beforeEach(() => {
		mockReq = {
			body: {},
			params: {},
			query: {},
		};
		mockRes = {
			json: jest.fn().mockReturnThis(),
			status: jest.fn().mockReturnThis(),
			headersSent: false,
		};
		mockNext = jest.fn();
	});

	describe("CreateUserRequestSchema validation", () => {
		it("should pass validation with valid user data", async () => {
			mockReq.body = {
				email: "test@example.com",
				name: "Test",
				birthday: "2000-01-01",
				timezone: "Asia/Ho_Chi_Minh",
			};
			const handler = jest.fn().mockResolvedValue({ id: "user-123" });

			const wrappedHandler = withValidator(
				CreateUserRequestSchema,
				handler,
			);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(handler).toHaveBeenCalled();
			expect(mockRes.json).toHaveBeenCalledWith({
				success: true,
				data: { id: "user-123" },
			});
		});

		it("should reject invalid email format", async () => {
			mockReq.body = {
				email: "test",
				name: "Test",
				birthday: "2000-01-01",
				timezone: "Asia/Ho_Chi_Minh",
			};
			const handler = jest.fn();

			const wrappedHandler = withValidator(
				CreateUserRequestSchema,
				handler,
			);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith(
				expect.objectContaining({ success: false }),
			);
			expect(handler).not.toHaveBeenCalled();
		});

		it("should reject invalid birthday format", async () => {
			mockReq.body = {
				email: "test@example.com",
				name: "Test",
				birthday: "01-01-2000",
				timezone: "Asia/Ho_Chi_Minh",
			};
			const handler = jest.fn();

			const wrappedHandler = withValidator(
				CreateUserRequestSchema,
				handler,
			);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(handler).not.toHaveBeenCalled();
		});

		it("should reject when required fields are missing", async () => {
			mockReq.body = {
				email: "test@example.com",
			};
			const handler = jest.fn();

			const wrappedHandler = withValidator(
				CreateUserRequestSchema,
				handler,
			);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe("UpdateUserRequestSchema validation", () => {
		it("should pass validation with partial update data", async () => {
			mockReq.params = { id: "user-123" };
			mockReq.body = { name: "Jane Doe" }; // Only updating name
			const handler = jest.fn().mockResolvedValue({ updated: true });

			const wrappedHandler = withValidator(
				UpdateUserRequestSchema,
				handler,
			);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(handler).toHaveBeenCalled();
		});

		it("should reject when id param is missing", async () => {
			mockReq.params = {};
			mockReq.body = { name: "Test" };
			const handler = jest.fn();

			const wrappedHandler = withValidator(
				UpdateUserRequestSchema,
				handler,
			);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe("RetrieveUserRequestSchema validation", () => {
		it("should pass validation with valid id param", async () => {
			mockReq.params = { id: "user-123" };
			const handler = jest
				.fn()
				.mockResolvedValue({ id: "user-123", name: "Test" });

			const wrappedHandler = withValidator(
				RetrieveUserRequestSchema,
				handler,
			);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(handler).toHaveBeenCalled();
		});
	});
});
