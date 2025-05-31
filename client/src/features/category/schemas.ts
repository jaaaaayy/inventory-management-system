import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .max(50, "Category must be at most 50 characters long."),
  description: z
    .string()
    .trim()
    .max(200, "Category must be at most 200 characters long."),
});
