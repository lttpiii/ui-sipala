export const Table = {
  render(options) {
    const {
      headers = [],
      rows = [],
      emptyMessage = "No data available",
      actions = null,
    } = options;

    if (rows.length === 0) {
      return `
        <div class="text-center py-12 text-gray-500">
          <i class="fas fa-inbox text-4xl mb-4 text-gray-300"></i>
          <p>${emptyMessage}</p>
        </div>
      `;
    }

    return `
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              ${headers
                .map(
                  (header) => `
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.class || ""}">
                  ${header.label}
                </th>
              `,
                )
                .join("")}
              ${actions ? '<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>' : ""}
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${rows
              .map(
                (row, index) => `
              <tr class="hover:bg-gray-50 transition">
                ${headers
                  .map(
                    (header) => `
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${header.class || ""}">
                    ${header.render ? header.render(row[header.key], row, index) : row[header.key] || "-"}
                  </td>
                `,
                  )
                  .join("")}
                ${
                  actions
                    ? `
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${actions(row, index)}
                  </td>
                `
                    : ""
                }
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  },
};
