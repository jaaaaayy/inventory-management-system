import { z } from "zod";
import { loginFormSchema, registerFormSchema } from "./schemas";

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
