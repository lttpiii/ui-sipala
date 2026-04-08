import { API_BASE_URL, ENDPOINTS } from "./constants.js";

// ==================== STATE MANAGEMENT ====================
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// ==================== TOKEN MANAGEMENT ====================
export const setToken = (token) => localStorage.setItem("access_token", token);
export const getToken = () => localStorage.getItem("access_token");
export const removeToken = () => localStorage.removeItem("access_token");

export const setRefreshToken = (token) =>
  localStorage.setItem("refresh_token", token);
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const removeRefreshToken = () =>
  localStorage.removeItem("refresh_token");

// ==================== USER MANAGEMENT ====================
export const setUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};
export const removeUser = () => localStorage.removeItem("user");

export const getRole = () => getUser().role || null;
export const getUserId = () => getUser().id || null;

// ==================== ROLE CHECKS ====================
export const isAdmin = () => getRole() === "admin";
export const isStaff = () => getRole() === "staff";
export const isBorrower = () => getRole() === "borrower";

// ==================== LOGOUT ====================
export const logout = async () => {
  try {
    const refreshToken = getRefreshToken();
    const token = getToken();

    if (refreshToken && token) {
      await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    cleanupAndRedirect();
  }
};

const cleanupAndRedirect = () => {
  removeToken();
  removeRefreshToken();
  removeUser();
  isRefreshing = false;
  refreshSubscribers = [];
  window.location.href = "../../public/login.html";
};

// ==================== TOKEN REFRESH LOGIC ====================
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (data.code === 200 && data.result) {
      setToken(data.result.access_token);
      setRefreshToken(data.result.refresh_token);
      return data.result.access_token;
    } else {
      throw new Error(data.message || "Failed to refresh token");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

// ==================== ENHANCED API REQUEST ====================
export const apiRequest = async (endpoint, options = {}) => {
  const makeRequest = async (token) => {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    return response;
  };

  // First attempt with current token
  let token = getToken();
  let response = await makeRequest(token);
  let data = await response.json();

  // If 401, try to refresh token
  if (response.status === 401) {
    // Jika sedang refresh, tunggu hasilnya
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          resolve(makeRequest(newToken).then((r) => r.json()));
        });
      });
    }

    // Mulai proses refresh
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      isRefreshing = false;
      onRefreshed(newToken);

      // Retry request dengan token baru
      response = await makeRequest(newToken);
      data = await response.json();
    } catch (refreshError) {
      isRefreshing = false;
      cleanupAndRedirect();
      throw new Error("Session expired. Please login again.");
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

// ==================== AUTH CHECKS ====================
export const checkAuth = () => {
  const token = getToken();
  const user = getUser();

  if (!token || !user.id) {
    window.location.href = "../../public/login.html";
    return false;
  }
  return true;
};

export const redirectIfLoggedIn = () => {
  const token = getToken();
  const user = getUser();

  if (token && user.id) {
    window.location.href = "../../public/dashboard.html";
    return true;
  }
  return false;
};

// ==================== AUTO REFRESH INTERVAL ====================
// Refresh token 1 menit sebelum expire (asumsi token 30 menit)
const TOKEN_REFRESH_INTERVAL = 29 * 60 * 1000; // 29 menit

export const startTokenRefreshInterval = () => {
  // Clear existing interval jika ada
  if (window.tokenRefreshInterval) {
    clearInterval(window.tokenRefreshInterval);
  }

  window.tokenRefreshInterval = setInterval(async () => {
    const token = getToken();
    if (!token) return;

    try {
      // Decode JWT untuk cek expiration
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expTime = payload.exp * 1000;
      const currentTime = Date.now();

      // Refresh jika kurang dari 2 menit lagi expire
      if (expTime - currentTime < 2 * 60 * 1000) {
        console.log("Proactive token refresh...");
        await refreshAccessToken();
      }
    } catch (e) {
      console.error("Token decode error:", e);
    }
  }, 60000); // Check setiap 1 menit
};

export const stopTokenRefreshInterval = () => {
  if (window.tokenRefreshInterval) {
    clearInterval(window.tokenRefreshInterval);
  }
};
