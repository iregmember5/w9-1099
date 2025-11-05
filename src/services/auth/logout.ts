import { apiClient } from "../config";

async function logout() {
  // Use a simple axios call without the interceptor for logout
  const res = await apiClient.get("/api/auth/logout", {
    // Skip interceptors for logout to avoid data transformation issues
    transformRequest: [(data, headers) => {
      // Clear the authorization header
      delete headers['Authorization'];
      return data;
    }]
  });
  return res.data;
}

// Alternative simplified logout that doesn't use the apiClient
export const simpleLogout = async (): Promise<void> => {
  const token = localStorage.getItem('token') || '';
  
  try {
    await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/logout`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout API error:', error);
    // Don't throw error for logout - we want to clear local state regardless
  }
};

export default logout;