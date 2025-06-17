import {
  addressSchema,
  commonUserInfoValidationSchema,
} from "@/shared/schemas";
import { z } from "zod";

export const customerFormSchema = z
  .object({
    address: addressSchema,
  })
  .merge(commonUserInfoValidationSchema);
