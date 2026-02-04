import type { BirthdayReminderPayload } from "@birthday-reminder-service/shared";
import type { Job, Queue } from "bullmq";

export class BirthdayNotificationProcessor {
	constructor(private queue: Queue) {}

	async process(job: Job<BirthdayReminderPayload>) {
		const { name, email, birthday, timezone } = job.data;
		// TODO: Send email notification
		console.log(
			`[${job.id}] Processing birthday notification for ${name} <${email}> (birthday: ${birthday}) in ${timezone}`,
		);
		return true;
	}
}
