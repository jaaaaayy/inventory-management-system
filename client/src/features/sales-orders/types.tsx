import { z } from "zod";
import { salesOrderFormSchema } from "./schemas";
import { TCustomer } from "../customers/types";
import { TProduct } from "../products/types";

export type TSalesOrderFormSchema = z.infer<typeof salesOrderFormSchema>;

type TSalesOrderFormSchemaItem = TSalesOrderFormSchema["items"][number];

export type TSalesItem = Omit<TSalesOrderFormSchemaItem, "product"> & {
  _id: string;
  product: TProduct;
  totalPrice: number;
};

export type TSalesOrder = Omit<TSalesOrderFormSchema, "items" | "customer"> & {
  items: TSalesItem[];
} & {
  _id: string;
  customer: TCustomer;
  status: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
};
