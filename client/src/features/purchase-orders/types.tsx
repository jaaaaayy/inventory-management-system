import { z } from "zod";
import { purchaseOrderFormSchema } from "./schemas";
import { TVendor } from "../vendors/types";
import { TProduct } from "../products/types";

export type TPurchaseOrderFormSchema = z.infer<typeof purchaseOrderFormSchema>;

type TPurchaseOrderFormSchemaItem = TPurchaseOrderFormSchema["items"][number];

export type TPurchaseItem = Omit<TPurchaseOrderFormSchemaItem, "product"> & {
  _id: string;
  product: TProduct;
  totalPrice: number;
};

export type TPurchaseOrder = Omit<
  TPurchaseOrderFormSchema,
  "items" | "vendor"
> & {
  items: TPurchaseItem[];
} & {
  _id: string;
  vendor: TVendor;
  status: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
};
