import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TProductFormSchema } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "./api";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { TFormError } from "@/types";

export const useCreateProduct = (
  reset: UseFormReset<TProductFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TProductFormSchema>
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    },
    onError: (error: TFormError) => {
      if (error.errors && Object.entries(error.errors).length > 0) {
        setFormError(error);

        const [firstErrorField] = Object.keys(error.errors);
        if (firstErrorField) {
          setFocus(firstErrorField as keyof TProductFormSchema);
        }

        return;
      }

      toast.error(error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });
};
