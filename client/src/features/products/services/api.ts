import { API_URL } from "@/config/env";

export const fetchProductList = async () => {
  const response = await fetch(`${API_URL}api/products`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const fetchProduct = async (id: string) => {
  const response = await fetch(`${API_URL}api/products/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const createProduct = async (formData: FormData) => {
  const response = await fetch(`${API_URL}api/products`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const updateProduct = async (formData: FormData, id: string) => {
  const response = await fetch(`${API_URL}api/products/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}api/products/${id}`, {
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
