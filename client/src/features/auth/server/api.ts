import { TFormError } from "@/types";
import { TLoginFormSchema, TRegisterFormSchema } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials: TLoginFormSchema) => {
  const response = await fetch(`${API_URL}api/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data: TFormError = await response.json();
  return data;
};

export const register = async (user: TRegisterFormSchema) => {
  const response = await fetch(`${API_URL}api/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data: TFormError = await response.json();
  return data;
};
