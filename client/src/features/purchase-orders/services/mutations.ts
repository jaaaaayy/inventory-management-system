import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TPurchaseOrderFormSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPurchaseOrder, updatePurchaseOrderStatus } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { TFormError } from "@/types";

export const useCreatePurchaseOrder = (
  reset: UseFormReset<TPurchaseOrderFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TPurchaseOrderFormSchema>
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurchaseOrder,
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
      navigate("/purchase/orders");
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
          setFocus(firstErrorField as keyof TPurchaseOrderFormSchema);
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

export const useUpdatePurchaseOrderStatus = (
  id: string,
  setOpenDialog?: Dispatch<SetStateAction<boolean>>,
  setOpenActionsDropdown?: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: string) => updatePurchaseOrderStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
      queryClient.invalidateQueries({ queryKey: ["purchaseOrder", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenDialog?.(false);
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
