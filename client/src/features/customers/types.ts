import { z } from "zod";
import { customerFormSchema } from "./schemas";

export type TCustomerFormSchema = z.infer<typeof customerFormSchema>;

export type TCustomer = {
  _id: string;
  createdAt: string;
  updatedAt: string;
} & TCustomerFormSchema;
