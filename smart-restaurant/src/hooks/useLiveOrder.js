import { useEffect, useState } from 'react'
import { subscribeOrder } from '../realtime/ordersApi'

export default function useLiveOrder(orderId) {
    const [order, setOrder] = useState(null)
    useEffect(() => {
        if (!orderId) return
        const off = subscribeOrder(orderId, setOrder)
        return off
    }, [orderId])
    return order
}
