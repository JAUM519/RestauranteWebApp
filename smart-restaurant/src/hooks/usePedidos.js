import { ref, push, set, onValue } from "firebase/database";
import { rtdb } from "../firebase/config";

export const crearPedido = async (pedido) => {
  const pedidosRef = ref(rtdb, "pedidos");
  const nuevoPedidoRef = push(pedidosRef);
  await set(nuevoPedidoRef, pedido);
  return { id: nuevoPedidoRef.key, refPath: `pedidos/${nuevoPedidoRef.key}` };
};

export const actualizarPedido = async (id, patch) => {
  const pedidoRef = ref(rtdb, `pedidos/${id}`);
  const snapshot = await (await import("firebase/database")).get(pedidoRef);
  const data = snapshot.exists() ? snapshot.val() : {};
  await set(pedidoRef, { ...data, ...patch });
};

//  escucha el estado de un pedido específico
export const suscribirCambiosPedido = (pedidoId, callback) => {
  const pedidoRef = ref(rtdb, `pedidos/${pedidoId}`);
  const unsub = onValue(pedidoRef, (snap) => {
    if (snap.exists()) callback(snap.val());
  });
  return () => unsub();
};
