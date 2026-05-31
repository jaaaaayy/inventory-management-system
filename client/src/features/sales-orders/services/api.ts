import { TSalesOrderFormSchema } from "../types";

import { API_URL } from "@/config/env";

export const fetchSalesOrderList = async () => {
  const response = await fetch(`${API_URL}api/sales/orders`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const createSalesOrder = async (salesOrder: TSalesOrderFormSchema) => {
  const response = await fetch(`${API_URL}api/sales/orders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salesOrder),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const fetchSalesOrder = async (id: string) => {
  const response = await fetch(`${API_URL}api/sales/orders/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};
