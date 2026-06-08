import { TPurchaseOrderFormSchema } from "../types";

import { API_URL } from "@/config/env";

export const fetchPurchaseOrderList = async () => {
  const response = await fetch(`${API_URL}api/purchase/orders`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const createPurchaseOrder = async (
  purchaseOrder: TPurchaseOrderFormSchema
) => {
  const response = await fetch(`${API_URL}api/purchase/orders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchaseOrder),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const fetchPurchaseOrder = async (id: string) => {
  const response = await fetch(`${API_URL}api/purchase/orders/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const updatePurchaseOrderStatus = async (
  id: string,
  status: string
) => {
  const response = await fetch(`${API_URL}api/purchase/orders/${id}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};
