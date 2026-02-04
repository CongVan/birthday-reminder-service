import type { NextFunction, Request, Response } from "express";

export const withHandler = <TReq extends Request, TRes = any>(
	handler: (
		req: TReq,
		res: Response,
		next: NextFunction,
	) => Promise<TRes> | TRes,
) => {
	return async (req: TReq, res: Response, next: NextFunction) => {
		try {
			const data = await handler(req, res, next);
			if (!res.headersSent) {
				res.json({
					success: true,
					data,
				});
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	};
};
