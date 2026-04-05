import { checkAuth, getUser } from "./utils/auth.js";
import { hasPermission } from "./utils/constants.js";

class App {
  constructor() {
    this.currentPage = this.getCurrentPage();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "");
    return page || "dashboard";
  }

  init() {
    // Check auth for protected pages
    const publicPages = ["login", "register", "index"];

    if (!publicPages.includes(this.currentPage)) {
      if (!checkAuth()) {
        return;
      }

      // Check page permission
      const user = getUser();
      if (!hasPermission(user.role, this.currentPage)) {
        window.location.href = "../public/dashboard.html";
        return;
      }
    }

    // Initialize common components
    this.initCommon();
  }

  initCommon() {
    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      const dropdowns = document.querySelectorAll('[id$="-dropdown"]');
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target) && !e.target.closest("button")) {
          dropdown.classList.add("hidden");
        }
      });
    });
  }
}

export default App;
