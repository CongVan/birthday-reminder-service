import { config } from "@birthday-reminder-service/shared";
import mongoose from "mongoose";
import app from "./app";

const startServer = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI);
		console.log("Connected to MongoDB");

		app.listen(config.PORT, () => {
			console.log(`API Service running on port ${config.PORT}`);
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
};

startServer();
