import { TRegisterFormSchema } from "./features/auth/types";
import { TProductFormSchema } from "./features/products/types";

export type TFormError = {
  message: string;
  errors?: Partial<
    Pick<TRegisterFormSchema, "email" | "username" | "mobileNumber"> &
      Pick<TProductFormSchema, "stockKeepingUnit"> & {
        orderDate?: string;
        deliveryDate?: string;
      }
  >;
};
