import { z } from "zod";
import { vendorFormSchema } from "./schemas";

export type TVendorFormSchema = z.infer<typeof vendorFormSchema>;

export type TVendor = {
  _id: string;
  created_at: string;
  updated_at: string;
} & TVendorFormSchema;
