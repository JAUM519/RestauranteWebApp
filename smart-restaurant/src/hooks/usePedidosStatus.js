import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * Hook personalizado que escucha en tiempo real los pedidos
 * y retorna su lista en formato objeto { id: { ...pedido } }.
 */
export const usePedidosStatus = () => {
  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    const pedidosRef = ref(rtdb, "pedidos");
    const unsubscribe = onValue(pedidosRef, (snapshot) => {
      const data = snapshot.val() || {};
      setPedidos(data);
    });

    return () => unsubscribe();
  }, []);

  return pedidos;
};
