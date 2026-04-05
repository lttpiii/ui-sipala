import { getUser, logout, isAdmin, isStaff } from "../utils/auth.js";
import { formatDate } from "../utils/constants.js";

export const Navbar = {
  render() {
    const user = getUser();

    return `
      <nav class="bg-white shadow-sm border-b border-gray-200 fixed w-full z-30 top-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <button id="sidebar-toggle" class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <a href="/dashboard.html" class="ml-2 lg:ml-0 flex items-center">
                <span class="text-xl font-bold text-primary-600">SIPALA</span>
              </a>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <span>${formatDate(new Date())}</span>
              </div>
              
              <div class="relative" id="user-menu-container">
                <button id="user-menu-button" class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
                  <div class="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                    ${user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div class="hidden md:block text-left">
                    <p class="text-sm font-medium text-gray-900">${user.name || "User"}</p>
                    <p class="text-xs text-gray-500 capitalize">${user.role || "guest"}</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <a href="/profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-user mr-2"></i> Profile
                  </a>
                  <button onclick="window.logoutHandler()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <i class="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  },

  init() {
    // Toggle user dropdown
    const userMenuBtn = document.getElementById("user-menu-button");
    const userDropdown = document.getElementById("user-dropdown");

    if (userMenuBtn) {
      userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle("hidden");
      });

      document.addEventListener("click", () => {
        userDropdown.classList.add("hidden");
      });
    }

    // Logout handler
    window.logoutHandler = async () => {
      if (confirm("Apakah Anda yakin ingin logout?")) {
        await logout();
      }
    };
  },
};
