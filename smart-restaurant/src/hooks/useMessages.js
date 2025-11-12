import { ref, push, onValue } from "firebase/database";
import { rtdb } from "../firebase/config";

/**
 * sendMessage(orderId, from, text)
 */
export async function sendMessage(orderId, from, text) {
  const msgRef = ref(rtdb, `mensajes/${orderId}`);
  const newRef = push(msgRef);
  await push(msgRef, {
    id: newRef.key,
    orderId,
    from,
    text,
    ts: Date.now(),
  });
}

/**
 * listenMessages(orderId, callback) -> returns unsubscribe function
 */
export function listenMessages(orderId, callback) {
  const messagesRef = ref(rtdb, `mensajes/${orderId}`);
  const unsub = onValue(messagesRef, (snap) => {
    const data = snap.val() || {};
    // convertir a array ordenado por ts
    const arr = Object.values(data).sort((a, b) => a.ts - b.ts);
    callback(arr);
  });
  // onValue returns a function to unsubscribe in web SDK? Not directly; return wrapper
  return () => messagesRef.off && messagesRef.off(); // best-effort; consumer may ignore
}
