import { useEffect, useMemo, useState } from 'react'
import { watchValue } from '../realtime/rtdb'

// Lista reactiva desde RTDB para un path dado
// options:
// - map: (value, key) => any
// - sortBy: string (prop para ordenar asc)
// - reverse: bool (invierte el orden)
// - filter: fn (item) => boolean
export default function useRtdbList(path, { map, sortBy, reverse = false, filter } = {}) {
  const [list, setList] = useState([])

  useEffect(() => {
    if (!path) return
    const off = watchValue(path, (obj) => {
      const entries = obj ? Object.entries(obj) : []
      let arr = entries.map(([k, v]) => (map ? map(v, k) : { id: k, ...v }))
      if (typeof filter === 'function') arr = arr.filter(filter)
      if (sortBy) {
        arr.sort((a, b) => {
          const av = a?.[sortBy]
          const bv = b?.[sortBy]
          const aNum = typeof av === 'number' ? av : (av ? Number(av) : 0)
          const bNum = typeof bv === 'number' ? bv : (bv ? Number(bv) : 0)
          if (aNum < bNum) return -1
          if (aNum > bNum) return 1
          return 0
        })
      }
      if (reverse) arr.reverse()
      setList(arr)
    })
    return off
  }, [path, sortBy, reverse, filter])

  // no exponer una nueva referencia innecesaria en cada render
  return useMemo(() => list, [list])
}

