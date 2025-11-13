import { useEffect, useState } from "react";
import { escucharPedidos } from "./usePedidos";

export const useEstadisticas = () => {
  const [stats, setStats] = useState({
    totalPedidos: 0,
    totalIngresos: 0,
    pendientes: 0,
    enPreparacion: 0,
    listos: 0,
  });

  useEffect(() => {
    const stop = escucharPedidos((pedidos) => {
      const pedidosArr = Object.values(pedidos);
      const totalPedidos = pedidosArr.length;
      const totalIngresos = pedidosArr.reduce((acc, p) => acc + (p.total || 0), 0);
      const pendientes = pedidosArr.filter((p) => p.estado === "Pendiente").length;
      const enPreparacion = pedidosArr.filter((p) => p.estado === "En preparación").length;
      const listos = pedidosArr.filter((p) => p.estado === "Listo").length;

      setStats({ totalPedidos, totalIngresos, pendientes, enPreparacion, listos });
    });
    return () => stop && stop();
  }, []);

  return stats;
};
