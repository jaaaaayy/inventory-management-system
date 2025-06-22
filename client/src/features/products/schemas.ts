import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().max(100, "Name must be at most 100 characters long."),
  stockKeepingUnit: z
    .string()
    .trim()
    .max(50, "Description must be at most 50 characters long."),
  costPrice: z
    .number()
    .positive({ message: "Cost price must be greater than 0." })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Cost price must have up to 2 decimal places",
    }),
  sellingPrice: z
    .number()
    .positive({ message: "Selling price must be greater than 0." })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Cost price must have up to 2 decimal places",
    }),
  unit: z.string().trim().max(10, "Unit must be at most 10 characters long."),
  quantity: z
    .number()
    .int({ message: "Quantity must be an integer." })
    .positive({ message: "Quantity must be greater than 0." }),
  category: z.string().trim(),
  vendor: z.string().trim(),
});
