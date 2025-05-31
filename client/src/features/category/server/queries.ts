import { useQuery } from "@tanstack/react-query";
import { fetchCategoryList } from "./api";

export const useFetchCategoryList = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryList,
    refetchOnWindowFocus: false,
  });

  return { data };
};
