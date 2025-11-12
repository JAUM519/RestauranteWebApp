import React, { useContext } from "react";
import { PedidoContext } from "../../context/PedidoContext";

const Cocinero = () => {
  const { estadoPedido, setEstadoPedido } = useContext(PedidoContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vista del Cocinero</h1>
      <p>Pedidos activos para preparar aparecerán aquí.</p>

      <h3>Estado actual del pedido: {estadoPedido}</h3>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setEstadoPedido("Preparando")}>Preparando</button>
        <button onClick={() => setEstadoPedido("Listo")}>Listo</button>
      </div>
    </div>
  );
};

export default Cocinero;
