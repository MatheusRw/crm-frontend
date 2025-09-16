import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem, Typography, Stack, Box } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box>
      {/* Cabeçalho com CRM Dashboard */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/")}>
            Início
          </Button>

          {/* Menu Listas */}
          <Button color="inherit" onClick={handleMenu}>
            Listas
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                navigate("/clientes");
                handleClose();
              }}
            >
              Clientes
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/oportunidades");
                handleClose();
              }}
            >
              Oportunidades
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/usuarios");
                handleClose();
              }}
            >
              Usuários
            </MenuItem>
          </Menu>

          <Button color="inherit" onClick={() => navigate("/financeiro")}>
            Financeiro
          </Button>
          <Button color="inherit" onClick={() => navigate("/treinamentos")}>
            Treinamentos
          </Button>
          <Button color="inherit" onClick={() => navigate("/comunidade")}>
            Comunidade
          </Button>
          <Button color="inherit" onClick={() => navigate("/mais")}>
            Mais
          </Button>

          {/* Título alinhado à direita */}
          <Typography variant="h6" sx={{ marginLeft: "auto" }}>
            CRM Dashboard
          </Typography>

          {/* Botão de Logout */}
          <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: "10px" }}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      {/* Conteúdo do Dashboard */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Escolha uma ação:
        </Typography>

        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/create-customer")}
          >
            Criar Cliente
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/create-opportunity")}
          >
            Criar Oportunidade
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/create-user")}
          >
            Cadastrar Usuário
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Dashboard;
