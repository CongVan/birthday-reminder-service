import { config } from "@birthday-reminder-service/shared";
import Redis from "ioredis";

const connection = new Redis(config.REDIS_URL, {
	maxRetriesPerRequest: null,
});

connection.on("connect", () => {
	console.log("API: Connected to Redis");
});

connection.on("error", (err: Error) => {
	console.error("API: Redis connection error:", err);
});

export default connection;
