import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // Importar o arquivo CSS

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { name, email, password, cpf, birthdate });
      // Handle registration success (optional)
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      setError('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Cadastro</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>CPF:</label>
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Data de Nascimento:</label>
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
