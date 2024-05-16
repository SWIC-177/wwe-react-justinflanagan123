export default function Table({ col1, col2, col1Header, col2Header }) {
  return `
      <table class="container mx-auto text-left max-w-fit">
        <thead>
          <tr>
            <th>${col1Header}</th>
            <th>${col2Header}</th>
          </tr>
        </thead>
  
        <tbody>
          ${col1
            .map(
              (item, index) => `
            <tr>
              <td>${item}</td>
              <td>${col2[index] || ""}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    `;
}
