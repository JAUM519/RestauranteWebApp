import { ref, push, onValue } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * Envía un mensaje a un pedido específico.
 * @param {string} orderId - ID del pedido
 * @param {string} from - Rol del emisor (cliente, mesero, cocinero)
 * @param {string} text - Contenido del mensaje
 */
export const sendMessage = async (orderId, from, text) => {
  if (!orderId || !text) return;

  const msgRef = ref(rtdb, `mensajes/${orderId}`);
  const msgData = {
    from,
    text,
    ts: Date.now(),
  };

  await push(msgRef, msgData);
  console.log(` Mensaje enviado por ${from}:`, text);
};

/**
 * Escucha los mensajes de un pedido en tiempo real.
 * @param {string} orderId - ID del pedido
 * @param {function} callback - Función para actualizar el estado local
 * @returns {function} - Función para detener la suscripción
 */
export const listenMessages = (orderId, callback) => {
  if (!orderId) return;

  const msgRef = ref(rtdb, `mensajes/${orderId}`);
  const unsubscribe = onValue(msgRef, (snapshot) => {
    const data = snapshot.val() || {};
    const mensajesOrdenados = Object.entries(data).map(([id, m]) => ({
      id,
      ...m,
    }));
    callback(mensajesOrdenados);
  });

  console.log(` Escuchando mensajes del pedido ${orderId}`);
  return () => unsubscribe();
};
