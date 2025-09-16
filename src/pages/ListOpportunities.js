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

function ListOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

  // Pegar oportunidades do backend
  const fetchOpportunities = async () => {
    try {
      const res = await api.get("/opportunities");
      setOpportunities(res.data);
    } catch (err) {
      alert("Erro ao buscar oportunidades");
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Deletar oportunidade
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta oportunidade?")) {
      try {
        await api.delete(`/opportunities/${id}`);
        setOpportunities(opportunities.filter((o) => o.id !== id));
      } catch (err) {
        alert("Erro ao deletar oportunidade");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Oportunidades</h2>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/create-opportunity")}
        style={{ marginBottom: "20px" }}
      >
        Criar Nova Oportunidade
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Estágio</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Cliente ID</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opportunities.map((o) => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.title}</TableCell>
                <TableCell>{o.stage}</TableCell>
                <TableCell>{o.value || "-"}</TableCell>
                <TableCell>{o.customer_id}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/edit-opportunity/${o.id}`)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(o.id)}
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

export default ListOpportunities;
