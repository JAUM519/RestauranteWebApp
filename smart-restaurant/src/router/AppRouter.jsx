import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Client from '../pages/Client.jsx'
import Waiter from '../pages/Waiter.jsx'
import Cook from '../pages/Cook.jsx'
import Account from '../pages/Account.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import RoleRoute from './RoleRoute.jsx'
import SignupGoogle from '../pages/SignupGoogle.jsx'
import AppShell from '../layout/AppShell.jsx'
import RoleRedirector from './RoleRedirector.jsx'

function Shell({ children }) {
    return <AppShell>{children}</AppShell>
}

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<RoleRedirector />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sg" element={<SignupGoogle />} />

            {/* Usuarios autenticados con layout */}
            <Route element={<ProtectedRoute />}>
                {/* Cuenta, válido para cualquier rol */}
                <Route path="/account" element={<Shell><Account /></Shell>} />

                {/* Cliente (vista expandida sin AppShell) */}
                <Route element={<RoleRoute allow="client" />}>
                    <Route path="/client" element={<Client />} />
                </Route>

                {/* Mesero (vista expandida sin AppShell) */}
                <Route element={<RoleRoute allow="waiter" />}>
                    <Route path="/waiter" element={<Waiter />} />
                </Route>

                {/* Cocinero (vista expandida sin AppShell) */}
                <Route element={<RoleRoute allow="cook" />}>
                    <Route path="/cook" element={<Cook />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
