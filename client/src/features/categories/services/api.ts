import { TCategoryFormSchema } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCategoryList = async () => {
  const response = await fetch(`${API_URL}api/categories`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const fetchCategory = async (id: string) => {
  const response = await fetch(`${API_URL}api/categories/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const createCategory = async (category: TCategoryFormSchema) => {
  const response = await fetch(`${API_URL}api/categories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const updateCategory = async (
  category: TCategoryFormSchema,
  id: string
) => {
  const response = await fetch(`${API_URL}api/categories/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const deleteCategory = async (id: string) => {
  const response = await fetch(`${API_URL}api/categories/${id}`, {
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
