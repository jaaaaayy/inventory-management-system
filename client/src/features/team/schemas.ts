import { z } from "zod";
import { commonUserInfoValidationSchema } from "@/shared/schemas";

export const ASSIGNABLE_POSITIONS = ["Admin", "Member"] as const;

export const inviteFormSchema = z.object({
  email: z.string().trim().email("Invalid email address."),
  position: z.enum(ASSIGNABLE_POSITIONS, {
    errorMap: () => ({ message: "Select a position." }),
  }),
});

export const acceptInviteFormSchema = commonUserInfoValidationSchema
  .pick({ firstName: true, lastName: true, mobileNumber: true })
  .extend({
    username: z
      .string()
      .trim()
      .min(6, "Username must be at least 6 characters long.")
      .max(30, "Username must be at most 30 characters long."),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long."),
  });
