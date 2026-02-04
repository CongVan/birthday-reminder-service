import { JOBS, QUEUES } from "@birthday-reminder-service/shared";
import { Queue } from "bullmq";
import { Router } from "express";
import connection from "../../connections/redis";

const router = Router();
const queue = new Queue(QUEUES.BIRTHDAY_REMINDER, { connection });

router.post("/trigger", async (_req, res) => {
	try {
		const job = await queue.add(
			JOBS.BIRTHDAY_REMINDER_HOURLY,
			{},
			{
				jobId: `manual-trigger-${Date.now()}`,
			},
		);
		res.json({
			message: "Birthday check job triggered",
			jobId: job.id,
			jobName: job.name,
		});
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		res.status(500).json({ error: message });
	}
});

export default router;
