import React, { useEffect, useState } from "react";
import { escucharPedidos } from "../../hooks/usePedidos";

const Mesero = () => {
  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    escucharPedidos(setPedidos);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos Activos</h1>
      {Object.keys(pedidos).length === 0 ? (
        <p>No hay pedidos aún</p>
      ) : (
        <ul>
          {Object.entries(pedidos).map(([id, pedido]) => (
            <li key={id}>
              <strong>Total:</strong> ${pedido.total} | <strong>Estado:</strong> {pedido.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mesero;
