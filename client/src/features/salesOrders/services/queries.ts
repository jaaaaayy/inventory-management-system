import { useQuery } from "@tanstack/react-query";
import { fetchSalesOrderList } from "./api";

export const useFetchSalesOrderList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["salesOrders"],
    queryFn: fetchSalesOrderList,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};
