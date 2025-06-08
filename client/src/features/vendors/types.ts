import { z } from "zod";
import { vendorFormSchema } from "./schemas";

export type TVendorFormSchema = z.infer<typeof vendorFormSchema>;

export type TVendor = {
  _id: string;
  createdAt: string;
  updatedAt: string;
} & TVendorFormSchema;
