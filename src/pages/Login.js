import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/token",
        new URLSearchParams({
          username: email,
          password: password,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const token = response.data.access_token;
      setAuthToken(token);
      localStorage.setItem("token", token);

      onLogin(token);

      // 👇 redireciona para o dashboard
      navigate("/");
    } catch (err) {
      alert("Erro ao fazer login");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login CRM</h1>
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
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
