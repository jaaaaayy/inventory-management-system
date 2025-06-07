import { TVendorFormSchema } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchVendorList = async () => {
  const response = await fetch(`${API_URL}api/vendors`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const fetchVendor = async (id: string) => {
  const response = await fetch(`${API_URL}api/vendors/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const createVendor = async (vendor: TVendorFormSchema) => {
  const response = await fetch(`${API_URL}api/vendors`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(vendor),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const updateVendor = async (vendor: TVendorFormSchema, id: string) => {
  const response = await fetch(`${API_URL}api/vendors/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(vendor),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};

export const deleteVendor = async (id: string) => {
  const response = await fetch(`${API_URL}api/vendors/${id}`, {
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
