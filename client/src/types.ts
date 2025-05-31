import { TRegisterFormSchema } from "./features/auth/types";

export type TFormError = {
  message: string;
  errors?: Partial<
    Pick<TRegisterFormSchema, "email" | "username" | "mobileNumber">
  >;
};
