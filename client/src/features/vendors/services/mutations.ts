import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TVendorFormSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVendor, deleteVendor, updateVendor } from "./api";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { TFormError } from "@/types";

export const useCreateVendor = (
  reset: UseFormReset<TVendorFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TVendorFormSchema>
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVendor,
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      navigate("/vendors");
      toast.success(data.message);
    },
    onError: (error: TFormError) => {
      if (error.errors && Object.entries(error.errors).length > 0) {
        setFormError(error);

        const [firstErrorField] = Object.keys(error.errors);
        if (firstErrorField) {
          setFocus(firstErrorField as keyof TVendorFormSchema);
        }

        return;
      }

      toast.error(error.message);
    },
  });
};

export const useUpdateVendor = (
  reset: UseFormReset<TVendorFormSchema>,
  id: string
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TVendorFormSchema) => updateVendor(values, id),
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["vendor", id] });
      navigate("/vendors");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteVendor = (
  id: string,
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>,
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteVendor(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      setOpenDeleteDialog(false);
      setOpenActionsDropdown(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
