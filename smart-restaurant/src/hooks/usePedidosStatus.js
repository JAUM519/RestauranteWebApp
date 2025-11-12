import { ref, update } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * setOrderStatus: setea el campo estado y updatedAt del pedido
 */
export async function setOrderStatus(orderId, status) {
  if (!orderId) throw new Error("orderId requerido");
  const pedidoRef = ref(rtdb, `pedidos/${orderId}`);
  const payload = {
    estado: status,
    updatedAt: Date.now(),
  };
  await update(pedidoRef, payload);
}
