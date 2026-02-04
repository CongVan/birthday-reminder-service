import { config } from "@birthday-reminder-service/shared";
import mongoose from "mongoose";

export const connectDatabase = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection failed", error);
		process.exit(1);
	}
};

export const disconnectDatabase = async () => {
	await mongoose.disconnect();
	console.log("Disconnected from MongoDB");
};
