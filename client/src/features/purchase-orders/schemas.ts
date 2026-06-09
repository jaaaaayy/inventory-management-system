import { z } from "zod";

export const purchaseOrderFormSchema = z.object({
  vendor: z.string().trim().min(1, "Vendor is required."),
  orderDate: z.date({ required_error: "Order date is required." }),
  expectedDate: z.date({ required_error: "Expected date is required." }),
  items: z
    .array(
      z.object({
        product: z.string().trim().min(1, "Product is required."),
        quantity: z.coerce
          .number()
          .int({ message: "Quantity must be an integer." })
          .positive({ message: "Quantity must be greater than 0." }),
      })
    )
    .min(1, { message: "At least one item is required." }),
  notes: z
    .string()
    .trim()
    .max(500, { message: "Notes cannot exceed 500 characters." })
    .optional(),
});
