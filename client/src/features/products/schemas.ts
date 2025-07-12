import { z } from "zod";

// Custom file validation function
const validateImageFile = (file: File | null) => {
  if (!file) return true; // Optional field
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return false;
  }
  
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};

export const productFormSchema = z.object({
  name: z.string().trim().max(100, "Name must be at most 100 characters long."),
  stockKeepingUnit: z
    .string()
    .trim()
    .max(50, "Description must be at most 50 characters long."),
  costPrice: z.coerce
    .number()
    .positive({ message: "Cost price must be greater than 0." })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Cost price must have up to 2 decimal places",
    }),
  sellingPrice: z.coerce
    .number()
    .positive({ message: "Selling price must be greater than 0." })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Selling price must have up to 2 decimal places",
    }),
  unit: z.string().trim().max(10, "Unit must be at most 10 characters long."),
  quantity: z.coerce
    .number()
    .int({ message: "Quantity must be an integer." })
    .positive({ message: "Quantity must be greater than 0." }),
  category: z.string().trim(),
  vendor: z.string().trim(),
  image: z
    .any()
    .refine(validateImageFile, {
      message: "Please upload a valid image file (JPG, PNG, GIF, WebP) under 5MB"
    })
    .optional(),
});
