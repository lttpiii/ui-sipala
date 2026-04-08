// API Base URL - sesuaikan dengan backend kamu
export const API_BASE_URL = "http://localhost:8080";

// API Endpoints - SIPALA API Contract v1
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/v1/login",
    REGISTER: "/api/auth/v1/register",
    LOGOUT: "/api/auth/v1/logout",
    REFRESH: "/api/auth/v1/refresh-token",
    PROFILE: "/api/auth/v1/profile",
    CHANGE_PASSWORD: "/api/auth/v1/change-password",
  },
  USERS: {
    BASE: "/api/users/v1/users",
    LIST: "/api/users/v1/users",
    CREATE: "/api/users/v1/users",
    BY_ID: (id) => `/api/users/v1/users/${id}`,
    UPDATE: (id) => `/api/users/v1/users/${id}`,
    DELETE: (id) => `/api/users/v1/users/${id}`,
  },
  CATEGORIES: {
    BASE: "/api/categories/v1/categories",
    LIST: "/api/categories/v1/categories",
    CREATE: "/api/categories/v1/categories",
    BY_ID: (id) => `/api/categories/v1/categories/${id}`,
    UPDATE: (id) => `/api/categories/v1/categories/${id}`,
    DELETE: (id) => `/api/categories/v1/categories/${id}`,
  },
  TOOLS: {
    BASE: "/api/tools/v1/tools",
    LIST: "/api/tools/v1/tools",
    CREATE: "/api/tools/v1/tools",
    BY_ID: (id) => `/api/tools/v1/tools/${id}`,
    UPDATE: (id) => `/api/tools/v1/tools/${id}`,
    DELETE: (id) => `/api/tools/v1/tools/${id}`,
  },
  BORROWS: {
    BASE: "/api/borrows/v1/borrows",
    LIST: "/api/borrows/v1/borrows",
    CREATE: "/api/borrows/v1/borrows",
    BY_ID: (id) => `/api/borrows/v1/borrows/${id}`,
    MY_BORROWS: "/api/borrows/v1/borrows/my-borrows",
    ADD_ITEM: (id) => `/api/borrows/v1/borrows/${id}/items`,
    REMOVE_ITEM: (borrowId, itemId) =>
      `/api/borrows/v1/borrows/${borrowId}/items/${itemId}`,
    SUBMIT: (id) => `/api/borrows/v1/borrows/${id}/submit`,
  },
  APPROVALS: {
    BASE: "/api/approvals/v1",
    APPROVE: (id) => `/api/approvals/v1/borrows/${id}/approve`,
    REJECT: (id) => `/api/approvals/v1/borrows/${id}/reject`,
  },
  RETURNS: {
    BASE: "/api/returns/v1/returns",
    LIST: "/api/returns/v1/returns",
    CREATE: "/api/returns/v1/returns",
    BY_ID: (id) => `/api/returns/v1/returns/${id}`,
    CALCULATE_FINE: "/api/returns/v1/returns/calculate-fine",
  },
  MONITORING: {
    ACTIVE_BORROWS: "/api/monitoring/v1/active-borrows",
    OVERDUE_BORROWS: "/api/monitoring/v1/overdue-borrows",
  },
};

// App Routes
export const ROUTES = {
  LOGIN: "/login.html",
  REGISTER: "/register.html",
  DASHBOARD: "/dashboard.html",
  USERS: "/users.html",
  CATEGORIES: "/categories.html",
  TOOLS: "/tools.html",
  BORROWS: "/borrows.html",
  MY_BORROWS: "/my-borrows.html",
  APPROVALS: "/approvals.html",
  RETURNS: "/returns.html",
};

// Role Permissions
export const PERMISSIONS = {
  ADMIN: {
    routes: [
      "dashboard",
      "users",
      "categories",
      "tools",
      "borrows",
      "my-borrows",
      "approvals",
      "returns",
      "monitoring",
      "reports",
    ],
    canDelete: true,
  },
  STAFF: {
    routes: [
      "dashboard",
      "categories",
      "tools",
      "borrows",
      "my-borrows",
      "approvals",
      "returns",
      "monitoring",
      "reports",
    ],
    canDelete: false,
  },
  BORROWER: {
    routes: ["dashboard", "tools", "borrows", "my-borrows"],
    canDelete: false,
  },
};

// UI Constants
export const UI = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
  },
  BORROW_STATUS: {
    PENDING: { label: "Pending", class: "bg-yellow-100 text-yellow-800" },
    APPROVED: { label: "Approved", class: "bg-green-100 text-green-800" },
    REJECTED: { label: "Rejected", class: "bg-red-100 text-red-800" },
    RETURNED: { label: "Returned", class: "bg-blue-100 text-blue-800" },
  },
  ROLES: {
    ADMIN: { label: "Administrator", class: "bg-purple-100 text-purple-800" },
    STAFF: { label: "Staff", class: "bg-blue-100 text-blue-800" },
    BORROWER: { label: "Borrower", class: "bg-gray-100 text-gray-800" },
  },
};

// Helper functions
export const hasPermission = (role, route) => {
  return PERMISSIONS[role?.toUpperCase()]?.routes?.includes(route) ?? false;
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (amount) => {
  if (!amount) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};
