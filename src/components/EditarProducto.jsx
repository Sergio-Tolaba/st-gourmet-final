import { useState, useEffect, forwardRef } from 'react';

const EditarProducto = forwardRef(
  ({ productoSeleccionado, onActualizar, nombreRef }, ref) => {
    const [producto, setProducto] = useState(
      productoSeleccionado || {
        nombre: '',
        precio: '',
        imagen: '',
        descripcion: '',
      }
    );

    const API = 'https://68dd7da4d7b591b4b78c9f2f.mockapi.io/productos';

    useEffect(() => {
      if (productoSeleccionado) {
        setProducto(productoSeleccionado);

        setTimeout(() => {
          nombreRef?.current?.focus();
        }, 50);
      }
    }, [productoSeleccionado, nombreRef]);

    const manejarChange = (evento) => {
      const { name, value } = evento.target;
      setProducto({ ...producto, [name]: value });
    };

    const manejarSubmit = async (evento) => {
      evento.preventDefault();
      const precioNum = Number(producto.precio);
      if (Number.isNaN(precioNum)) {
        alert('El precio debe ser un número válido.');
        return;
      }
      if (precioNum < 0) {
        alert('El precio no puede ser negativo.');
        return;
      }
      // normalizar el campo precio antes de enviar
      const payload = { ...producto, precio: precioNum };
      // <<< fin validación >>>

      try {
        const respuesta = await fetch(`${API}/${producto.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!respuesta.ok) throw new Error('Error al actualizar el producto');

        const datos = await respuesta.json();

        if (typeof onActualizar === 'function') {
          onActualizar(datos);
        }

        alert('Producto actualizado correctamente.');
      } catch (error) {
        console.error(error.message);
        alert('Hubo un error al actualizar producto.');
      }
    };

    return (
      <form onSubmit={manejarSubmit} ref={ref}>
        <h2>Editar Producto</h2>

        <div>
          <label>Nombre:</label>
          <br />
          <input
            type="text"
            name="nombre"
            value={producto.nombre || ''}
            onChange={manejarChange}
            required
            ref={nombreRef}
          />
        </div>

        <div>
          <label>Precio:</label>
          <br />
          <input
            type="number"
            name="precio"
            value={producto.precio || ''}
            onChange={manejarChange}
            required
            min="0"
            step="any"
          />
        </div>

        <div>
          <label>URL de Imagen:</label>
          <br />
          <input
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={manejarChange}
          />
        </div>

        <div>
          <label>Descripción:</label>
          <br />
          <textarea
            name="descripcion"
            value={producto.descripcion || ''}
            onChange={manejarChange}
            required
          />
        </div>

        <button type="submit">Actualizar Producto</button>
      </form>
    );
  }
);

export default EditarProducto;
