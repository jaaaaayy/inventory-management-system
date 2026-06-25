import { useQuery } from "@tanstack/react-query";
import { fetchOrganization } from "./api";

export const useFetchOrganization = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["organization"],
    queryFn: fetchOrganization,
  });

  return { isLoading, isPending, isError, error, data };
};
