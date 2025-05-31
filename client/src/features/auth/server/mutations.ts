import { useMutation } from "@tanstack/react-query";
import { login } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { UseFormReset } from "react-hook-form";
import { TLoginFormSchema, TRegisterFormSchema } from "../types";

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

export const useRegister = (reset: UseFormReset<TRegisterFormSchema>) => {
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
