import { hostname } from "os";
import { connectDatabase } from "./connections/mongo";
import { BirthdayReminderWorker } from "./queues/birthday-reminder";

const WORKER_ID = process.env.WORKER_ID || `worker-${hostname()}`;

const main = async () => {
	try {
		await connectDatabase();

		await BirthdayReminderWorker.init();
	} catch (err) {
		console.error(`Worker ${WORKER_ID}: Failed to start:`, err);
		process.exit(1);
	}
};

main();
