import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import { useAuthContext } from '../contexts/AuthContext';

const NavBar = ({ cartCount = 0 }) => {
  const { usuario, logout } = useAuthContext();
  const esAdmin = usuario?.role === 'admin';

  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="brand">
            St Gourmet
          </Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <nav
          className={`nav-center ${menuAbierto ? 'open' : ''}`}
          role="navigation"
        >
          <NavLink
            to="/"
            className="nav-link"
            end
            onClick={() => setMenuAbierto(false)}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/ofertas"
            className="nav-link"
            onClick={() => setMenuAbierto(false)}
          >
            Ofertas
          </NavLink>
          <NavLink
            to="/carrito"
            className="nav-link"
            onClick={() => setMenuAbierto(false)}
          >
            Carrito
          </NavLink>
          {esAdmin && (
            <NavLink
              to="/admin"
              className="nav-link"
              onClick={() => setMenuAbierto(false)}
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="nav-right">
          <Link to="/carrito" className="cart-link" aria-label="Ver carrito">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {usuario && (
            <>
              <span className="usuario-info">
                Usuario: <strong>{usuario.username}</strong>
              </span>

              <button onClick={logout} className="btn-salir">
                Salir
              </button>
            </>
          )}

          {!usuario && (
            <Link to="/login" className="login-btn">
              <button>Ingresar</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
