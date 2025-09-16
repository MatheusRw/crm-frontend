import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCustomer from "./pages/CreateCustomer";
import CreateOpportunity from "./pages/CreateOpportunity";
import CreateUser from "./pages/CreateUser";
import ListCustomers from "./pages/ListCustomers"; // nova página de listagem
import { setAuthToken } from "./services/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Atualiza o token no axios sempre que mudar
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setToken} />} />

        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/create-customer"
          element={token ? <CreateCustomer /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/create-opportunity"
          element={token ? <CreateOpportunity /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/create-user"
          element={token ? <CreateUser /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/clientes"
          element={token ? <ListCustomers /> : <Navigate to="/login" replace />}
        />

        {/* Futuras rotas para listagens de oportunidades e usuários */}
        {/* <Route path="/oportunidades" element={token ? <ListOpportunities /> : <Navigate to="/login" replace />} /> */}
        {/* <Route path="/usuarios" element={token ? <ListUsers /> : <Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
