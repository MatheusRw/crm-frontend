import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCustomer from "./pages/CreateCustomer";
import EditCustomer from "./pages/EditCustomer";
import CreateOpportunity from "./pages/CreateOpportunity";
import EditOpportunity from "./pages/EditOpportunity"; // Importe o componente de edição
import ListOpportunities from "./pages/ListOpportunities";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import ListCustomers from "./pages/ListCustomers";
import ListUsers from "./pages/ListUsers";
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
        {/* Login */}
        <Route path="/login" element={<Login onLogin={setToken} />} />

        {/* Dashboard principal */}
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* Criação de entidades */}
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

        {/* Edição de entidades */}
        <Route
          path="/edit-customer/:id"
          element={token ? <EditCustomer /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-opportunity/:id" // Rota para editar oportunidades
          element={token ? <EditOpportunity /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-user/:id"
          element={token ? <EditUser /> : <Navigate to="/login" replace />}
        />

        {/* Listagens */}
        <Route
          path="/clientes"
          element={token ? <ListCustomers /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/oportunidades"
          element={token ? <ListOpportunities /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/usuarios"
          element={token ? <ListUsers /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;