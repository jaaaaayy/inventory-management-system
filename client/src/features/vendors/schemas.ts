import { addressSchema } from "@/shared/schemas";
import { z } from "zod";

export const vendorFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(50, "Vendor name must be at most 50 characters long."),
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
  })
  .merge(addressSchema);
