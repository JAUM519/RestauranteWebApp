import React, { useState, useContext } from "react";
import { PedidoContext } from "../../context/PedidoContext";
import { crearPedido } from "../../hooks/usePedidos";
import { crearPago } from "../../hooks/usePayments"; // ✅ nuevo import

const menuInicial = [
  { id: 1, nombre: "Hamburguesa", precio: 18000 },
  { id: 2, nombre: "Pizza", precio: 25000 },
  { id: 3, nombre: "Ensalada", precio: 15000 },
];

const Cliente = () => {
  const [menu] = useState(menuInicial);
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const { estadoPedido } = useContext(PedidoContext);

  const agregarAlCarrito = (item) => setCarrito([...carrito, item]);
  const eliminarDelCarrito = (id) =>
    setCarrito(carrito.filter((producto) => producto.id !== id));

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  // ✅ Nueva función para confirmar pedido y registrar pago
  const confirmarPedido = async () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito 😅");
      return;
    }

    const pedido = {
      items: carrito,
      total,
      estado: "Pendiente",
      fecha: new Date().toISOString(),
      metodoPago: metodoPago || "Efectivo",
    };

    try {
      // Crear pedido en Firebase y obtener ID
      const { id } = await crearPedido(pedido);
      alert(`✅ Pedido enviado (ID: ${id})`);

      // Si es pago con tarjeta, registrar un pago simulado
      if (metodoPago === "Tarjeta") {
        const pago = {
          metodo: "Tarjeta",
          monto: total,
          ts: Date.now(),
        };
        await crearPago(id, pago);
        alert("💳 Pago con tarjeta registrado (simulado)");
      }

      setCarrito([]); // Limpia el carrito después del envío
    } catch (error) {
      console.error("❌ Error al crear pedido:", error);
      alert("Hubo un problema al enviar tu pedido.");
    }
  };

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

      {/* Selección de método de pago */}
      <label>
        Método de pago:
        <select
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
      </label>

      <h4>Estado del pedido: {estadoPedido}</h4>

      <button
        onClick={confirmarPedido}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Confirmar pedido
      </button>
    </div>
  );
};

export default Cliente;
