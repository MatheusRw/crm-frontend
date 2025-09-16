import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateCustomer() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateCustomer = async () => {
    try {
      await api.post("/customers", { name, email }); // response não é mais armazenado
      alert("Cliente criado com sucesso!");
      setName("");
      setEmail("");
      navigate("/"); // volta para o dashboard
    } catch (err) {
      alert("Erro ao criar cliente");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Criar Cliente</h1>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleCreateCustomer}>Criar Cliente</button>
    </div>
  );
}

export default CreateCustomer;
