import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Base API URL - should be moved to environment variables in a real app
const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized responses (expired/invalid token)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Create a service object with typed methods for API endpoints
const apiService = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string): Promise<AxiosResponse<any>> =>
      apiClient.post("/user/login", { email, password }),

    register: (userData: any): Promise<AxiosResponse<any>> =>
      apiClient.post("/user/register", userData),

    getProfile: (): Promise<AxiosResponse<any>> =>
      apiClient.get("/user/getProfile"),
  },

  // Utility to check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem("token") !== null;
  },

  // Logout utility
  logout: (): void => {
    localStorage.removeItem("token");
  },

  // Generic request methods with authentication
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.get(url, config);
  },

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post(url, data, config);
  },

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put(url, data, config);
  },

  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.delete(url, config);
  },
};

export default apiService;
