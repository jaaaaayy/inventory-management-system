import { UseFormReset } from "react-hook-form";
import { TCategoryFormSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, updateCategory } from "./api";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export const useCreateCategory = (reset: UseFormReset<TCategoryFormSchema>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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

export const useUpdateCategory = (
  reset: UseFormReset<TCategoryFormSchema>,
  id: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TCategoryFormSchema) => updateCategory(values, id),
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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

export const useDeleteCategory = (
  id: string,
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>,
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpenDeleteDialog(false);
      setOpenActionsDropdown(false);
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
