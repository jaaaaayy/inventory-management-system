import { z } from "zod";
import { productFormSchema } from "./schemas";

export type TProductFormSchema = z.infer<typeof productFormSchema>;

export type TProduct = {
  _id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
} & TProductFormSchema;
