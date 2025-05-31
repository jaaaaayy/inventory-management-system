import { TFormError } from "@/features/types";
import { TLoginFormSchema } from "../types";

export const login = async (credentials: TLoginFormSchema) => {
  const API_URL = import.meta.env.VITE_API_URL;

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
