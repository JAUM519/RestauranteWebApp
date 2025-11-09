import useRtdbList from './useRtdbList'
import { RT } from '../realtime/paths'

export default function useOrderMessages(orderId) {
  const path = orderId ? RT.orderMessages(orderId) : null
  const list = useRtdbList(path, {
    map: (v, id) => ({ id, ...v }),
    sortBy: '_ts',
  })
  return list
}

