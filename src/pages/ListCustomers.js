import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TableContainer,
} from "@mui/material";

function ListCustomers() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // Pegar clientes do backend
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      alert("Erro ao buscar clientes");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Deletar cliente
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      try {
        await api.delete(`/customers/${id}`);
        setCustomers(customers.filter((c) => c.id !== id));
      } catch (err) {
        alert("Erro ao deletar cliente");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clientes</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/create-customer")}
        style={{ marginBottom: "20px" }}
      >
        Criar Novo Cliente
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/edit-customer/${c.id}`)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(c.id)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListCustomers;
