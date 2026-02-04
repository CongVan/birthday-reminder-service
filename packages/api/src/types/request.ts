import type { Request } from "express";
import type { z } from "zod";

type GetSchemaShape<T extends z.ZodType<any>> = z.infer<T>;

export type ValidatedRequest<T extends z.ZodType<any>> = Request<
	GetSchemaShape<T> extends { params: infer Params } ? Params : any,
	any,
	GetSchemaShape<T> extends { body: infer Body } ? Body : any,
	GetSchemaShape<T> extends { query: infer Query } ? Query : any
>;
