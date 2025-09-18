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
} from "@mui/material";
import { api } from "../services/api";

function EditUser() {
  const { id } = useParams(); // pegar ID do usuário na URL
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "" // campo extra: perfil do usuário
  });

  // Estado da notificação
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success | error

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Carregar dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setSnackbarMessage("Erro ao carregar usuário ❌");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchUser();
  }, [id]);

  // Atualizar estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Salvar alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, user);

      setSnackbarMessage("Usuário atualizado com sucesso! ✅");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Navega para listagem após um pequeno delay
      setTimeout(() => navigate("/usuarios"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setSnackbarMessage("Erro ao atualizar usuário ❌");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Editar Usuário
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nome"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Perfil"
            name="role"
            value={user.role}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
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

export default EditUser;
