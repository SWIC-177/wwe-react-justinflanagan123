export default function Table({ col1, col2, col1Header, col2Header }) {
  return (
    <table className="container mx-auto max-w-fit text-left">
      <thread>
        <tr>
          <th>{col1Header}</th>
          <th>{col2Header}</th>
        </tr>
      </thread>

      <tbody>
        {col1.map((item, index) => (
          <tr key={index}>
            <td>{item}</td>
            <td>{col2[index] || ""} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
