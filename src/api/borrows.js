import { ENDPOINTS } from "../utils/constants.js";
import { apiRequest } from "../utils/auth.js";

export const borrowsApi = {
  // Get all borrows (admin/staff)
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${ENDPOINTS.BORROWS.LIST}${query ? `?${query}` : ""}`;
    return apiRequest(url);
  },

  // Get my borrows (borrower)
  // Get my borrows (borrower)
  // Get my borrows (borrower)
  getMyBorrows: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${ENDPOINTS.BORROWS.MY_BORROWS}${query ? `?${query}` : ""}`;
    return apiRequest(url); // Return langsung, tanpa modifikasi!
  },

  // Get borrow by ID
  getById: async (id) => {
    return apiRequest(ENDPOINTS.BORROWS.BY_ID(id));
  },

  // Create new borrow transaction (draft)
  create: async (data) => {
    return apiRequest(ENDPOINTS.BORROWS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Add item to borrow
  addItem: async (borrowId, itemData) => {
    return apiRequest(ENDPOINTS.BORROWS.ADD_ITEM(borrowId), {
      method: "POST",
      body: JSON.stringify(itemData),
    });
  },

  // Remove item from borrow
  removeItem: async (borrowId, itemId) => {
    return apiRequest(ENDPOINTS.BORROWS.REMOVE_ITEM(borrowId, itemId), {
      method: "DELETE",
    });
  },

  // Submit borrow for approval
  submit: async (id) => {
    return apiRequest(ENDPOINTS.BORROWS.SUBMIT(id), {
      method: "POST",
    });
  },
};
