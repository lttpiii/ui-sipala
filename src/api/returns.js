import { ENDPOINTS } from "../utils/constants.js";
import { apiRequest } from "../utils/auth.js";

export const returnsApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${ENDPOINTS.RETURNS.LIST}${query ? `?${query}` : ""}`;
    return apiRequest(url);
  },

  getById: async (id) => {
    return apiRequest(ENDPOINTS.RETURNS.BY_ID(id));
  },

  create: async (data) => {
    return apiRequest(ENDPOINTS.RETURNS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  calculateFine: async (borrowTransactionId) => {
    return apiRequest(ENDPOINTS.RETURNS.CALCULATE_FINE, {
      method: "POST",
      body: JSON.stringify({ borrow_transaction_id: borrowTransactionId }),
    });
  },
};
