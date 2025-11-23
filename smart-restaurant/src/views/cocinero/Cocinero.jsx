import React, { useEffect, useState } from "react";
import { escucharPedidos, actualizarPedido } from "../../hooks/usePedidos";

const Cocinero = () => {
  const [pedidos, setPedidos] = useState({});

  // Escuchar pedidos en tiempo real
  useEffect(() => {
    const stop = escucharPedidos(setPedidos);
    return () => stop && stop();
  }, []);

  // Cambiar estado del pedido
  const cambiarEstado = async (id, nuevoEstado) => {
    await actualizarPedido(id, { estado: nuevoEstado });
    alert(`✅ Pedido ${id.slice(0, 6)} actualizado a "${nuevoEstado}"`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>👨‍🍳 Panel del Cocinero</h1>

      {Object.keys(pedidos).length === 0 ? (
        <p>No hay pedidos activos en este momento.</p>
      ) : (
        <ul>
          {Object.entries(pedidos).map(([id, pedido]) => (
            <li key={id} style={{ marginBottom: "12px" }}>
              <strong>Pedido #{id.slice(0, 6)}</strong> — Total: ${pedido.total}  
              <br />
              <strong>Estado:</strong> {pedido.estado}
              <br />
              <button
                onClick={() => cambiarEstado(id, "En preparación")}
                style={{
                  marginTop: "6px",
                  marginRight: "8px",
                  backgroundColor: "#FFA500",
                  color: "white",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                En preparación
              </button>

              <button
                onClick={() => cambiarEstado(id, "Listo")}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Listo
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cocinero;
