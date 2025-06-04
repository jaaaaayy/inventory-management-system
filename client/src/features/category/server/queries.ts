import { useQuery } from "@tanstack/react-query";
import { fetchCategory, fetchCategoryList } from "./api";

export const useFetchCategoryList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryList,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchCategory = (id?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["category", id],
    queryFn: () => {
      if (!id) {
        throw new Error("No category id provided.");
      }

      return fetchCategory(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};
