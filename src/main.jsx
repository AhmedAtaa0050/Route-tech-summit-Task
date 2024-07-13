import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClientsProvider } from "./context/ClientsContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClientsProvider>
    <App />
  </ClientsProvider>
);
