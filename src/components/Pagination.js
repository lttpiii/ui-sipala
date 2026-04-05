export const Pagination = {
  render(metadata, onPageChange) {
    if (!metadata || metadata.total_pages <= 1) return "";

    const { current_page, total_pages, total_records } = metadata;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;

      let start = Math.max(1, current_page - Math.floor(maxVisible / 2));
      let end = Math.min(total_pages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    };

    const pages = getPageNumbers();

    return `
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div class="text-sm text-gray-600">
          Showing page ${current_page} of ${total_pages} (${total_records} total)
        </div>
        <div class="flex gap-2">
          <button 
            onclick="window.changePage(${current_page - 1})"
            class="px-3 py-1 rounded border ${current_page === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}"
            ${current_page === 1 ? "disabled" : ""}
          >
            Previous
          </button>
          
          ${pages
            .map(
              (page) => `
            <button 
              onclick="window.changePage(${page})"
              class="px-3 py-1 rounded border ${page === current_page ? "bg-primary-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}"
            >
              ${page}
            </button>
          `,
            )
            .join("")}
          
          <button 
            onclick="window.changePage(${current_page + 1})"
            class="px-3 py-1 rounded border ${current_page === total_pages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}"
            ${current_page === total_pages ? "disabled" : ""}
          >
            Next
          </button>
        </div>
      </div>
    `;
  },

  init(callback) {
    window.changePage = (page) => {
      if (callback) callback(page);
    };
  },
};
