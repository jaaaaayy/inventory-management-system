import { z } from "zod";

export const salesOrderFormSchema = z.object({
  customer: z.string().trim().min(1, "Customer is required."),
  orderDate: z.date(),
  deliveryDate: z.date(),
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
});
