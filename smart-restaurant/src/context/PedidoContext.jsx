import React, { createContext, useState, useEffect } from "react";
import { usePedidosStatus } from "../hooks/usePedidosStatus";

export const PedidoContext = createContext();

/**
 * Proveedor de contexto para los pedidos.
 * Mantiene sincronizado el estado global y expone estadoPedido.
 */
export const PedidoProvider = ({ children }) => {
  const pedidos = usePedidosStatus();
  const [estadoPedido, setEstadoPedido] = useState("Sin pedidos");

  useEffect(() => {
    const tienePedidos = Object.keys(pedidos).length > 0;
    setEstadoPedido(tienePedidos ? "Con pedidos activos" : "Sin pedidos");
  }, [pedidos]);

  return (
    <PedidoContext.Provider value={{ pedidos, estadoPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};
