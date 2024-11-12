import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // Importando o BrowserRouter
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Envolvendo o App com BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
