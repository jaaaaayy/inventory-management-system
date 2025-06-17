import { z } from "zod";

export const commonUserInfoValidationSchema = z.object({
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
      "Last name can only contain letters, spaces, hyphens, or apostrophes."
    ),
  email: z.string().trim().email("Invalid email address."),
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
});

export const addressSchema = z.object({
  addressLine1: z
    .string()
    .trim()
    .max(50, "Address line 1 must be at most 50 characters long."),
  addressLine2: z
    .string()
    .trim()
    .max(50, "Address line 2 must be at most 50 characters long.")
    .optional(),
  city: z.string().trim().max(50, "City must be at most 50 characters long."),
  province: z
    .string()
    .trim()
    .max(50, "Province must be at most 50 characters long."),
  postalCode: z
    .string()
    .trim()
    .min(3, "Postal code must be at least 3 characters long.")
    .max(10, "Postal code must be at most 10 characters long."),
});
