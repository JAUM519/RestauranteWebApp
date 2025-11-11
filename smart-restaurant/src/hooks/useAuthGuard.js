import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectIsAuthenticated, selectRole } from '../features/auth/authSlice.js'
import { roleToPath } from '../router/paths.js'

/**
 * useAuthGuard
 * - requireAuth: si true, redirige a /login si no hay sesión.
 * - allowedRoles: string | string[]. Si no coincide, envía al home del rol.
 * - redirectIfAuth: si true y estás en /login, envía al home del rol.
 */
export function useAuthGuard({ requireAuth = false, allowedRoles = null, redirectIfAuth = false } = {}) {
    const isAuth = useSelector((s) => selectIsAuthenticated(s))
    const role = useSelector((s) => selectRole(s))
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        if (requireAuth && !isAuth) {
            if (pathname !== '/login') navigate('/login', { replace: true })
            return
        }
        if (redirectIfAuth && isAuth && pathname === '/login') {
            navigate(roleToPath(role), { replace: true })
            return
        }
        if (allowedRoles && isAuth) {
            const list = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
            if (!list.includes(role)) navigate(roleToPath(role), { replace: true })
        }
    }, [requireAuth, allowedRoles, redirectIfAuth, isAuth, role, pathname, navigate])

    return { isAuth, role }
}
