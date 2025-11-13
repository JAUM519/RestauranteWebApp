import React, { useEffect, useState } from "react";
import { escucharPedidos } from "../../hooks/usePedidos";

const Administrador = () => {
  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    const stop = escucharPedidos(setPedidos);
    return () => stop && stop();
  }, []);

  const pedidosArray = Object.entries(pedidos);
  const totalVentas = pedidosArray.reduce((acc, [, p]) => acc + (p.total || 0), 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Panel del Administrador</h1>
      <h3>Total de pedidos: {pedidosArray.length}</h3>
      <h3>Total de ventas: ${totalVentas}</h3>

      <table
        style={{
          marginTop: 20,
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Total</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Estado</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Método de Pago</th>
          </tr>
        </thead>
        <tbody>
          {pedidosArray.map(([id, p]) => (
            <tr key={id}>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{id.slice(0, 6)}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>${p.total}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{p.estado}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{p.metodoPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Administrador;
