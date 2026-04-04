import { useQuery } from "@tanstack/react-query";
import { authStatus } from "./api";

export const useAuthStatus = () => {
  const { isLoading, isPending, isError, error, isSuccess, data, isFetching } =
    useQuery({
      queryKey: ["authStatus"],
      queryFn: authStatus,
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: 0,
    });

  return { isLoading, isPending, isError, error, isSuccess, data, isFetching };
};
