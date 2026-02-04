import type { NextFunction, Request, Response } from "express";
import { withHandler } from "./withHandler.utils";

describe("withHandler", () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNext: jest.Mock<NextFunction>;

	beforeEach(() => {
		mockReq = {};
		mockRes = {
			json: jest.fn().mockReturnThis(),
			headersSent: false,
		};
		mockNext = jest.fn();
		console.error = jest.fn();
	});

	describe("successful execution", () => {
		it("should wrap handler response in success object", async () => {
			const testData = { ok: true };
			const handler = jest.fn().mockResolvedValue(testData);

			const wrappedHandler = withHandler(handler);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(mockRes.json).toHaveBeenCalledWith({
				success: true,
				data: testData,
			});
		});

		it("should call handler with req, res, next", async () => {
			const handler = jest.fn().mockResolvedValue({ ok: true });

			const wrappedHandler = withHandler(handler);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(handler).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
		});

		it("should not send response if headers already sent", async () => {
			mockRes.headersSent = true;
			const handler = jest.fn().mockResolvedValue({ data: "test" });

			const wrappedHandler = withHandler(handler);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(mockRes.json).not.toHaveBeenCalled();
		});
	});

	describe("error handling", () => {
		it("should call next with error when handler throws", async () => {
			const error = new Error("Test error");
			const handler = jest.fn().mockRejectedValue(error);

			const wrappedHandler = withHandler(handler);
			await wrappedHandler(
				mockReq as Request,
				mockRes as Response,
				mockNext,
			);

			expect(mockNext).toHaveBeenCalledWith(error);
		});
	});
});
