const KEY = 'sr_auth_v1'

export function loadAuth() {
    try {
        const raw = localStorage.getItem(KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function saveAuth(state) {
    try {
        localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
        // ignorar errores de cuota
    }
}

export function clearAuth() {
    try {
        localStorage.removeItem(KEY)
    } catch {
        // ignorar
    }
}
