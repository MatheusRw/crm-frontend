import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import { api } from "../services/api";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Carregar dados do cliente
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.get(`/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
      }
    };
    fetchCustomer();
  }, [id]);

  // Atualizar estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Salvar alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/customers/${id}`, customer);
      navigate("/list-customers");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Editar Cliente
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nome"
            name="name"
            value={customer.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={customer.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Telefone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default EditCustomer;
