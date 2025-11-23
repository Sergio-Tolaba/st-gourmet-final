// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login({ username: username.trim(), password });

    if (res.ok) {
      setError('');
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Error de login');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">Usuario</label>
        <input
          autoFocus
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="login-label">Contraseña</label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="login-error">{error}</div>}

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>

      <div className="login-help">
        <div>Credenciales de prueba:</div>
        <div>admin / password123 (admin)</div>
        <div>usuario / usuario123 (usuario sin acceso a Gestión)</div>
      </div>
    </div>
  );
};

export default Login;
