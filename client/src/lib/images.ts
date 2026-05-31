import { API_URL } from "@/config/env";

export const getImageUrl = (imageUrl: string) => {
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `${API_URL}${imageUrl}`;
};

