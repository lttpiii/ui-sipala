class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    if (!document.getElementById("toast-container")) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "fixed top-4 right-4 z-50 flex flex-col gap-2";
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById("toast-container");
    }
  }

  show(message, type = "success", duration = 3000) {
    const toast = document.createElement("div");

    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };

    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };

    toast.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 translate-x-full opacity-0`;
    toast.innerHTML = `
      <span class="font-bold">${icons[type]}</span>
      <span>${message}</span>
    `;

    this.container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove("translate-x-full", "opacity-0");
    });

    // Remove after duration
    setTimeout(() => {
      toast.classList.add("translate-x-full", "opacity-0");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }

  success(message, duration) {
    this.show(message, "success", duration);
  }

  error(message, duration) {
    this.show(message, "error", duration);
  }

  warning(message, duration) {
    this.show(message, "warning", duration);
  }

  info(message, duration) {
    this.show(message, "info", duration);
  }
}

export const toast = new Toast();
