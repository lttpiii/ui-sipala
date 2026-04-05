import { API_BASE_URL, ENDPOINTS } from "./constants.js";

// Token Management
export const setToken = (token) => localStorage.setItem("access_token", token);
export const getToken = () => localStorage.getItem("access_token");
export const removeToken = () => localStorage.removeItem("access_token");

export const setRefreshToken = (token) =>
  localStorage.setItem("refresh_token", token);
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const removeRefreshToken = () =>
  localStorage.removeItem("refresh_token");

// User Management
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

// Role Checks
export const isAdmin = () => getRole() === "admin";
export const isStaff = () => getRole() === "staff";
export const isBorrower = () => getRole() === "borrower";

// Logout
export const logout = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeToken();
    removeRefreshToken();
    removeUser();
    window.location.href = "../../public/login.html";
  }
};

// Check Authentication
export const checkAuth = () => {
  const token = getToken();
  const user = getUser();

  if (!token || !user.id) {
    window.location.href = "../../public/login.html";
    return false;
  }
  return true;
};

// Redirect if already logged in
export const redirectIfLoggedIn = () => {
  const token = getToken();
  const user = getUser();

  if (token && user.id) {
    window.location.href = "../../public/dashboard.html";
    return true;
  }
  return false;
};

// API Request Helper with Auth
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

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

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    throw new Error(data.message || "Request failed");
  }

  return data;
};
