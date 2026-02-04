import { JOBS, QUEUES } from "@birthday-reminder-service/shared";
import { Queue } from "bullmq";
import connection from "../../connections/redis";

export const createBirthdayReminderQueue = () => {
	return new Queue(QUEUES.BIRTHDAY_REMINDER, {
		connection,
	});
};

export const registerBirthdayCheckHourlyJob = async (queue: Queue) => {
	await queue.upsertJobScheduler(
		"hourly-birthday-check-scheduler",
		{
			pattern: "0 * * * *",
		},
		{
			name: JOBS.BIRTHDAY_REMINDER_HOURLY,
			data: {},
		},
	);
};
