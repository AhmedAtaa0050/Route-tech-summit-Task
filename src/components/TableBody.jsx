import { useClients } from "../context/ClientsContext";
import TableRow from "./TableRow";

const TableBody = () => {
  const { searchQuery, dataForRender, searchFiltration } = useClients();

  return (
    <tbody role="row" className="tbody">
      {/* Render filtered data if search query is present */}
      {searchQuery.length > 0 &&
        searchFiltration.length > 0 &&
        searchFiltration.map((customer) => (
          <TableRow key={customer.id} {...customer} />
        ))}

      {/* Display message if no data matches search */}
      {searchQuery.length > 0 && !searchFiltration.length && (
        <tr>
          <td colSpan="3" className="not-found">
            No data found!
          </td>
        </tr>
      )}

      {/* Render all data if no search query */}
      {!searchQuery.length &&
        dataForRender &&
        dataForRender.map((customer) => (
          <TableRow key={customer.id} {...customer} />
        ))}
    </tbody>
  );
};

export default TableBody;
