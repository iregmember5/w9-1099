import axios from "axios";
import Cookies from "universal-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
} from "../utils/caseConvertor";
import appConfig from "../configs/app.config";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

/**
 * Function to get the authentication token from cookies
 */
export const getAuthToken = () => cookies.get("token") || "";

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = cookies.get("refreshToken");

  if (failedRequest.config?.url === "/api/auth/login/") {
    return Promise.reject(failedRequest);
  } else if (!refreshToken) {
    handleUnauthenticated();
    return Promise.reject(failedRequest);
  }

  try {
    const tokenRefreshResponse = await axios.post(
      `${appConfig.baseURL}/api/auth/token/refresh/`,
      { refresh: refreshToken }
    );
    const newToken = tokenRefreshResponse?.data?.access;
    cookies.set("token", newToken, { path: "/" });

    if (newToken) {
      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${newToken}`;
      return axios(failedRequest.response.config);
    } else {
      return Promise.reject("New token not received");
    }
  } catch (error) {
    handleUnauthenticated();
    return Promise.reject(error);
  }
};

const handleUnauthenticated = () => {
  cookies.remove("token", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
  localStorage.clear();
  window.location.href = "/signin";
};

/**
 * API client instance.
 */
export const apiClient = axios.create({
  baseURL: appConfig.baseURL,
});

// Create a separate Axios instance for user status checks
const userStatusApiClient = axios.create({
  baseURL: appConfig.baseURL,
});

createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

apiClient.interceptors.request.use(
  async (config) => {
    const authToken = getAuthToken();
    config.headers = config.headers || {};
    
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
      // Check if the user is blocked without triggering the interceptor
      try {
        const decoded: any = jwtDecode(authToken);
        const response = await userStatusApiClient.get(
          `/api/users/${decoded?.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.data.is_blocked) {
          handleUnauthenticated();
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    }

    // Only convert data if it exists and is not FormData
    if (config.data && !(config.data instanceof FormData)) {
      config.data = convertKeysToSnakeCase(config.data);
    }

    // Only convert params if they exist
    if (config.params && typeof config.params === "object") {
      config.params = convertKeysToSnakeCase(config.params);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // IMPORTANT: Don't convert blob responses to camelCase
    if (
      response.config.responseType === "blob" &&
      response.data instanceof Blob
    ) {
      console.log("Skipping case conversion for blob response");
      return response;
    }

    if (response.data) {
      response.data = convertKeysToCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      error.config?.url !== "/api/auth/login/"
    ) {
      handleUnauthenticated();
    } else if (
      error.response &&
      error.response.status === 401 &&
      error.config?.url !== "/api/auth/login/"
    ) {
      createAuthRefreshInterceptor(apiClient, refreshAuthLogic);
    }
    return Promise.reject(error);
  }
);

export default apiClient;