import { useQuery } from "@tanstack/react-query";
import { fetchVendor, fetchVendorList } from "./api";

export const useFetchVendorList = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendorList,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchVendor = (id?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => {
      if (!id) {
        throw new Error("No vendor id provided.");
      }

      return fetchVendor(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, data };
};
