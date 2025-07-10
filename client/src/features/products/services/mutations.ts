import { UseFormReset } from "react-hook-form";
import { TProductFormSchema } from "../types";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "./api";
import { toast } from "sonner";

export const useCreateProduct = (reset: UseFormReset<TProductFormSchema>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
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
    onError: (error) => {
      toast.error(error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });
};
