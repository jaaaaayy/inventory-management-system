import { UseFormReset } from "react-hook-form";
import { TSalesOrderFormSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSalesOrder } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useCreateSalesOrder = (
  reset: UseFormReset<TSalesOrderFormSchema>
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
