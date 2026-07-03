import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UseFormReset, UseFormSetFocus } from "react-hook-form";
import { TLoginFormSchema, TRegisterFormSchema } from "../types";
import { Dispatch, SetStateAction } from "react";
import { TFormError } from "@/types";
import { useUser } from "@/hooks/use-user";

export const useLogin = (reset: UseFormReset<TLoginFormSchema>) => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      reset();
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRegister = (
  reset: UseFormReset<TRegisterFormSchema>,
  setFormError: Dispatch<SetStateAction<TFormError | null>>,
  setFocus: UseFormSetFocus<TRegisterFormSchema>
) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      reset();
      setUser(data.user);

      navigate("/dashboard", { replace: true });
      toast.success(data.message);
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

      toast.error(error.message);
    },
  });
};

export const useLogout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      localStorage.clear();
      setUser(null);
      queryClient.clear();
      toast.success(data.message);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
