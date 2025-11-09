// Datos de ejemplo para 'menus' en Firestore
// Estructura plana con parentId para construir árbol
export const MENUS = [
  { id: 'cafe', name: 'Café', parentId: null, kind: 'category' },
  { id: 'te', name: 'Té', parentId: null, kind: 'category' },
  { id: 'postres', name: 'Postres', parentId: null, kind: 'category' },
  { id: 'frio', name: 'Fríos', parentId: 'cafe', kind: 'category' },
  { id: 'caliente', name: 'Calientes', parentId: 'cafe', kind: 'category' },
  // items (leafs) con price e img
  { id: 'latte', name: 'Latte', parentId: 'caliente', kind: 'item', price: 8.5, img: '/vite.svg' },
  { id: 'capuccino', name: 'Capuccino', parentId: 'caliente', kind: 'item', price: 9.0, img: '/vite.svg' },
  { id: 'frappe', name: 'Frappe', parentId: 'frio', kind: 'item', price: 10.0, img: '/vite.svg' },
  { id: 'brownie', name: 'Brownie', parentId: 'postres', kind: 'item', price: 6.0, img: '/vite.svg' },
]
