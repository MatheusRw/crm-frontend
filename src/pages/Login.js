import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    try {
      console.log("Tentando login com:", { email, apiUrl: process.env.REACT_APP_API_URL });
      
      const response = await api.post(
        "/token",
        new URLSearchParams({
          username: email,
          password: password,
        }),
        { 
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
          } 
        }
      );

      console.log("Resposta do login:", response.data);

      const token = response.data.access_token;
      setAuthToken(token);
      localStorage.setItem("token", token);
      onLogin(token);

      navigate("/");
    } catch (err) {
      console.error("Erro detalhado no login:", err.response?.data || err.message);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px", margin: "50px auto" }}>
      <h1>Login CRM</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
          required
        />
        <br />
        <button 
          onClick={handleLogin} 
          disabled={loading}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;