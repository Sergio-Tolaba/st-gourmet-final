import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetalleProducto.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setProducto(null);
    setError(null);

    fetch(`https://68dd7da4d7b591b4b78c9f2f.mockapi.io/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener el producto');
        return res.json();
      })
      .then((data) => {
        setProducto(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al obtener el producto');
      });
  }, [id]);

  if (error) {
    return (
      <div className="detalle-container">
        <p>{error}</p>
        <Link to="/">
          <button>Volver al inicio</button>
        </Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="detalle-container">
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <h2>{producto.nombre}</h2>
      <div className="detalle-top">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="detalle-img"
        />
        <div className="detalle-meta">
          <p>
            <strong>Precio:</strong> {producto.precio || '—'}
          </p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
        </div>
      </div>

      <div className="volver">
        <Link to="/">
          <button>← Volver</button>
        </Link>
      </div>
    </div>
  );
};

export default DetalleProducto;
