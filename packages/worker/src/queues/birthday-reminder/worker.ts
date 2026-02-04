import { JOBS, QUEUES } from "@birthday-reminder-service/shared";
import { type Job, type Queue, Worker } from "bullmq";
import connection from "@/connections/redis";
import { BirthdayCheckProcessor } from "@/queues/birthday-reminder/jobs/birthday-check.processor";
import { BirthdayNotificationProcessor } from "@/queues/birthday-reminder/jobs/birthday-notification.processor";
import {
  createBirthdayReminderQueue,
  registerBirthdayCheckHourlyJob,
} from "./queue";

export class BirthdayReminderWorker {
  private static worker: Worker;
  private static queue: Queue;

  static async init() {
    const WORKER_ID = process.env.WORKER_ID || `worker-${process.pid}`;

    BirthdayReminderWorker.queue = createBirthdayReminderQueue();

    await registerBirthdayCheckHourlyJob(BirthdayReminderWorker.queue);

    BirthdayReminderWorker.worker = new Worker(
      QUEUES.BIRTHDAY_REMINDER,
      async (job: Job) => {
        switch (job.name) {
          case JOBS.BIRTHDAY_REMINDER_HOURLY: {
            const processor = new BirthdayCheckProcessor(
              BirthdayReminderWorker.queue,
            );
            await processor.process(job);
            break;
          }

          case JOBS.BIRTHDAY_NOTIFICATION: {
            const notificationProcessor = new BirthdayNotificationProcessor(
              BirthdayReminderWorker.queue,
            );
            await notificationProcessor.process(job);
            break;
          }

          default:
            console.warn(`Unknown job name ${job.name}`);
        }
      },
      {
        connection: connection,
        concurrency: 10000,
      },
    );

    BirthdayReminderWorker.worker.on("completed", (job) => {
      console.log(`[${job.id}] completed`);
    });

    BirthdayReminderWorker.worker.on("failed", (job, err) => {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[${job?.id}] failed: ${errorMsg}`);
    });

    console.log(
      `Worker ${WORKER_ID} started for queue: ${QUEUES.BIRTHDAY_REMINDER}`,
    );

    process.on("SIGTERM", async () => {
      await BirthdayReminderWorker.close();
    });

    process.on("SIGINT", async () => {
      await BirthdayReminderWorker.close();
    });
  }

  static async close() {
    console.log("Shutting down BirthdayReminderWorker...");
    if (BirthdayReminderWorker.worker) {
      await BirthdayReminderWorker.worker.close();
    }
    if (BirthdayReminderWorker.queue) {
      await BirthdayReminderWorker.queue.close();
    }
    console.log("BirthdayReminderWorker shutdown complete.");
  }
}
