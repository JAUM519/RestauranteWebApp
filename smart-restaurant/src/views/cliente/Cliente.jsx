import React, { useState } from "react";

const menuInicial = [
  { id: 1, nombre: "Hamburguesa", precio: 18000 },
  { id: 2, nombre: "Pizza", precio: 25000 },
  { id: 3, nombre: "Ensalada", precio: 15000 },
];

const Cliente = () => {
  const [menu] = useState(menuInicial);
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (item) => {
    setCarrito([...carrito, item]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Menú del Restaurante</h2>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {item.nombre} - ${item.precio}
            <button onClick={() => agregarAlCarrito(item)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h3>🛒 Carrito</h3>
      <ul>
        {carrito.map((item) => (
          <li key={item.id}>
            {item.nombre} - ${item.precio}
            <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h4>Total: ${total}</h4>
    </div>
  );
};

export default Cliente;
