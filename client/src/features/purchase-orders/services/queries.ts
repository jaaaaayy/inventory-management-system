import { useQuery } from "@tanstack/react-query";
import { fetchPurchaseOrder, fetchPurchaseOrderList } from "./api";

export const useFetchPurchaseOrderList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: fetchPurchaseOrderList,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchPurchaseOrder = (id?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["purchaseOrder", id],
    queryFn: () => {
      if (!id) {
        throw new Error("No purchase order id provided.");
      }

      return fetchPurchaseOrder(id);
    },
    enabled: !!id,
  });

  return { isLoading, isPending, isError, error, data };
};
