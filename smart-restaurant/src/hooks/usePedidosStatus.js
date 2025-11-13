import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * Suscribe en tiempo real a los cambios de estado de un pedido específico.
 * @param {string} orderId - ID del pedido
 * @param {function} callback - Función que recibe los datos del pedido actualizados
 * @returns {function} - Función para detener la suscripción
 */
export const suscribirCambiosPedido = (orderId, callback) => {
  if (!orderId) return;

  const pedidoRef = ref(rtdb, `pedidos/${orderId}`);
  const unsubscribe = onValue(pedidoRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });


  
  console.log(` Escuchando cambios en el pedido ${orderId}`);
  return () => unsubscribe();
};
