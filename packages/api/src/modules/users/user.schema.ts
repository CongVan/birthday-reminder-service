import { UserBaseSchema } from "@birthday-reminder-service/db";
import { isIsoDate } from "@birthday-reminder-service/shared";
import { z } from "zod";

export const CreateUserDto = UserBaseSchema.pick({
	email: true,
	name: true,
	timezone: true,
}).extend({
	birthday: z.string().refine((date) => isIsoDate(date), {
		message:
			"Invalid birthday format. Please use ISO 8601 format (e.g., YYYY-MM-DD).",
	}),
});

export const UpdateUserDto = CreateUserDto.pick({
	name: true,
	birthday: true,
	timezone: true,
}).partial();

export const CreateUserRequestSchema = z.object({
	body: CreateUserDto,
});

export const UpdateUserRequestSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
	body: UpdateUserDto,
});

export const RetrieveUserRequestSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});

export const DeleteUserRequestSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
export type RetrieveUserRequest = z.infer<typeof RetrieveUserRequestSchema>;
export type DeleteUserRequest = z.infer<typeof DeleteUserRequestSchema>;

export type CreateUserInput = z.infer<typeof CreateUserDto>;
export type UpdateUserInput = z.infer<typeof UpdateUserDto>;
