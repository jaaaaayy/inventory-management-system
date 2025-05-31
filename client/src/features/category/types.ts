import { z } from "zod";
import { categoryFormSchema } from "./schemas";

export type TCategoryFormSchema = z.infer<typeof categoryFormSchema>;

export type Category = {
  id: string;
  created_at: string;
  updated_at: string;
} & TCategoryFormSchema;
