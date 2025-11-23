import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import './Carrito.css';
import { CarritoContext } from '../contexts/CarritoContext';

// Formatea números a moneda ARS (sin decimales)
const formatCurrency = (n) => {
  const num = Number(n);
  if (Number.isNaN(num)) return '-';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(num);
};

const Carrito = () => {
  // Uso del Contexto
  const { usuario } = useAuthContext();
  const { carrito, eliminarProducto, vaciarCarrito, cambiarCantidad } = useContext(CarritoContext);

  // Total seguro
  const total = carrito.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 1;
    return acc + precio * cantidad;
  }, 0);

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <div>
          <h2>🛒 Tu Carrito</h2>
          

        </div>

        <div className="acciones">
          <button className="btn btn-vaciar" onClick={vaciarCarrito}>Vaciar carrito</button>
          <button className="btn btn-primary btn-pagar" onClick={() => { /* navegar a pago */ }}>Ir a pagar</button>
        </div>
      </div>

      {(!carrito || carrito.length === 0) ? (
        <p className="carrito-vacio">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map(item => {
              const precio = Number(item.precio) || 0;
              const cantidad = Number(item.cantidad) || 1;
              const subtotal = precio * cantidad;

              return (
                <li className="carrito-item" key={item.id ?? item.nombre}>
                  <img src={item.imagen} alt={item.nombre} />

                  <div className="info">
                    <h4>{item.nombre}</h4>
                    <p className="descripcion">{item.descripcion ?? ''}</p>

                    <div className="cantidad-control">
                      <button onClick={() => cambiarCantidad(item.nombre, -1)}>-</button>
                      <span className="cantidad-valor">{cantidad}</span>
                      <button onClick={() => cambiarCantidad(item.nombre, +1)}>+</button>

                    </div>
                  </div>

                  <div className="item-right">
                    <div className="precio">Precio: {formatCurrency(precio)}</div>
                    <div className="subtotal">Subtotal: {formatCurrency(subtotal)}</div>
                    <button className="btn btn-eliminar" onClick={() => eliminarProducto(item.id)}>Eliminar</button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="carrito-footer">
            <div />
            <div className="carrito-total">Total: {formatCurrency(total)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
