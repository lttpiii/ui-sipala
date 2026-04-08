import { API_BASE_URL, ENDPOINTS } from "../utils/constants.js";
import { setToken, setRefreshToken, setUser } from "../utils/auth.js";

export const authApi = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.code === 200 && data.result) {
      setToken(data.result.access_token);
      setRefreshToken(data.result.refresh_token);
      setUser(data.result.user);
      const { startTokenRefreshInterval } = await import("../utils/auth.js");
      startTokenRefreshInterval();
    }

    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REGISTER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  getProfile: async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.PROFILE}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  changePassword: async (passwordData) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.AUTH.CHANGE_PASSWORD}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      },
    );
    return response.json();
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (data.code === 200 && data.result) {
      setToken(data.result.access_token);
      setRefreshToken(data.result.refresh_token);
    }

    return data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const token = localStorage.getItem("access_token");

    try {
      await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
};
