import { useState, useEffect, useRef } from 'react';
import FormProducto from './FormProducto';
import EditarProducto from './EditarProducto';
import styles from './GestionProducto.module.css';
import CirclePlus from '../assets/CirclePlus';
import { useAuthContext } from '../contexts/AuthContext';

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const API = 'https://68dd7da4d7b591b4b78c9f2f.mockapi.io/productos';
  const formRef = useRef(null);
  const nombreInputRef = useRef(null);
  const editarRef = useRef(null);
  const editarNombreRef = useRef(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API);
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar los productos');
    } finally {
      setCargando(false);
    }
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);

    setTimeout(() => {
      editarRef.current?.scrollIntoView({ behavior: 'smooth' });
      editarNombreRef.current?.focus();
    }, 300);
  };

  const formatCurrency = (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) return '-';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
      if (!respuesta.ok) throw new Error('Error al agregar el producto.');
      const datos = await respuesta.json();
      setProductos([...productos, datos]);
      alert('Producto agregado correctamente');
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al agregar el producto.');
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar?');
    if (!confirmar) return;
    try {
      const respuesta = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!respuesta.ok) throw new Error('Error al eliminar');
      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al eliminar el producto.');
    }
  };

  if (cargando)
    return <div className={styles.loading}>Cargando productos...</div>;

  const { usuario } = useAuthContext();
  if (!usuario) {
    return (
      <div style={{ padding: 20 }}>
        Debes iniciar sesión para ver esta sección.
      </div>
    );
  }
  if (usuario.role !== 'admin') {
    return (
      <div style={{ padding: 20 }}>
        No autorizado. Sólo administradores pueden acceder.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={`container-fluid container-md ${styles.container}`}>
        <div className="row g-4">
          <div className="col-12 col-md-8">
            <div className={styles.panel}>
              <div
                className={styles.botonAgregarProducto}
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    nombreInputRef.current?.focus();
                  }, 400);
                }}
              >
                <div className={styles.agregarInfo}>
                  <CirclePlus />
                  <div className={styles.agregarText}>
                    <p className={styles.agregarLine}>
                      Para editar haz clic en el producto
                    </p>
                    <p className={styles.agregarLineBold}>Nuevo Producto</p>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center g-4">
                {productos.map((producto) => {
                  const nombre =
                    producto.nombre || producto.name || 'Sin nombre';
                  const precioRaw = producto.precio ?? producto.price ?? '-';
                  return (
                    <div key={producto.id} className="col-12 col-md-7 col-lg-8">
                      <div
                        onClick={() => seleccionarProducto(producto)}
                        className={styles.productoItem}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') seleccionarProducto(producto);
                        }}
                      >
                        <img
                          className={styles.imagen}
                          src={producto.imagen}
                          alt={nombre}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://via.placeholder.com/100?text=Sin+imagen';
                          }}
                        />

                        <div className={styles.info}>
                          <h3 className={styles.nombre} title={nombre}>
                            {nombre}
                          </h3>
                          <p className={styles.precio}>
                            {precioRaw === '-'
                              ? '-'
                              : formatCurrency(precioRaw)}
                          </p>
                        </div>

                        <div className={styles.controls}>
                          <button
                            className={`btn btn-sm ${styles.btnEliminar}`}
                            aria-label={`Eliminar ${nombre}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              eliminarProducto(producto.id);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 col-lg-4">
            <div className={styles.panel}>
              <div ref={formRef}>
                <FormProducto
                  onAgregar={agregarProducto}
                  ref={nombreInputRef}
                />
              </div>

              <EditarProducto
                ref={editarRef}
                nombreRef={editarNombreRef}
                productoSeleccionado={productoSeleccionado}
                onActualizar={(productoActualizado) => {
                  setProductos((prev) =>
                    prev.map((p) =>
                      p.id === productoActualizado.id ? productoActualizado : p
                    )
                  );
                  setProductoSeleccionado(null);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GestionProductos;
