import { ref, push, set } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * crearPedido: guarda un pedido en RTDB y devuelve la key generada
 * retorna: { id, refPath }
 */
export const crearPedido = async (pedido) => {
  const pedidosRef = ref(rtdb, "pedidos");
  const nuevoPedidoRef = push(pedidosRef);
  await set(nuevoPedidoRef, pedido);
  // devolver id para referencia posterior
  return { id: nuevoPedidoRef.key, refPath: `pedidos/${nuevoPedidoRef.key}` };
};

/**
 * actualizarPedido: actualiza campos de un pedido existente
 */
export const actualizarPedido = async (id, patch) => {
  const pedidoRef = ref(rtdb, `pedidos/${id}`);
  await set(pedidoRef, { ...(await getSnapshotValue(pedidoRef)), ...patch });
};

// helper para leer snapshot sin hook
import { get } from "firebase/database";
async function getSnapshotValue(dbRef) {
  const snap = await get(dbRef);
  return snap.exists() ? snap.val() : {};
}
