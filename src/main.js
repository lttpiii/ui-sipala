import App from "./app.js";
import { startTokenRefreshInterval } from "./utils/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();

  // Start auto-refresh untuk user yang sudah login
  const token = localStorage.getItem("access_token");
  if (token) {
    startTokenRefreshInterval();
  }
});
