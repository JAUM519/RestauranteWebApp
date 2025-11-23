# Vista Cliente

Esta vista muestra un menú por categorías construido como árbol N‑ario, un carrito con persistencia en LocalStorage, y el estado en vivo del pedido usando Firebase Realtime Database.

Puntos clave:
- Árbol: `src/data-structures/naryTree.ts` con DFS/BFS y `src/hooks/useMenuTree.js`.
- Carrito: `src/features/cart/cartSlice.js` + `persist.js`.
- Pedido: `src/features/cart/checkout.js` crea doc en Firestore y llama a `createOrderLive`.
- Estado en vivo: `src/hooks/useLiveOrder.js` suscribe `/live/orders/{id}`.
- UI: `src/pages/client/Menu.jsx`, `src/components/client/*`, SASS.

Seeding rápido (solo dev): en consola del navegador ejecutar `window.__seedMenus?.()`.

