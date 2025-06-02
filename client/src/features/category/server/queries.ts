import { useQuery } from "@tanstack/react-query";
import { fetchCategoryList } from "./api";

export const useFetchCategoryList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryList,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};
