import { useState } from 'react';
import styles from './GestionProducto.module.css';
import { forwardRef } from 'react';
const FormProducto = forwardRef(({ onAgregar }, ref) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const limpiar = () => {
    setNombre('');
    setPrecio('');
    setImagen('');
    setDescripcion('');
  };

  const submit = (e) => {
    e.preventDefault();

    const precioNum = Number(precio);

    if (Number.isNaN(precioNum)) {
      alert('El precio debe ser un número válido.');
      return;
    }
    if (precioNum < 0) {
      alert('El precio no puede ser negativo.');
      return;
    }
    // <<< fin validación >>>

    if (!nombre.trim()) return alert('Completá el nombre del producto');
    const producto = {
      nombre: nombre.trim(),
      precio: precioNum || 0,
      imagen:
        imagen.trim() || 'https://via.placeholder.com/100?text=Sin+imagen',
      descripcion: descripcion.trim(),
    };
    onAgregar(producto);
    limpiar();
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={submit}
      aria-label="Formulario para agregar producto"
    >
      <h2>Agregar Producto</h2>
      <div className={styles.fieldGroup}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          ref={ref}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Alfajor casero - Chocolate 90g"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          type="number"
          min="0"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ej: 11500 (solo números)"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="imagen">URL imagen</label>
        <input
          id="imagen"
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          placeholder="https://... (opcional, dejar vacío para placeholder)"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Breve descripción: ingredientes, formato o detalles (opcional)"
        />
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={limpiar}
          style={{ marginBottom: '10px' }}
        >
          Limpiar
        </button>
        <button
          type="submit"
          className={styles.btnPrimary}
          style={{ marginBottom: '60px' }}
        >
          Agregar producto
        </button>
      </div>
    </form>
  );
});
export default FormProducto;
