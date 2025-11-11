import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectIsAuthenticated, selectRole } from '../features/auth/authSlice.js'
import { roleToPath } from './paths.js'

export default function RoleRedirector() {
    const isAuth = useSelector(selectIsAuthenticated)
    const role = useSelector(selectRole)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) navigate(roleToPath(role), { replace: true })
        else navigate('/login', { replace: true })
    }, [isAuth, role, navigate])

    return null
}
