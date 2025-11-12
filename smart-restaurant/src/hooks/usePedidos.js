import { ref, push, set, onValue } from "firebase/database";
import { db } from "../firebase/config";

export const crearPedido = (pedido) => {
  const pedidosRef = ref(db, "pedidos/");
  const nuevoPedidoRef = push(pedidosRef);
  set(nuevoPedidoRef, pedido);
};

export const escucharPedidos = (callback) => {
  const pedidosRef = ref(db, "pedidos/");
  onValue(pedidosRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  });
};
