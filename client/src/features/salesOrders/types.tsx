import { z } from "zod";
import { salesOrderFormSchema } from "./schemas";

export type TSalesItem = {
  _id: string;
  product: string;
  quantity: number;
  totalPrice: number;
};

export type TSalesOrderFormSchema = z.infer<typeof salesOrderFormSchema>;

export type TSalesOrder = {
  _id: string;
  status: string;
  totalAmount: string;
  salesItems: TSalesItem[];
  createdAt: string;
  updatedAt: string;
} & TSalesOrderFormSchema;
