import { useQuery } from "@tanstack/react-query";
import { fetchStockMovementsReport } from "./api";

export const useFetchStockMovementsReport = (from?: string, to?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["stockMovementsReport", from, to],
    queryFn: () => fetchStockMovementsReport(from, to),
  });

  return { isLoading, isPending, isError, error, data };
};
