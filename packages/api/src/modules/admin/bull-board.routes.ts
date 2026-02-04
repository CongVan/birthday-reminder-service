import { QUEUES } from "@birthday-reminder-service/shared";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { Queue } from "bullmq";
import connection from "../../connections/redis";

export const createBullBoardRouter = () => {
	const serverAdapter = new ExpressAdapter();
	serverAdapter.setBasePath("/admin/queues");

	const birthdayReminderQueue = new Queue(QUEUES.BIRTHDAY_REMINDER, {
		connection,
	});

	createBullBoard({
		queues: [new BullMQAdapter(birthdayReminderQueue)],
		serverAdapter,
	});

	return serverAdapter.getRouter();
};
