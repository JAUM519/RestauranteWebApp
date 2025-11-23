import { collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MENUS } from './menuSeeder'

export async function seedMenus(force = false) {
  const col = collection(db, 'menus')
  if (!force) {
    const snap = await getDocs(col)
    if (!snap.empty) return { skipped: true }
  }
  for (const item of MENUS) {
    await setDoc(doc(col, item.id), item)
  }
  return { ok: true, count: MENUS.length }
}

// Helper para usar desde consola del navegador en DEV
export function attachSeedHelper() {
  if (typeof window !== 'undefined') {
    window.__seedMenus = seedMenus
    // eslint-disable-next-line no-console
    console.log('[seed] Registrado helper window.__seedMenus()')
  }
}

