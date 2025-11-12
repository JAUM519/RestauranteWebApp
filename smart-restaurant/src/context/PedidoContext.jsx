import React, { createContext, useState } from "react";

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");

  return (
    <PedidoContext.Provider value={{ estadoPedido, setEstadoPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};
