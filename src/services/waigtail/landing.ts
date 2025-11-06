import type { LandingPageData, ApiResponse } from "../../types/landing";

// API Service
export const fetchLandingPageData = async (): Promise<LandingPageData> => {
  try {
    const isDevelopment = import.meta.env.DEV;
    const frontendUrl = isDevelopment
      ? "http://localhost:5173"
      : "https://w9-1099.vercel.app";

    const apiUrl = isDevelopment
      ? "/blogs/api/v2/mypages/"
      : "https://esign-admin.signmary.com/blogs/api/v2/mypages/";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch landing page data: ${response.status} ${response.statusText}`
      );
    }

    const data: ApiResponse = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      throw new Error("No landing page data available");
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};
