import React, { useEffect, useState } from "react";
import { escucharPedidos, actualizarPedido } from "../../hooks/usePedidos";
import { listenMessages, sendMessage } from "../../hooks/useMessages";

const Cocinero = () => {
  const [pedidos, setPedidos] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Escucha pedidos en tiempo real
  useEffect(() => {
    const stop = escucharPedidos(setPedidos);
    return () => stop && stop();
  }, []);

  // Escucha mensajes del pedido seleccionado
  useEffect(() => {
    if (!selectedOrder) return;
    const stop = listenMessages(selectedOrder, setMessages);
    return () => stop && stop();
  }, [selectedOrder]);

  // Cambiar el estado del pedido
  const handleChangeEstado = async (id, nuevoEstado) => {
    await actualizarPedido(id, { estado: nuevoEstado });
    await sendMessage(id, "cocinero", `Pedido marcado como ${nuevoEstado}`);
  };

  // Enviar mensaje manual al mesero o cliente
  const handleSendMsg = async () => {
    if (!selectedOrder || !newMsg.trim()) return;
    await sendMessage(selectedOrder, "cocinero", newMsg.trim());
    setNewMsg("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>👨‍🍳 Panel del Cocinero</h1>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Lista de pedidos */}
        <div style={{ flex: 1 }}>
          <h3>Pedidos activos</h3>
          <ul>
            {Object.entries(pedidos).map(([id, p]) => (
              <li key={id} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => setSelectedOrder(id)}
                  style={{
                    backgroundColor:
                      selectedOrder === id ? "#007bff" : "#f0f0f0",
                    color: selectedOrder === id ? "white" : "black",
                    padding: "6px 10px",
                    borderRadius: 5,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  #{id.slice(0, 6)} — ${p.total} — {p.estado}
                </button>
                <div style={{ marginTop: 5 }}>
                  <button
                    onClick={() => handleChangeEstado(id, "En preparación")}
                    style={{ marginRight: 5 }}
                  >
                    En preparación
                  </button>
                  <button onClick={() => handleChangeEstado(id, "Listo")}>
                    Listo
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat con mesero/cliente */}
        <div style={{ flex: 1 }}>
          <h3>
            Chat (Pedido {selectedOrder ? selectedOrder.slice(0, 6) : "—"})
          </h3>
          <div
            style={{
              minHeight: 200,
              border: "1px solid #ccc",
              padding: 10,
              overflowY: "auto",
              backgroundColor: "#fafafa",
              borderRadius: 4,
            }}
          >
            {messages.length === 0 ? (
              <p style={{ color: "#888" }}>Sin mensajes aún.</p>
            ) : (
              messages.map((m, index) => (
                <div key={index} style={{ marginBottom: 6 }}>
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
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Escribe un mensaje..."
              style={{
                width: "70%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={handleSendMsg}
              style={{
                marginLeft: 8,
                padding: "8px 16px",
                backgroundColor: "#28a745",
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
      </div>
    </div>
  );
};

export default Cocinero;
