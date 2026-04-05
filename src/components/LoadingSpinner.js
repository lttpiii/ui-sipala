export const LoadingSpinner = {
  show(containerId = "loading-overlay") {
    let overlay = document.getElementById(containerId);

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = containerId;
      overlay.className =
        "fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center";
      overlay.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p class="text-gray-600">Loading...</p>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    overlay.style.display = "flex";
  },

  hide(containerId = "loading-overlay") {
    const overlay = document.getElementById(containerId);
    if (overlay) {
      overlay.style.display = "none";
    }
  },

  // Small inline spinner
  inline() {
    return `<div class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>`;
  },
};
