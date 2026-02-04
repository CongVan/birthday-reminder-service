import type { BirthdayReminderPayload } from "@birthday-reminder-service/shared";
import { BirthdayNotificationProcessor } from "./birthday-notification.processor";

describe("BirthdayNotificationProcessor", () => {
	let processor: BirthdayNotificationProcessor;
	let mockQueue: object;

	beforeEach(() => {
		mockQueue = {};
		processor = new BirthdayNotificationProcessor(mockQueue as any);
		jest.spyOn(console, "log").mockImplementation();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should process notification and return true", async () => {
		const mockJob = {
			id: "notification-123",
			data: {
				name: "Test",
				email: "test@example.com",
				birthday: new Date("2000-01-01"),
				timezone: "Asia/Ho_Chi_Minh",
			} as BirthdayReminderPayload,
		};

		const result = await processor.process(mockJob as any);

		expect(result).toBe(true);
	});
});
