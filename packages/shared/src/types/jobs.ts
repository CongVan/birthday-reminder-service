import { JOBS } from "../constants/queues";

export interface BirthdayReminderPayload {
	name: string;
	email: string;
	birthday: Date;
	timezone: string;
}

export type CheckBirthdaysPayload = {};

export type JobPayloads = {
	[JOBS.BIRTHDAY_NOTIFICATION]: BirthdayReminderPayload;
	[JOBS.BIRTHDAY_REMINDER_HOURLY]: CheckBirthdaysPayload;
};

export type JobName = keyof JobPayloads;
