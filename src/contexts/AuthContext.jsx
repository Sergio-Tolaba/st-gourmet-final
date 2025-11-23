// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Estado del usuario logueado
  const [usuario, setUsuario] = useState(() => {
    try {
      const raw = localStorage.getItem('app_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // --- CARGAR USUARIOS DESDE localStorage ---
  const loadUsers = () => {
    try {
      const raw = localStorage.getItem('app_users');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  // --- GUARDAR USUARIOS ---
  const saveUsers = (users) => {
    localStorage.setItem('app_users', JSON.stringify(users));
  };

  // --- CREAR USUARIOS POR DEFECTO SI NO EXISTEN ---
  useEffect(() => {
    const users = loadUsers();

    if (users.length === 0) {
      const defaultUsers = [
        { username: 'admin', password: 'password123', role: 'admin' },
        { username: 'usuario', password: 'usuario123', role: 'user' },
      ];

      saveUsers(defaultUsers);
      console.log('Usuarios por defecto creados.');
    }
  }, []);

  // --- GUARDAR EL USUARIO LOGUEADO ---
  useEffect(() => {
    if (usuario) localStorage.setItem('app_user', JSON.stringify(usuario));
    else localStorage.removeItem('app_user');
  }, [usuario]);

  // --- REGISTRO LOCAL ---
  const registerUser = ({ username, password, role = 'user' }) => {
    const users = loadUsers();
    if (users.find((u) => u.username === username)) {
      return { ok: false, error: 'Usuario ya existe' };
    }
    const newUser = { username, password, role };
    users.push(newUser);
    saveUsers(users);
    return { ok: true, user: newUser };
  };

  // --- LOGIN CORRECTO ---
  const login = ({ username, password }) => {
    const users = loadUsers();

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      return { ok: false, error: 'Usuario o contraseña incorrectos' };
    }

    const userData = {
      username: found.username,
      role: found.role,
    };

    setUsuario(userData);
    localStorage.setItem('app_user', JSON.stringify(userData));

    return { ok: true, user: userData };
  };

  // --- LOGOUT ---
  const logout = () => {
    setUsuario(null);
    navigate('/login', { replace: true });
  };

  // --- VERIFICAR ADMIN ---
  const isAdmin = () => usuario?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ usuario, registerUser, login, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
