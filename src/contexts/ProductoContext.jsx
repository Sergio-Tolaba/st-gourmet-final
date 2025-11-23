import { createContext, useState } from "react";

export const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
	const [productos, setProductos] = useState([]);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const editarProducto = (productoActualizado) => {
    setProductos(
      productos.map((producto) =>
        producto.id === productoActualizado.id ? productoActualizado : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };
	
  return (
    <ProductoContext.Provider
      value={{ productos, agregarProducto, editarProducto, eliminarProducto }}
    >
      {children}
    </ProductoContext.Provider>
  );
};