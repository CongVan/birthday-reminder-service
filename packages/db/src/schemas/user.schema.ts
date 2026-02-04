import { isIsoDate, isValidTimeZone } from "@birthday-reminder-service/shared";
import { z } from "zod";

export const UserBaseSchema = z.object({
  email: z.email(),
  name: z.string().min(1).max(100),
  birthday: z.date().refine((date) => isIsoDate(date.toISOString()), {
    message:
      "Invalid birthday format. Please use ISO 8601 format (e.g., YYYY-MM-DD).",
  }),
  timezone: z.string().refine(isValidTimeZone, {
    message:
      "Invalid timezone format. Please use IANA timezone format (e.g., America/Los_Angeles).",
  }),
  created_at: z.date(),
  updated_at: z.date(),
});

export type IUser = z.infer<typeof UserBaseSchema>;
