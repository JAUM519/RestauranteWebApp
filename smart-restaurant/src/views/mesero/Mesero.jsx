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

  // Escucha mensajes en tiempo real del pedido activo
  useEffect(() => {
    if (!activeOrder) return;
    const stop = listenMessages(activeOrder, setMessages);
    return () => stop && stop();
  }, [activeOrder]);

  // Enviar mensaje nuevo
  const handleSend = async () => {
    if (!activeOrder || !newMsg.trim()) return;
    await sendMessage(activeOrder, "mesero", newMsg.trim());
    setNewMsg("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mesero — Pedidos</h1>

      {Object.keys(pedidos).length === 0 ? (
        <p>No hay pedidos activos aún</p>
      ) : (
        <div style={{ display: "flex", gap: 20 }}>
          {/* Lista de pedidos */}
          <div style={{ flex: 1 }}>
            <h3>Lista de pedidos</h3>
            <ul>
              {Object.entries(pedidos).map(([id, p]) => (
                <li key={id} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setActiveOrder(id)}
                    style={{
                      backgroundColor:
                        id === activeOrder ? "#007bff" : "#f0f0f0",
                      color: id === activeOrder ? "white" : "black",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    #{id.slice(0, 6)} — ${p.total} — {p.estado}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat por pedido */}
          <div style={{ flex: 1 }}>
            <h3>
              Chat (Pedido {activeOrder ? activeOrder.slice(0, 6) : "—"})
            </h3>

            <div
              style={{
                minHeight: 200,
                border: "1px solid #ddd",
                padding: 8,
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

            <div style={{ marginTop: 8 }}>
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Escribe un mensaje..."
                style={{
                  width: "70%",
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={handleSend}
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
      )}
    </div>
  );
};

export default Mesero;
