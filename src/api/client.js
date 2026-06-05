import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  const language = localStorage.getItem("language") || "ar";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-Language"] = language;

  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // This check must stay here
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}accounts/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = response.data.access;

        // Update the token
        localStorage.setItem("authToken", newAccessToken);

        // Update the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the request
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        // Log out
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isLoggedIn");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
