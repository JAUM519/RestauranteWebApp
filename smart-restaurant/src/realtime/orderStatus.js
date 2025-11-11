export const ORDER_STATUS = {
    SENT: 'enviado',          // creado por cliente
    IN_KITCHEN: 'encocina',  // recibido por cocinero/mesero
    PREPARING: 'enpreparación',
    READY: 'listo',
    DELIVERED: 'entregado',
    CANCELED: 'cancelado',
}

export const ALLOWED_NEXT = {
    [ORDER_STATUS.SENT]: [ORDER_STATUS.IN_KITCHEN, ORDER_STATUS.CANCELED],
    [ORDER_STATUS.IN_KITCHEN]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELED],
    [ORDER_STATUS.PREPARING]: [ORDER_STATUS.READY, ORDER_STATUS.CANCELED],
    [ORDER_STATUS.READY]: [ORDER_STATUS.DELIVERED],
    [ORDER_STATUS.DELIVERED]: [],
    [ORDER_STATUS.CANCELED]: [],
}

export function canTransition(from, to) {
    return (ALLOWED_NEXT[from] || []).includes(to)
}
