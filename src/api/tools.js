import { ENDPOINTS } from "../utils/constants.js";
import { apiRequest } from "../utils/auth.js";

export const toolsApi = {
  getAll: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== "",
      ),
    );

    const query = new URLSearchParams(cleanParams).toString();
    const url = `${ENDPOINTS.TOOLS.LIST}${query ? `?${query}` : ""}`;

    return apiRequest(url);
  },

  getById: async (id) => {
    return apiRequest(ENDPOINTS.TOOLS.BY_ID(id));
  },

  create: async (data) => {
    return apiRequest(ENDPOINTS.TOOLS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiRequest(ENDPOINTS.TOOLS.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiRequest(ENDPOINTS.TOOLS.DELETE(id), {
      method: "DELETE",
    });
  },
};
