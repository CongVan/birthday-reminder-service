import type { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

import { withHandler } from "@/common/utils/withHandler.utils";
import type { ValidatedRequest } from "@/types/request";

export const withValidator = <PayloadSchema extends z.ZodType<any>>(
	schema: PayloadSchema,
	handler: (
		req: ValidatedRequest<PayloadSchema>,
		res: Response,
		next: NextFunction,
	) => Promise<any> | any,
): RequestHandler => {
	return withHandler(
		async (req: Request, res: Response, next: NextFunction) => {
			const payload = {
				body: req.body,
				params: req.params,
				query: req.query,
			};

			const result = await schema.safeParseAsync(payload);
			if (!result.success) {
				return res.status(400).json({
					success: false,
					message: z.prettifyError(result.error),
				});
			}

			if (result.data.body) req.body = result.data.body;
			if (result.data.params) req.params = result.data.params;
			if (result.data.query) req.query = result.data.query;

			return handler(req as ValidatedRequest<PayloadSchema>, res, next);
		},
	);
};
