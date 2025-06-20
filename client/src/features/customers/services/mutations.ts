import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TCustomerFormSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, deleteCustomer, updateCustomer } from "./api";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";
import { TFormError } from "@/types";

export const useCreateCustomer = (
  reset: UseFormReset<TCustomerFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TCustomerFormSchema>
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate("/sales/customers");
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
          setFocus(firstErrorField as keyof TCustomerFormSchema);
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

export const useUpdateCustomer = (
  reset: UseFormReset<TCustomerFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TCustomerFormSchema>,
  id: string
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TCustomerFormSchema) => updateCustomer(values, id),
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", id] });

      navigate("/sales/customers");
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
          setFocus(firstErrorField as keyof TCustomerFormSchema);
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

export const useDeleteCustomer = (
  id: string,
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>,
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCustomer(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
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
