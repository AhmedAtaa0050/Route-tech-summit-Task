import { useClients } from "../context/ClientsContext";

export default function TableRow({ id, name, totalAmount }) {
  const { rowId, setRowID } = useClients();

  const handleRowClick = () => {
    setRowID((currentRowId) => (currentRowId === id ? "" : id));
  };

  return (
    <tr
      className={rowId === id ? "active" : undefined}
      onClick={handleRowClick}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{totalAmount}</td>
    </tr>
  );
}
