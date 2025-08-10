import { z } from "zod";

export const salesOrderFormSchema = z.object({
  customer: z.string().trim(),
  orderDate: z.date(),
  deliveryDate: z.date(),
  items: z.object({
    product: z.string().trim(),
    quantity: z.coerce
      .number()
      .int({ message: "Quantity must be an integer." })
      .positive({ message: "Quantity must be greater than 0." }),
  }),
});
