import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TLoginFormSchema, TRegisterFormSchema } from "../types";
import { Dispatch, SetStateAction } from "react";
import { TFormError } from "@/types";

export const useLogin = (reset: UseFormReset<TLoginFormSchema>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      reset();
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      navigate("/dashboard", { replace: true });
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

export const useRegister = (
  reset: UseFormReset<TRegisterFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TRegisterFormSchema>
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      reset();
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      navigate("/dashboard", { replace: true });
    },
    onError: (error: TFormError) => {
      if (error.errors && Object.entries(error.errors).length > 0) {
        setFormError(error);

        const [firstErrorField] = Object.keys(error.errors);
        if (firstErrorField) {
          setFocus(firstErrorField as keyof TRegisterFormSchema);
        }

        return;
      }

      toast.error(error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });
};
