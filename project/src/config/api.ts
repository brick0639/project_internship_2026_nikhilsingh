export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "https://projectinternship2026nikhilsingh-production.up.railway.app/").replace(/\/$/, "");

export const getApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
