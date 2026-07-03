import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { updateOrganization } from "./api";
import { TOrganizationFormSchema } from "../types";

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUser();

  return useMutation({
    mutationFn: (organization: TOrganizationFormSchema) =>
      updateOrganization(organization),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organization"] });

      if (user?.organization) {
        setUser({
          ...user,
          organization: { ...user.organization, name: data.organization.name },
        });
      }

      toast.success(data.message);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });
};
