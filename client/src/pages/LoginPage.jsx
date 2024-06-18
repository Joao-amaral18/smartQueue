import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar Link
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css"; // Importar o arquivo CSS

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { username, password });
      const { token, userId } = response.data; // Assuming userId is returned from login
      login(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); // Store userId in localStorage
      navigate("/products");
    } catch (error) {
      console.error("Login error:", error);
      setError("Credenciais inválidas. Por favor, tente novamente.");
    }
    console.log(localStorage.getItem("userId"));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Entrar</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Nome de usuário ou Email:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <p className="register-link">
          Ainda não tem uma conta? <Link to="/register">Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
