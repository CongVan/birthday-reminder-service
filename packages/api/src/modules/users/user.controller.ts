import { withValidator } from "../../common/utils/withValidator.utils";
import {
	CreateUserRequestSchema,
	DeleteUserRequestSchema,
	RetrieveUserRequestSchema,
	UpdateUserRequestSchema,
} from "./user.schema";
import type { UserService } from "./user.service";

export class UserController {
	constructor(private userService: UserService) {}

	retrieve = withValidator(RetrieveUserRequestSchema, async (req, res) => {
		const user = await this.userService.retrieve(req.params.id);
		return user;
	});

	create = withValidator(CreateUserRequestSchema, async (req, res) => {
		const createdUser = await this.userService.createUser(req.body);
		res.status(201);
		return createdUser;
	});

	update = withValidator(UpdateUserRequestSchema, async (req) => {
		const updatedUser = await this.userService.update(
			req.params.id,
			req.body,
		);
		return updatedUser;
	});

	delete = withValidator(DeleteUserRequestSchema, async (req, res) => {
		const deletedUser = await this.userService.delete(req.params.id);
		res.status(204);
		return deletedUser;
	});
}
