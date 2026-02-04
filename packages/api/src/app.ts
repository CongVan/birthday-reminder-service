import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "@/middleware/error.middleware";
import { createBullBoardRouter } from "./modules/admin/bull-board.routes";
import v1Router from "./routes/v1";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/admin/queues", createBullBoardRouter());
app.use("/api/v1", v1Router);

app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

app.use(errorHandler);

export default app;
