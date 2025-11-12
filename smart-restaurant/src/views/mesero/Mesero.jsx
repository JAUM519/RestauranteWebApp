import React, { useContext } from "react";
import { PedidoContext } from "../../context/PedidoContext";

const Mesero = () => {
  const { estadoPedido, setEstadoPedido } = useContext(PedidoContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vista del Mesero</h1>
      <p>Aquí el mesero podrá ver y actualizar los pedidos de las mesas.</p>

      <h3>Estado actual del pedido: {estadoPedido}</h3>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setEstadoPedido("En cocina")}>Enviar a cocina</button>
        <button onClick={() => setEstadoPedido("Entregado")}>Marcar como entregado</button>
      </div>
    </div>
  );
};

export default Mesero;
