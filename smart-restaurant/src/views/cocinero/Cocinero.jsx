import React, { useEffect, useState } from "react";
import { escucharPedidos } from "../../hooks/usePedidos";

const Cocinero = () => {
  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    escucharPedidos(setPedidos);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos en Cocina</h1>
      {Object.keys(pedidos).length === 0 ? (
        <p>No hay pedidos en curso</p>
      ) : (
        <ul>
          {Object.entries(pedidos).map(([id, pedido]) => (
            <li key={id}>
              <strong>Platos:</strong> {pedido.items?.length || 0} | 
              <strong>Estado:</strong> {pedido.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cocinero;
