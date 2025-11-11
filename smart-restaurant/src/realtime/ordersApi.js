import { append, patch, write, watchValue, serverTimestamp } from './rtdb'
import { RT } from './paths'
import { ORDER_STATUS, canTransition } from './orderStatus'

// Suscripción
export function subscribeOrder(orderId, cb) {
    return watchValue(RT.order(orderId), cb)
}

// Crear estructura live de un pedido
export async function createOrderLive(orderId, payload = {}) {
    await write(RT.order(orderId), {
        status: ORDER_STATUS.SENT,
        statusTs: serverTimestamp(), // marca de tiempo válida
        eta: null,
        ...payload,
    })
}

// Setear estado directamente
export async function setOrderStatus(orderId, nextStatus) {
    // Actualizamos sobre el nodo del pedido, no sobre la hoja /status
    await patch(RT.order(orderId), {
        status: nextStatus,
        statusTs: serverTimestamp(),
    })
}

// Transición segura con validación previa
export async function safeTransition({ orderId, from, to }) {
    if (!canTransition(from, to)) {
        throw new Error(`Transición inválida: ${from} -> ${to}`)
    }
    await patch(RT.order(orderId), {
        status: to,
        statusTs: serverTimestamp(),
    })
}

// ETA en minutos
export async function setETA(orderId, minutes) {
    await patch(RT.order(orderId), { eta: Number(minutes) })
}

// Mensajería
export async function sendMessage(orderId, { from, to, body }) {
    if (!body) return
    await append(RT.orderMessages(orderId), { from, to, body })
}
