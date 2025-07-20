const API_URL = import.meta.env.VITE_API_URL;

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

// export const updateProduct = async (
//   product: TProductFormSchema,
//   id: string
// ) => {
//   const response = await fetch(`${API_URL}api/products/${id}`, {
//     method: "PATCH",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(product),
//   });

//   if (!response.ok) {
//     throw await response.json();
//   }

//   const data = await response.json();
//   return data;
// };

// export const deleteProduct = async (id: string) => {
//   const response = await fetch(`${API_URL}api/products/${id}`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw await response.json();
//   }

//   const data = await response.json();
//   return data;
// };
