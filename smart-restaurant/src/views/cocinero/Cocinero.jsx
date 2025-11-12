import React, { useEffect, useState } from "react";
import { escucharPedidos } from "../../hooks/usePedidos";
import { setOrderStatus } from "../../hooks/usePedidosStatus";

const Cocinero = () => {
  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    const unsub = escucharPedidos(setPedidos);
    return () => {
      // si escucharPedidos devuelve unsubscribe, maneja aquí
      if (typeof unsub === "function") unsub();
    };
  }, []);

  const marcarPreparando = async (id) => {
    await setOrderStatus(id, "Preparando");
  };

  const marcarListo = async (id) => {
    await setOrderStatus(id, "Listo");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos en cocina</h1>
      {Object.keys(pedidos).length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <ul>
          {Object.entries(pedidos).map(([id, p]) => (
            <li key={id} style={{ marginBottom: 12 }}>
              <strong>#{id.slice(0, 6)}</strong> — {p.items?.length || 0} platos — ${p.total}
              <div>Estado: {p.estado}</div>
              <div style={{ marginTop: 6 }}>
                <button onClick={() => marcarPreparando(id)}>Marcar Preparando</button>
                <button onClick={() => marcarListo(id)} style={{ marginLeft: 8 }}>
                  Marcar Listo
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cocinero;
