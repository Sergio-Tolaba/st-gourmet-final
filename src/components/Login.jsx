// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

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
    <div style={{ maxWidth: 420, margin: '2rem auto', padding: '1rem' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label>
        <input
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />

        {error && (
          <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>
        )}

        <button type="submit" style={{ padding: '8px 12px' }}>
          Entrar
        </button>
      </form>

      <div style={{ marginTop: 12, fontSize: 13, color: '#555' }}>
        <div>Credenciales de prueba:</div>
        <div>admin / password123 (admin)</div>
        <div>usuario / usuario123 (usuario sin acceso a Gestión)</div>
      </div>
    </div>
  );
};

export default Login;
