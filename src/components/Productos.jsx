import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Productos.css';
import { CarritoContext } from '../contexts/CarritoContext';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarProducto } = useContext(CarritoContext);

  const URL = 'https://68dd7da4d7b591b4b78c9f2f.mockapi.io/productos';

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(URL)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error al cargar productos');
        return respuesta.json();
      })
      .then((datos) => setProductos(datos))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setCargando(false));
  }, []); // 👈 se ejecuta una sola vez al montar

  if (cargando) return <div>Cargando productos...</div>;
  if (error)
    return (
      <div className="error">
        Error: {error}{' '}
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );

  
  return (
    <div className="productos-container">
      <div className="row">
  {productos.map((producto) => (
    <div key={producto.id} className="col-lg-3 col-md-6 col-12 mb-4">
      <div className="producto-card">
        <img src={producto.imagen} height={80} width={80} />
        <h3 className="nombre">{producto.nombre}</h3>
        <p className="precio">${producto.precio}</p>
        <div className="botones">
          <Link to={`/productos/${producto.id}`}>
            <button className="btn-detalle">Ver detalle</button>
          </Link>
          <button className="btn-agregar" onClick={() => agregarProducto(producto)}>
            🛒Agregar
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Productos;
