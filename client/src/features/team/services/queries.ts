import { useQuery } from "@tanstack/react-query";
import {
  fetchInvitationByToken,
  fetchInvitations,
  fetchMembers,
} from "./api";

export const useFetchMembers = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchInvitations = () => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["invitations"],
    queryFn: fetchInvitations,
  });

  return { isLoading, isPending, isError, error, data };
};

export const useFetchInvitationByToken = (token?: string) => {
  const { isLoading, isPending, isError, error, data } = useQuery({
    queryKey: ["invitation", token],
    queryFn: () => {
      if (!token) {
        throw new Error("No invitation token provided.");
      }

      return fetchInvitationByToken(token);
    },
    enabled: !!token,
    retry: false,
  });

  return { isLoading, isPending, isError, error, data };
};
