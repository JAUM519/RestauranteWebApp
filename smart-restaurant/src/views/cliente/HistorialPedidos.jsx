import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../../firebase/config";

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosRef = ref(rtdb, "pedidos");
    const unsubscribe = onValue(pedidosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const arr = Object.entries(data).map(([id, pedido]) => ({
          id,
          ...pedido,
        }));
        setPedidos(arr);
      } else {
        setPedidos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2> Historial de pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <ul>
          {pedidos.map((p) => (
            <li key={p.id} style={{ marginBottom: 10 }}>
              <strong>#{p.id.slice(0, 6)}</strong> — {p.fecha} —{" "}
              <em>{p.estado}</em> — Total: ${p.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorialPedidos;
