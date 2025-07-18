import { z } from "zod";
import { salesOrderFormSchema } from "./schemas";

export type TSalesOrderFormSchema = z.infer<typeof salesOrderFormSchema>;

export type TSalesOrder = {
  _id: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
} & TSalesOrderFormSchema;
