import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importar o CSS padrão do react-datepicker
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR'; // Importar localização em Português Brasileiro
import './RegisterPage.css'; // Importar o arquivo CSS

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState(null); // Inicializa com null para evitar erros de formatação
  const [error, setError] = useState('');

  // Configuração da localização para Português Brasileiro
  registerLocale('pt-BR', ptBR);
  setDefaultLocale('pt-BR');

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
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              dateFormat="dd/MM/yyyy" // Formato brasileiro
              locale="pt-BR" // Configuração de localização para exibir dias e meses em português
              placeholderText="Selecione a data" // Texto de placeholder
              isClearable // Permite limpar a seleção
              showYearDropdown // Mostra o dropdown de seleção de ano
              scrollableYearDropdown // Anos roláveis no dropdown
              yearDropdownItemNumber={15} // Quantidade de anos no dropdown
              required
            />
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
