import { useQuery } from "@tanstack/react-query";
import {
  fetchProduct,
  // fetchProduct,
  fetchProductList,
} from "./api";

export const useFetchProductList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchProduct = (id?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) {
        throw new Error("No product id provided.");
      }

      return fetchProduct(id);
    },
    enabled: !!id,
  });

  return { isLoading, isPending, isError, error, data };
};
