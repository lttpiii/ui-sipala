import { ENDPOINTS } from "../utils/constants.js";
import { apiRequest } from "../utils/auth.js";

export const categoriesApi = {
  getAll: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== "",
      ),
    );

    const query = new URLSearchParams(cleanParams).toString();
    const url = `${ENDPOINTS.CATEGORIES.LIST}${query ? `?${query}` : ""}`;

    return apiRequest(url);
  },

  getById: async (id) => {
    return apiRequest(ENDPOINTS.CATEGORIES.BY_ID(id));
  },

  create: async (data) => {
    return apiRequest(ENDPOINTS.CATEGORIES.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiRequest(ENDPOINTS.CATEGORIES.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiRequest(ENDPOINTS.CATEGORIES.DELETE(id), {
      method: "DELETE",
    });
  },
};
