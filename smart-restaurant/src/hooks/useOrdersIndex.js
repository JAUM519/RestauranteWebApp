import { useMemo } from 'react'
import useRtdbList from './useRtdbList'
import { RT } from '../realtime/paths'

// Índice de pedidos en /live/orders con orden por statusTs asc (FIFO natural)
export default function useOrdersIndex({ status } = {}) {
  const list = useRtdbList(RT.ordersIndex, {
    map: (v, id) => ({ id, ...v }),
    sortBy: 'statusTs',
  })

  const filtered = useMemo(() => {
    if (!status) return list
    return list.filter((o) => o?.status === status)
  }, [list, status])

  return filtered
}

