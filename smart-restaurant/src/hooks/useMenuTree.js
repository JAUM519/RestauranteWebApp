import { useEffect, useMemo, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MENUS } from '../data/menuSeeder'
import { buildTree } from '../data-structures/naryTree'

export default function useMenuTree() {
  const [flat, setFlat] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const snap = await getDocs(collection(db, 'menus'))
        const list = snap.docs.map((d) => d.data())
        if (!cancelled) setFlat(list.length ? list : MENUS)
      } catch {
        if (!cancelled) setFlat(MENUS)
      } finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const tree = useMemo(() => buildTree(flat), [flat])
  return { tree, flat, loading }
}

