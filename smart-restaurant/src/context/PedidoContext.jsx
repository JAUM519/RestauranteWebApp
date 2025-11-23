import React, { createContext, useState, useEffect } from "react";
import { escucharPedidos } from "../hooks/usePedidos";

export const PedidoContext = createContext();

/**
 * Proveedor de contexto para los pedidos.
 * Mantiene sincronizado el estado global y expone estadoPedido.
 */
export const PedidoProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState({});
    const [estadoPedido, setEstadoPedido] = useState("Sin pedidos");

    // Suscribirse a TODOS los pedidos
    useEffect(() => {
        const stop = escucharPedidos(setPedidos);
        return () => stop && stop();
    }, []);

    // Actualizar label de estado global
    useEffect(() => {
        const tienePedidos = Object.keys(pedidos || {}).length > 0;
        setEstadoPedido(tienePedidos ? "Con pedidos activos" : "Sin pedidos");
    }, [pedidos]);

    return (
        <PedidoContext.Provider value={{ pedidos, estadoPedido }}>
            {children}
        </PedidoContext.Provider>
    );
};
