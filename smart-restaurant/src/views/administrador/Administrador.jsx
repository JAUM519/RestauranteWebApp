import React from "react";
import { useEstadisticas } from "../../hooks/useEstadisticas";

const Administrador = () => {
  const { totalPedidos, totalIngresos, pendientes, enPreparacion, listos } = useEstadisticas();

  return (
    <div style={{ padding: 20 }}>
      <h1> Panel del Administrador</h1>
      <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
        <div style={{ background: "#ffecb3", padding: 10, borderRadius: 8 }}>
          <strong>Pendientes:</strong> {pendientes}
        </div>
        <div style={{ background: "#bbdefb", padding: 10, borderRadius: 8 }}>
          <strong>En preparación:</strong> {enPreparacion}
        </div>
        <div style={{ background: "#c8e6c9", padding: 10, borderRadius: 8 }}>
          <strong>Listos:</strong> {listos}
        </div>
      </div>

      <h3 style={{ marginTop: 20 }}>Total de pedidos: {totalPedidos}</h3>
      <h3>Total de ingresos: ${totalIngresos}</h3>
    </div>
  );
};

export default Administrador;
