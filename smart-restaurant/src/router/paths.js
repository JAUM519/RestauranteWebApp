export const ROLE_HOME = {
    client: '/client',
    waiter: '/waiter',
    cook: '/cook',
}

export function roleToPath(role) {
    return ROLE_HOME[role] || '/login'
}
