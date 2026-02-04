import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const router: Router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/:id", userController.retrieve);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
