import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "@/hooks/use-user";
import {
  acceptInvitation,
  createInvitation,
  removeMember,
  revokeInvitation,
  updateMember,
} from "./api";
import {
  TAcceptInviteFormSchema,
  TInviteFormSchema,
  TTeamFormError,
} from "../types";

const successStyle = { style: { backgroundColor: "green", color: "white" } };
const errorStyle = { style: { backgroundColor: "red", color: "white" } };

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      update,
    }: {
      id: string;
      update: { position?: string; status?: "Active" | "Inactive" };
    }) => updateMember(id, update),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success(data.message, successStyle);
    },
    onError: (error: TTeamFormError) => {
      toast.error(error.message, errorStyle);
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeMember(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success(data.message, successStyle);
    },
    onError: (error: TTeamFormError) => {
      toast.error(error.message, errorStyle);
    },
  });
};

export const useCreateInvitation = (
  setFormError: Dispatch<SetStateAction<TTeamFormError | null>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invite: TInviteFormSchema) => createInvitation(invite),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success(data.message, successStyle);
    },
    onError: (error: TTeamFormError) => {
      if (error.errors && Object.keys(error.errors).length > 0) {
        setFormError(error);
        return;
      }

      toast.error(error.message, errorStyle);
    },
  });
};

export const useRevokeInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => revokeInvitation(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success(data.message, successStyle);
    },
    onError: (error: TTeamFormError) => {
      toast.error(error.message, errorStyle);
    },
  });
};

export const useAcceptInvitation = (
  token: string | undefined,
  setFormError: Dispatch<SetStateAction<TTeamFormError | null>>
) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  return useMutation({
    mutationFn: (payload: TAcceptInviteFormSchema) => {
      if (!token) {
        throw new Error("No invitation token provided.");
      }

      return acceptInvitation(token, payload);
    },
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/dashboard", { replace: true });
      toast.success(data.message, successStyle);
    },
    onError: (error: TTeamFormError) => {
      if (error.errors && Object.keys(error.errors).length > 0) {
        setFormError(error);
        return;
      }

      toast.error(error.message, errorStyle);
    },
  });
};
