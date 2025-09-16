import React, { useState } from "react";
import { api } from "../services/api";

function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", { email, password });
      alert("Usuário criado com sucesso!");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Erro ao criar usuário");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
}

export default CreateUser;
