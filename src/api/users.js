import { ENDPOINTS } from "../utils/constants.js";
import { apiRequest } from "../utils/auth.js";

export const usersApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${ENDPOINTS.USERS.LIST}${query ? `?${query}` : ""}`;
    return apiRequest(url);
  },

  getById: async (id) => {
    return apiRequest(ENDPOINTS.USERS.BY_ID(id));
  },

  create: async (userData) => {
    return apiRequest(ENDPOINTS.USERS.CREATE, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  update: async (id, userData) => {
    return apiRequest(ENDPOINTS.USERS.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  delete: async (id) => {
    return apiRequest(ENDPOINTS.USERS.DELETE(id), {
      method: "DELETE",
    });
  },
};
