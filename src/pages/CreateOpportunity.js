import React, { useState } from "react";
import { api } from "../services/api";

function CreateOpportunity() {
  const [customerId, setCustomerId] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/customers/${customerId}/opportunities`, {
        title,
        value: parseFloat(value),
      });
      alert("Oportunidade criada com sucesso!");
      setCustomerId("");
      setTitle("");
      setValue("");
    } catch (err) {
      alert("Erro ao criar oportunidade");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Criar Oportunidade</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID do Cliente"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <br />
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <br />
        <button type="submit">Criar Oportunidade</button>
      </form>
    </div>
  );
}

export default CreateOpportunity;
