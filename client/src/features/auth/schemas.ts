import { commonUserInfoValidationSchema } from "@/shared/schemas";
import { z } from "zod";

export const loginFormSchema = z.object({
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

export const registerFormSchema =
  commonUserInfoValidationSchema.merge(loginFormSchema);
