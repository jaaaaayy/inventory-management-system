import { TCustomerFormSchema } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCustomerList = async () => {
  const response = await fetch(`${API_URL}api/customers`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const fetchCustomer = async (id: string) => {
  const response = await fetch(`${API_URL}api/customers/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const createCustomer = async (customer: TCustomerFormSchema) => {
  const response = await fetch(`${API_URL}api/customers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const updateCustomer = async (
  customer: TCustomerFormSchema,
  id: string
) => {
  const response = await fetch(`${API_URL}api/customers/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const deleteCustomer = async (id: string) => {
  const response = await fetch(`${API_URL}api/customers/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};
