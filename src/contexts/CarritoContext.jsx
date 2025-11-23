import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
  setCarrito((prev) => {
    const existente = prev.find(item => item.nombre === producto.nombre);

    if (existente) {
      return prev.map(item =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
    }

    const id = producto.id ?? crypto.randomUUID();

    return [...prev, { ...producto, id, cantidad: 1 }];
  });
};

 const eliminarProducto = (id) => {
  setCarrito((prev) => prev.filter((item) => item.id !== id));
};


  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const cambiarCantidad = (nombre, cambio) => {
  setCarrito((prev) =>
    prev.map((item) =>
      item.nombre === nombre
        ? {
            ...item,
            cantidad: Math.max(1, (item.cantidad || 1) + cambio),
          }
        : item
    )
  );
};

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarProducto,
      eliminarProducto,
      vaciarCarrito,
      cambiarCantidad
    }}>
      {children}
    </CarritoContext.Provider>
  );
}
