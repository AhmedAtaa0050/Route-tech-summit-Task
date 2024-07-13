import Header from "./components/Header";
import Table from "./components/Table";
import { useClients } from "./context/ClientsContext";
import TransactionGraph from "./features/TransactionGraph";

const App = () => {
  const { rowId } = useClients();

  return (
    <div className="container">
      <Header />
      <Table />
      {rowId && <TransactionGraph />}
    </div>
  );
};

export default App;
