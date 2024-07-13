import { createContext, useContext, useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:9000";
const ClientsContext = createContext();

const ClientsProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [rowId, setRowID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const [customersResponse, transactionsResponse] = await Promise.all([
          fetch(`${API_URL}/customers`),
          fetch(`${API_URL}/transactions`),
        ]);

        const customersData = await customersResponse.json();
        const transactionsData = await transactionsResponse.json();

        setCustomers(customersData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Something went wrong while fetching data", error);
      }
    };

    fetchClients();
  }, []);

  const dataForRender = useMemo(
    () =>
      customers.map((customer) => {
        const totalAmount = transactions
          .filter(
            (transaction) =>
              Number(transaction.customer_id) === Number(customer.id)
          )
          .reduce(
            (sum, currentTransaction) => sum + currentTransaction.amount,
            0
          );

        return { id: customer.id, name: customer.name, totalAmount };
      }),
    [customers, transactions]
  );

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const searchFiltration = useMemo(
    () =>
      dataForRender.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(customer.totalAmount).includes(searchQuery)
      ),
    [searchQuery, dataForRender]
  );

  const highlightedResults = useMemo(
    () =>
      searchFiltration.map((customer) => ({
        ...customer,
        name: highlightSearchTerm(customer.name, searchQuery),
        totalAmount: highlightSearchTerm(
          String(customer.totalAmount),
          searchQuery
        ),
      })),
    [searchFiltration, searchQuery]
  );

  return (
    <ClientsContext.Provider
      value={{
        customers,
        transactions,
        searchQuery,
        setSearchQuery,
        dataForRender,
        searchFiltration: highlightedResults,
        rowId,
        setRowID,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

const useClients = () => {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error("useClients must be used within a ClientsProvider");
  }

  return context;
};

export { ClientsProvider, useClients };
