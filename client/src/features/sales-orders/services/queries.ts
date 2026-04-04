import { useQuery } from "@tanstack/react-query";
import { fetchSalesOrder, fetchSalesOrderList } from "./api";

export const useFetchSalesOrderList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["salesOrders"],
    queryFn: fetchSalesOrderList,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchSalesOrder = (id?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["salesOrder", id],
    queryFn: () => {
      if (!id) {
        throw new Error("No sales order id provided.");
      }

      return fetchSalesOrder(id);
    },
    enabled: !!id,
  });

  return { isLoading, isPending, isError, error, data };
};
