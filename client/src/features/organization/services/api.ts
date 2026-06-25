import { API_URL } from "@/config/env";
import { TOrganizationFormSchema } from "../types";

export const fetchOrganization = async () => {
  const response = await fetch(`${API_URL}api/organization`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const updateOrganization = async (
  organization: TOrganizationFormSchema
) => {
  const response = await fetch(`${API_URL}api/organization`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(organization),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};
