 


import React from "react";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/")}>Início</Button>
        
        
        <Button color="inherit" onClick={handleMenu}>
          Procure ajuda por produto
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { navigate("/clientes"); handleClose(); }}>Clientes</MenuItem>
          <MenuItem onClick={() => { navigate("/oportunidades"); handleClose(); }}>Oportunidades</MenuItem>
          <MenuItem onClick={() => { navigate("/usuarios"); handleClose(); }}>Usuários</MenuItem>
        </Menu>

        <Button color="inherit" onClick={() => navigate("/financeiro")}>Financeiro</Button>
        <Button color="inherit" onClick={() => navigate("/treinamentos")}>Treinamentos</Button>
        <Button color="inherit" onClick={() => navigate("/comunidade")}>Comunidade</Button>
        <Button color="inherit" onClick={() => navigate("/mais")}>Mais</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
