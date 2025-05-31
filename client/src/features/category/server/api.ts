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
