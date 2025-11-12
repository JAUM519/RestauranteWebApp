import React, { useEffect, useState } from "react";
import { escucharPedidos } from "../../hooks/usePedidos";

const Mesero = () => {
  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    escucharPedidos(setPedidos);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos en tiempo real</h1>

      {Object.keys(pedidos).length === 0 ? (
        <p>No hay pedidos activos aún </p>
      ) : (
        <ul>
          {Object.entries(pedidos).map(([id, pedido]) => (
            <li key={id} style={{ marginBottom: "10px" }}>
              <strong>Pedido #{id.slice(0, 6)}</strong> — Total: ${pedido.total}  
              <br />
              <strong>Estado:</strong> {pedido.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mesero;
