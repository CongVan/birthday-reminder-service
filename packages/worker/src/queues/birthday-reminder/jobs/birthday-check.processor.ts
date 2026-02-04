import { User } from "@birthday-reminder-service/db";
import { JOBS } from "@birthday-reminder-service/shared";
import type { Job, Queue } from "bullmq";

export class BirthdayCheckProcessor {
  constructor(private queue: Queue) {}

  async process(job: Job) {
    console.log(`[${job.id}] Processing birthday check...`);

    const now = new Date();
    const cursor = User.find(
      {
        $expr: {
          $and: [
            {
              $eq: [
                {
                  $dayOfMonth: {
                    date: "$birthday",
                    timezone: "$timezone",
                  },
                },
                {
                  $dayOfMonth: {
                    date: now,
                    timezone: "$timezone",
                  },
                },
              ],
            },
            {
              $eq: [
                {
                  $month: {
                    date: "$birthday",
                    timezone: "$timezone",
                  },
                },
                {
                  $month: {
                    date: now,
                    timezone: "$timezone",
                  },
                },
              ],
            },
          ],
        },
      },
      { name: 1, email: 1, birthday: 1, timezone: 1 },
    ).cursor();

    const BATCH_SIZE = 1000;
    const currentYear = now.getFullYear();
    let count = 0;
    let batch: Array<{
      name: string;
      data: {
        name: string;
        email: string;
        birthday: Date;
        timezone: string;
      };
      opts: { jobId: string };
    }> = [];

    for await (const user of cursor) {
      batch.push({
        name: JOBS.BIRTHDAY_NOTIFICATION,
        data: {
          name: user.name,
          email: user.email,
          birthday: user.birthday,
          timezone: user.timezone,
        },
        opts: {
          jobId: `birthday-${user._id}-${currentYear}`,
        },
      });

      if (batch.length >= BATCH_SIZE) {
        await this.queue.addBulk(batch);
        count += batch.length;
        console.log(`[${job.id}] Queued ${count} users...`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await this.queue.addBulk(batch);
      count += batch.length;
    }

    console.log(
      `[${job.id}] Completed: ${count} birthday notifications queued.`,
    );
    return count;
  }
}
