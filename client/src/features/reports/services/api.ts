import { API_URL } from "@/config/env";

export const fetchStockMovementsReport = async (
  from?: string,
  to?: string
) => {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const query = params.toString();

  const response = await fetch(
    `${API_URL}api/stock-movements${query ? `?${query}` : ""}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw await response.json();
  }

  const data = await response.json();
  return data;
};
