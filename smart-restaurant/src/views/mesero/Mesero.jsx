import React, { useEffect, useState } from "react";
import { escucharPedidos } from "../../hooks/usePedidos";
import { listenMessages, sendMessage } from "../../hooks/useMessages";

const Mesero = () => {
  const [pedidos, setPedidos] = useState({});
  const [activeOrder, setActiveOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Escucha pedidos en tiempo real
  useEffect(() => {
    const stop = escucharPedidos(setPedidos);
    return () => {
      if (typeof stop === "function") stop();
    };
  }, []);

  // Escucha mensajes del pedido activo
  useEffect(() => {
    if (!activeOrder) return;
    const stop = listenMessages(activeOrder, setMessages);
    return () => stop && stop();
  }, [activeOrder]);

  // Enviar mensaje
  const handleSend = async () => {
    if (!activeOrder || !newMsg.trim()) return;
    await sendMessage(activeOrder, "mesero", newMsg.trim());
    setNewMsg("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos en tiempo real</h1>

      {Object.keys(pedidos).length === 0 ? (
        <p>No hay pedidos activos aún</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Lista de pedidos */}
          <div style={{ flex: 1 }}>
            <h3>Lista de pedidos</h3>
            <ul>
              {Object.entries(pedidos).map(([id, pedido]) => (
                <li key={id} style={{ marginBottom: "10px" }}>
                  <button onClick={() => setActiveOrder(id)}>
                    #{id.slice(0, 6)} — ${pedido.total} — {pedido.estado}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat del pedido */}
          <div style={{ flex: 1 }}>
            <h3>
              Chat (Pedido {activeOrder ? activeOrder.slice(0, 6) : "—"})
            </h3>

            <div
              style={{
                minHeight: 200,
                border: "1px solid #ccc",
                padding: 10,
                overflowY: "auto",
                backgroundColor: "#fafafa",
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
                onClick={handleSend}
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
        </div>
      )}
    </div>
  );
};

export default Mesero;
