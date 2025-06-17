import { useQuery } from "@tanstack/react-query";
import { fetchCustomer, fetchCustomerList } from "./api";

export const useFetchCustomerList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomerList,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchCustomer = (id?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => {
      if (!id) {
        throw new Error("No customer id provided.");
      }

      return fetchCustomer(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};
