import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TProductFormSchema, TProductUpdateFormSchema } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adjustStock, createProduct, deleteProduct, updateProduct } from "./api";
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
      toast.success(data.message);
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

      toast.error(error.message);
    },
  });
};

export const useUpdateProduct = (
  reset: UseFormReset<TProductUpdateFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TProductUpdateFormSchema>,
  id: string
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateProduct(formData, id),
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate("/products");
      toast.success(data.message);
    },
    onError: (error: TFormError) => {
      if (error.errors && Object.entries(error.errors).length > 0) {
        setFormError(error);

        const [firstErrorField] = Object.keys(error.errors);
        if (firstErrorField) {
          setFocus(firstErrorField as keyof TProductUpdateFormSchema);
        }

        return;
      }

      toast.error(error.message);
    },
  });
};

export const useAdjustStock = (
  id: string,
  setOpenAdjustDialog: Dispatch<SetStateAction<boolean>>,
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      type: "increase" | "decrease" | "set";
      quantity: number;
      reason?: string;
    }) => adjustStock(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["stockMovements", id] });
      setOpenAdjustDialog(false);
      setOpenActionsDropdown(false);
      toast.success(data.message);
    },
    onError: (error: TFormError) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProduct = (
  id: string,
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>,
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenDeleteDialog(false);
      setOpenActionsDropdown(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
