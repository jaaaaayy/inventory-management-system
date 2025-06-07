import { z } from "zod";

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
