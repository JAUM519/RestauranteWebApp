import { ref, update } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * crearPago: guarda la información de pago ligada a un pedido
 * - orderId: id de pedido
 * - pago: { metodo: 'Tarjeta'|'Efectivo', monto, ts }
 */
export async function crearPago(orderId, pago) {
  if (!orderId) throw new Error("orderId requerido");
  const pagoRef = ref(rtdb, `pagos/${orderId}`);
  // Guardamos como objeto simple (puedes cambiar por push si quieres historial)
  await update(pagoRef, pago);
  // También actualizamos estado del pedido a 'Pagado' (opcional)
  const pedidoRef = ref(rtdb, `pedidos/${orderId}/estado`);
  await update(pedidoRef, { estado: "Pagado", pago: pago.metodo, pagoAt: pago.ts });
  return true;
}
