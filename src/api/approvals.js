import { ENDPOINTS } from "../utils/constants.js";
import { apiRequest } from "../utils/auth.js";

export const approvalsApi = {
  // Approve borrow
  approve: async (borrowId) => {
    return apiRequest(ENDPOINTS.APPROVALS.APPROVE(borrowId), {
      method: "POST",
    });
  },

  // Reject borrow
  reject: async (borrowId, reason = "") => {
    return apiRequest(ENDPOINTS.APPROVALS.REJECT(borrowId), {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },
};
