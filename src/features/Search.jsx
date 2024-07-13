import { useClients } from "../context/ClientsContext";

function Search() {
  const { searchQuery, setSearchQuery } = useClients();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Search by name or amount"
      aria-label="Search by name or amount"
    />
  );
}

export default Search;
