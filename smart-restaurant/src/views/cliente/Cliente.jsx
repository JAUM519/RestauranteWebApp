import React, { useState, useContext, useEffect } from "react";
import { PedidoContext } from "../../context/PedidoContext";
import { crearPedido } from "../../hooks/usePedidos";
import { crearPago } from "../../hooks/usePayments";
import { listenMessages, sendMessage } from "../../hooks/useMessages";
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

  const [lastOrderId, setLastOrderId] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const [text, setText] = useState("");

  const agregarAlCarrito = (item) => setCarrito([...carrito, item]);
  const eliminarDelCarrito = (id) =>
    setCarrito(carrito.filter((producto) => producto.id !== id));

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  // Confirmar pedido y registrar pago
  const confirmarPedido = async () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito ");
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
      const { id } = await crearPedido(pedido);
      setLastOrderId(id);
      alert(` Pedido enviado (ID: ${id})`);

      if (metodoPago === "Tarjeta") {
        const pago = {
          metodo: "Tarjeta",
          monto: total,
          ts: Date.now(),
        };
        await crearPago(id, pago);
        alert(" Pago con tarjeta registrado (simulado)");
      }

      setCarrito([]); // Limpia el carrito después del envío
    } catch (error) {
      console.error(" Error al crear pedido:", error);
      alert("Hubo un problema al enviar tu pedido.");
    }
  };

  //  Escuchar mensajes del pedido activo
  useEffect(() => {
    if (!lastOrderId) return;
    const stop = listenMessages(lastOrderId, setMsgList);
    return () => stop && stop();
  }, [lastOrderId]);

  // Escuchar cambios en el estado del pedido
useEffect(() => {
  if (!lastOrderId) return;
  const stop = suscribirCambiosPedido(lastOrderId, (pedido) => {
    if (pedido?.estado) {
      alert(` Estado actualizado: ${pedido.estado}`);
    }
  });
  return () => stop && stop();
    }, [lastOrderId]);

  //  Enviar mensaje del cliente
  const sendClientMsg = async () => {
    if (!lastOrderId || !text.trim()) return;
    await sendMessage(lastOrderId, "cliente", text.trim());
    setText("");
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

      {/* Chat del cliente */}
      {lastOrderId && (
        <div style={{ marginTop: 30 }}>
          <h3> Chat con el restaurante (Pedido #{lastOrderId.slice(0, 6)})</h3>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: 10,
              height: 200,
              overflowY: "auto",
              backgroundColor: "#fafafa",
            }}
          >
            {msgList.length === 0 ? (
              <p style={{ color: "#888" }}>Aún no hay mensajes.</p>
            ) : (
              msgList.map((m, idx) => (
                <div key={idx}>
                  <small>
                    <strong>{m.from}:</strong>
                  </small>{" "}
                  {m.text}
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: 10 }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe un mensaje..."
              style={{
                width: "70%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={sendClientMsg}
              style={{
                marginLeft: 8,
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cliente;
