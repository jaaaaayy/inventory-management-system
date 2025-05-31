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

export const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .max(50, "First name must be at most 50 characters long.")
      .regex(
        /^[A-Za-z\s\-']+$/,
        "First name can only contain letters, spaces, hyphens, or apostrophes."
      ),
    lastName: z
      .string()
      .trim()
      .max(50, "Last name must be at most 50 characters long.")
      .regex(
        /^[A-Za-z\s\-']+$/,
        "First name can only contain letters, spaces, hyphens, or apostrophes."
      ),
    email: z.string().email("Invalid email address.").trim(),
    mobileNumber: z
      .string()
      .trim()
      .min(10, "Mobile number must be at least 10 characters long.")
      .max(15, "Mobile number must be at most 15 characters long.")
      .regex(/^(?:\+63|0)9\d{9}$/, "Invalid mobile number.")
      .transform((value) => {
        if (value.startsWith("+63")) return value;
        if (value.startsWith("63")) return `+${value}`;
        if (value.startsWith("0")) return `+63${value.slice(1)}`;
        return value;
      }),
  })
  .merge(loginFormSchema);
