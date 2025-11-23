import { ref, push, onValue } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * Crear un pago asociado a un pedido.
 * @param {string} orderId - ID del pedido.
 * @param {object} pago - Datos del pago (método, monto, ts).
 */
export const crearPago = async (orderId, pago) => {
    if (!orderId || !pago) return;

    const pagosRef = ref(rtdb, `pagos/${orderId}`);
    const nuevoPagoRef = push(pagosRef);
    await set(nuevoPagoRef, pago);

    console.log(` Pago registrado para el pedido ${orderId}`, pago);
    return nuevoPagoRef.key;
};

/**
 * Escuchar pagos de un pedido en tiempo real.
 * @param {string} orderId - ID del pedido.
 * @param {function} callback - Función que recibe los pagos actualizados.
 */
export const escucharPagos = (orderId, callback) => {
  if (!orderId) return;

  const pagosRef = ref(rtdb, `pagos/${orderId}`);
  const unsubscribe = onValue(pagosRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const arr = Object.entries(data).map(([id, pago]) => ({ id, ...pago }));
      callback(arr);
    } else {
      callback([]);
    }
  });

  console.log(` Escuchando pagos del pedido ${orderId}`);
  return () => unsubscribe();
};
