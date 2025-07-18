import { z } from "zod";

export const salesOrderFormSchema = z.object({
  customer: z.string().trim(),
  orderDate: z.date(),
  deliveryDate: z.date(),
});
