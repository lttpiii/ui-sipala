export class Modal {
  constructor(options = {}) {
    this.options = {
      title: "Modal",
      content: "",
      onConfirm: null,
      onCancel: null,
      confirmText: "Confirm",
      cancelText: "Cancel",
      showCancel: true,
      ...options,
    };
    this.modal = null;
  }

  open() {
    this.modal = document.createElement("div");
    this.modal.className =
      "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4";
    this.modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all scale-95 opacity-0" id="modal-content">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">${this.options.title}</h3>
          <div class="text-gray-600 mb-6">${this.options.content}</div>
          <div class="flex gap-3 justify-end">
            ${
              this.options.showCancel
                ? `
              <button id="modal-cancel" class="btn-secondary">${this.options.cancelText}</button>
            `
                : ""
            }
            <button id="modal-confirm" class="btn-primary">${this.options.confirmText}</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);
    document.body.style.overflow = "hidden";

    // Animate in
    requestAnimationFrame(() => {
      const content = this.modal.querySelector("#modal-content");
      content.classList.remove("scale-95", "opacity-0");
      content.classList.add("scale-100", "opacity-100");
    });

    // Event listeners
    if (this.options.showCancel) {
      this.modal
        .querySelector("#modal-cancel")
        .addEventListener("click", () => this.close("cancel"));
    }
    this.modal
      .querySelector("#modal-confirm")
      .addEventListener("click", () => this.close("confirm"));

    // Close on backdrop click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close("cancel");
    });
  }

  close(action) {
    const content = this.modal.querySelector("#modal-content");
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      this.modal.remove();
      document.body.style.overflow = "";

      if (action === "confirm" && this.options.onConfirm) {
        this.options.onConfirm();
      } else if (action === "cancel" && this.options.onCancel) {
        this.options.onCancel();
      }
    }, 200);
  }
}
