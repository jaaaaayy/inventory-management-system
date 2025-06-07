import { UseFormReset } from "react-hook-form";
import { TVendorFormSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVendor, deleteVendor, updateVendor } from "./api";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";

export const useCreateVendor = (reset: UseFormReset<TVendorFormSchema>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createVendor,
    onSuccess: (data) => {
      reset();
      navigate("/vendors");
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });
};

export const useUpdateVendor = (
  reset: UseFormReset<TVendorFormSchema>,
  id: string
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: TVendorFormSchema) => updateVendor(values, id),
    onSuccess: (data) => {
      reset();
      navigate("/vendors");
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
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
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });
};
