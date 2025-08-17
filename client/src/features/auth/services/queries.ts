import { useQuery } from "@tanstack/react-query";
import { authStatus } from "./api";

export const useAuthStatus = () => {
  const { isLoading, isPending, isError, error, isSuccess, data } = useQuery({
    queryKey: ["authStatus"],
    queryFn: authStatus,
    refetchOnWindowFocus: false,
  });

  return { isLoading, isPending, isError, error, isSuccess, data };
};
