import { Router } from "express";
import adminRoutes from "../../modules/admin/admin.routes";
import userRoutes from "../../modules/users/user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;
