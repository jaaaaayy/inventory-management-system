import { z } from "zod";
import { organizationFormSchema } from "./schemas";

export type TOrganizationFormSchema = z.infer<typeof organizationFormSchema>;

export type TOrganization = {
  _id: string;
  name: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
};
