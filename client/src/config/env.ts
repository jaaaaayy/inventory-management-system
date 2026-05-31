const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL environment variable is not defined.");
}

export const API_URL = `${new URL(apiUrl).origin}/`;
