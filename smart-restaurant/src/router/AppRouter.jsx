import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Client from '../pages/Client.jsx'
import Waiter from '../pages/Waiter.jsx'
import Cook from '../pages/Cook.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import RoleRoute from './RoleRoute.jsx'
import SignupGoogle from '../pages/SignupGoogle.jsx'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sg" element={<SignupGoogle />} />

            {/* Usuarios autenticados */}
            <Route element={<ProtectedRoute />}>
                <Route element={<RoleRoute allow="client" />}>
                    <Route path="/client" element={<Client />} />
                </Route>
                <Route element={<RoleRoute allow="waiter" />}>
                    <Route path="/waiter" element={<Waiter />} />
                </Route>
                <Route element={<RoleRoute allow="cook" />}>
                    <Route path="/cook" element={<Cook />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
