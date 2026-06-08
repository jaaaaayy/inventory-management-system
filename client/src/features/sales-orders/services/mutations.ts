import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TSalesOrderFormSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSalesOrder, updateSalesOrderStatus } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { TFormError } from "@/types";

export const useCreateSalesOrder = (
  reset: UseFormReset<TSalesOrderFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TSalesOrderFormSchema>
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSalesOrder,
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["salesOrders"] });
      navigate("/sales/orders");
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
          setFocus(firstErrorField as keyof TSalesOrderFormSchema);
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

export const useUpdateSalesOrderStatus = (
  id: string,
  setOpenCancelDialog?: Dispatch<SetStateAction<boolean>>,
  setOpenActionsDropdown?: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: string) => updateSalesOrderStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["salesOrders"] });
      queryClient.invalidateQueries({ queryKey: ["salesOrder", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenCancelDialog?.(false);
      setOpenActionsDropdown?.(false);
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    },
    onError: (error: TFormError) => {
      toast.error(error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });
};
