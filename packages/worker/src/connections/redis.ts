import { config } from "@birthday-reminder-service/shared";
import Redis from "ioredis";

const connection = new Redis(config.REDIS_URL, {
	maxRetriesPerRequest: null,
});

connection.on("connect", () => {
	console.log("Connected to Redis");
});

connection.on("error", (err) => {
	console.error("Redis connection error:", err);
});

export default connection;
