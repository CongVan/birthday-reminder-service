import { z } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	MONGODB_URI: z.url(),
	REDIS_URL: z.url(),
	PORT: z.coerce.number().default(3000),
	WORKER_CONCURRENCY: z.coerce.number().default(50),
	IS_DEV: z.boolean().default(process.env.NODE_ENV === "development"),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

export const config = EnvSchema.parse(process.env);
