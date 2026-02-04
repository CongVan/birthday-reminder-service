import { User, type UserEntity } from "@birthday-reminder-service/db";
import type { CreateUserInput, UpdateUserInput } from "./user.schema";

export class UserService {
	async createUser(input: CreateUserInput): Promise<UserEntity> {
		const existingUser = await User.findOne({ email: input.email });
		if (existingUser) {
			throw new Error(`User with email ${input.email} already exists`);
		}
		const user = new User({
			email: input.email,
			name: input.name,
			birthday: input.birthday,
			timezone: input.timezone,
		});

		const validationError = user.validateSync();
		if (validationError) {
			throw validationError;
		}

		return user.save();
	}

	async retrieve(userId: string): Promise<UserEntity | null> {
		const user = await User.findById(userId);
		return user;
	}

	async update(userId: string, input: UpdateUserInput): Promise<UserEntity> {
		const user = await User.findByIdAndUpdate(
			{ _id: userId },
			{
				name: input.name,
				birthday: input.birthday,
				timezone: input.timezone,
			},
			{ runValidators: true, new: true },
		);

		if (!user) {
			throw new Error(`User with id ${userId} not found`);
		}

		return user;
	}

	async delete(userId: string): Promise<UserEntity> {
		const user = await User.findByIdAndDelete(userId);
		if (!user) {
			throw new Error(`User with id ${userId} not found`);
		}
		return user;
	}
}
