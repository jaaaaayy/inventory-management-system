import { z } from "zod";
import { productFormSchema, productUpdateFormSchema } from "./schemas";

export type TProductFormSchema = z.infer<typeof productFormSchema>;

export type TProductUpdateFormSchema = z.infer<typeof productUpdateFormSchema>;

export type TProduct = {
  _id: string;
  imageUrl: string;
  categoryId: string;
  vendorId: string;
  lastStockUpdate: string;
  createdAt: string;
  updatedAt: string;
} & TProductFormSchema;

export type TStockMovement = {
  _id: string;
  type: "Sale" | "Sale Cancelled" | "Purchase" | "Adjustment";
  delta: number;
  quantityAfter: number;
  reason: string;
  user: { firstName: string; lastName: string } | null;
  referenceType: "SalesOrder" | "PurchaseOrder" | "Manual";
  createdAt: string;
};
