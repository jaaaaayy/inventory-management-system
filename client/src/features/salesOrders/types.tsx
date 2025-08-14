import { z } from "zod";
import { salesOrderFormSchema } from "./schemas";

export type TSalesOrderFormSchema = z.infer<typeof salesOrderFormSchema>;

type TSalesOrderFormSchemaItem = TSalesOrderFormSchema["items"][number];

export type TSalesItem = TSalesOrderFormSchemaItem & {
  _id: string;
  totalPrice: number;
};

export type TSalesOrder = Omit<TSalesOrderFormSchema, "items"> & {
  items: TSalesItem[];
} & {
  _id: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
};
