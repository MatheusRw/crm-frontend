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

function ListUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Buscar usuários do backend
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Erro ao buscar usuários");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Deletar usuário
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        alert("Erro ao deletar usuário");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Usuários</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/create-user")}
        style={{ marginBottom: "20px" }}
      >
        Criar Novo Usuário
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/edit-user/${u.id}`)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(u.id)}
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

export default ListUsers;
