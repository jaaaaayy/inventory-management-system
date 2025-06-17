import { z } from "zod";
import { categoryFormSchema } from "./schemas";

export type TCategoryFormSchema = z.infer<typeof categoryFormSchema>;

export type TCategory = {
  _id: string;
  createdAt: string;
  updatedAt: string;
} & TCategoryFormSchema;
