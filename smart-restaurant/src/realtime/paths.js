export const RT = {
    order: (orderId) => `/live/orders/${orderId}`,
    orderStatus: (orderId) => `/live/orders/${orderId}/status`,
    orderETA: (orderId) => `/live/orders/${orderId}/eta`,
    orderMessages: (orderId) => `/live/orders/${orderId}/messages`,
    ordersIndex: '/live/orders', // para listados
}
