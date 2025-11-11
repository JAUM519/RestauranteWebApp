# Guía de PRs

Este proyecto propone el siguiente flujo de Pull Requests (PR) para la vista cliente y vistas operativas:

- PR vista cliente
  - Alcance: árbol de menú (DFS/BFS), carrito persistente, personalizaciones, checkout a Firestore, RTDB live, accesibilidad/responsive y documentación.
  - Revisión: validar funcionalidad, estados en tiempo real y tests ligeros de reducers.

- Ajustes por revisión
  - Aplicar cambios solicitados: textos, accesibilidad, microcopys, UX (scroll a categoría activa), y robustez de captura de errores.
  - Confirmar que no se rompen flujos ni persistencia local/session.

- PR final cliente
  - Incluir mejoras finales y changelog de esta vista.
  - Verificar CI, lint y tests.

- Mesero/Cocinero (sugerido)
  - Abrir PR aparte para RTDB: índice de pedidos, transiciones de estado y mensajería viva (mesero/cliente/cocinero).
  - Listar estados permitidos (`src/realtime/orderStatus.js`) y coberturas de transición.

Notas
- Para datos locales, usar `window.__seedMenus?.()` en desarrollo.
- Documentación base: `docs/CLIENTE.md`.

