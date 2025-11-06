import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuthenticated } from '../features/auth/authSlice.js'

export default function ProtectedRoute() {
    const isAuth = useSelector(selectIsAuthenticated)
    if (!isAuth) return <Navigate to="/login" replace />
    return <Outlet />
}
