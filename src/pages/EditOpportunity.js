import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import { api } from "../services/api";

function EditOpportunity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState({
    title: "",
    stage: "new",
    value: "",
    close_date: "",
    customer_id: ""
  });

  // Estados da notificação
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Carregar dados da oportunidade e clientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Carregar oportunidade
        const opportunityResponse = await api.get(`/opportunities/${id}`);
        const opportunityData = opportunityResponse.data;
        
        // Formatando a data para o input type="date"
        if (opportunityData.close_date) {
          opportunityData.close_date = opportunityData.close_date.split('T')[0];
        }
        
        setOpportunity(opportunityData);
        
        // Carregar clientes para o dropdown
        const customersResponse = await api.get('/customers?limit=100');
        setCustomers(customersResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setSnackbarMessage("Erro ao carregar dados da oportunidade ❌");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // Atualizar estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunity({ ...opportunity, [name]: value });
  };

  // Salvar alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Preparar dados para envio
      const dataToSend = {
        ...opportunity,
        value: opportunity.value ? parseFloat(opportunity.value) : null,
        close_date: opportunity.close_date || null
      };
      
      await api.put(`/opportunities/${id}`, dataToSend);
      setSnackbarMessage("Oportunidade atualizada com sucesso! ✅");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Navegar para listagem após um pequeno delay
      setTimeout(() => navigate("/oportunidades"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar oportunidade:", error);
      setSnackbarMessage("Erro ao atualizar oportunidade ❌");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ padding: 4, maxWidth: 600, margin: "20px auto", textAlign: "center" }}>
        <Typography variant="h6">Carregando...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Editar Oportunidade
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Título"
            name="title"
            value={opportunity.title}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <FormControl fullWidth>
            <InputLabel id="stage-label">Estágio</InputLabel>
            <Select
              labelId="stage-label"
              name="stage"
              value={opportunity.stage}
              onChange={handleChange}
              label="Estágio"
              required
            >
              <MenuItem value="new">Novo</MenuItem>
              <MenuItem value="qualified">Qualificado</MenuItem>
              <MenuItem value="proposal">Proposta</MenuItem>
              <MenuItem value="won">Ganho</MenuItem>
              <MenuItem value="lost">Perdido</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Valor"
            name="value"
            type="number"
            value={opportunity.value}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            inputProps={{
              step: "0.01",
              min: "0"
            }}
          />
          
          <TextField
            label="Data de Fechamento Prevista"
            name="close_date"
            type="date"
            value={opportunity.close_date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <FormControl fullWidth>
            <InputLabel id="customer-label">Cliente</InputLabel>
            <Select
              labelId="customer-label"
              name="customer_id"
              value={opportunity.customer_id}
              onChange={handleChange}
              label="Cliente"
              required
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name} {customer.company ? `- ${customer.company}` : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button type="submit" variant="contained" color="primary" size="large">
            Salvar
          </Button>
        </Stack>
      </form>

      {/* Snackbar de feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default EditOpportunity;