import { getRole, hasPermission as checkPermission } from "./auth.js";
import { PERMISSIONS } from "./constants.js";

// Navigation guard
export const requireAuth = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.href = "../../public/login.html";
    return false;
  }
  return true;
};

// Check page permission
export const checkPagePermission = (pageName) => {
  const role = getRole();
  if (!role || !checkPermission(role, pageName)) {
    window.location.href = "../../public/dashboard.html";
    return false;
  }
  return true;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate query string
export const buildQueryString = (params) => {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
  return query ? `?${query}` : "";
};

// File download helper
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
