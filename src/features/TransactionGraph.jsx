import { useClients } from "../context/ClientsContext";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
} from "recharts";

export default function TransactionGraph() {
  const { transactions, rowId } = useClients();

  // Return early if transactions are not available
  if (!transactions || transactions.length === 0) return null;

  // Filter transactions based on the selected customer ID
  const customerData = transactions.filter(
    (transaction) => transaction.customer_id === Number(rowId)
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={customerData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
