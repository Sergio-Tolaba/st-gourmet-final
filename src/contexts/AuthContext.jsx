import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(() => {
    try {
      const raw = localStorage.getItem('app_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const loadUsers = () => {
    try {
      const raw = localStorage.getItem('app_users');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem('app_users', JSON.stringify(users));
  };

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

  useEffect(() => {
    if (usuario) localStorage.setItem('app_user', JSON.stringify(usuario));
    else localStorage.removeItem('app_user');
  }, [usuario]);

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

  const logout = () => {
    setUsuario(null);
    navigate('/login', { replace: true });
  };

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
