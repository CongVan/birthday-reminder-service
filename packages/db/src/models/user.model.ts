import { isIsoDate, isValidTimeZone } from "@birthday-reminder-service/shared";
import mongoose, { type Document, Schema } from "mongoose";
import type { IUser } from "../schemas/user.schema";

export type UserEntity = IUser & Document;

const UserSchema = new Schema<UserEntity>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 100,
			trim: true,
		},
		birthday: {
			type: Date,
			required: true,
			validate: {
				validator: (v: Date) => {
					return isIsoDate(v.toISOString());
				},
				message:
					"Invalid birthday format. Please use ISO 8601 format (e.g., YYYY-MM-DD).",
			},
		},
		timezone: {
			type: String,
			required: true,
			validate: {
				validator: (v: string) => {
					return isValidTimeZone(v);
				},
				message:
					"Invalid timezone format. Please use IANA timezone format (e.g., America/Los_Angeles).",
			},
		},
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
		strict: true,
	},
);

UserSchema.index({ birthday: 1, timezone: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);
