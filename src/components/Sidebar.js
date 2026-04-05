import { getRole, isAdmin, isStaff, isBorrower } from "../utils/auth.js";
import { PERMISSIONS } from "../utils/constants.js";

export const Sidebar = {
  getMenuItems() {
    const role = getRole();
    const items = [];

    // Dashboard - All roles
    items.push({
      icon: '<i class="fas fa-home w-5"></i>',
      label: "Dashboard",
      href: "../../public/dashboard.html",
      active: location.pathname.includes("dashboard"),
    });

    if (isAdmin() || isStaff()) {
      // Users - Admin only
      if (isAdmin()) {
        items.push({
          icon: '<i class="fas fa-users w-5"></i>',
          label: "Users",
          href: "../../public/users.html",
          active: location.pathname.includes("users"),
        });
      }

      // Categories
      items.push({
        icon: '<i class="fas fa-tags w-5"></i>',
        label: "Categories",
        href: "../../public/categories.html",
        active: location.pathname.includes("categories"),
      });

      // Tools
      items.push({
        icon: '<i class="fas fa-tools w-5"></i>',
        label: "Tools",
        href: "../../public/tools.html",
        active: location.pathname.includes("tools"),
      });

      // All Borrows
      items.push({
        icon: '<i class="fas fa-clipboard-list w-5"></i>',
        label: "All Borrows",
        href: "../../public/borrows.html",
        active: location.pathname === "/borrows.html",
      });

      // Approvals
      items.push({
        icon: '<i class="fas fa-check-circle w-5"></i>',
        label: "Approvals",
        href: "../../public/approvals.html",
        active: location.pathname.includes("approvals"),
      });

      // Returns
      items.push({
        icon: '<i class="fas fa-undo w-5"></i>',
        label: "Returns",
        href: "../../public/returns.html",
        active: location.pathname.includes("returns"),
      });
    }

    if (isBorrower()) {
      // Tools (view only)
      items.push({
        icon: '<i class="fas fa-tools w-5"></i>',
        label: "Browse Tools",
        href: "../../public/tools.html",
        active: location.pathname.includes("tools"),
      });

      // My Borrows
      items.push({
        icon: '<i class="fas fa-clipboard-list w-5"></i>',
        label: "My Borrows",
        href: "../../public/my-borrows.html",
        active: location.pathname.includes("my-borrows"),
      });

      // Create Borrow
      items.push({
        icon: '<i class="fas fa-plus-circle w-5"></i>',
        label: "New Borrow",
        href: "../../public/borrows.html",
        active: location.pathname === "../../public/borrows.html",
      });
    }

    return items;
  },

  render() {
    const menuItems = this.getMenuItems();

    return `
      <aside id="sidebar" class="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-20 overflow-y-auto">
        <div class="p-4">
          <nav class="space-y-1">
            ${menuItems
              .map(
                (item) => `
              <a href="${item.href}" class="sidebar-link ${item.active ? "active" : ""}">
                ${item.icon}
                <span class="ml-3">${item.label}</span>
              </a>
            `,
              )
              .join("")}
          </nav>
        </div>
        
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div class="text-xs text-gray-500 text-center">
            SIPALA v1.0
          </div>
        </div>
      </aside>
      
      <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-10 hidden lg:hidden"></div>
    `;
  },

  init() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const toggleBtn = document.getElementById("sidebar-toggle");

    const toggleSidebar = () => {
      sidebar.classList.toggle("-translate-x-full");
      overlay.classList.toggle("hidden");
    };

    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleSidebar);
    }

    if (overlay) {
      overlay.addEventListener("click", toggleSidebar);
    }
  },
};
