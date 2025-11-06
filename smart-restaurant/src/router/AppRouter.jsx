import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Client from '../pages/Client.jsx'
import Waiter from '../pages/Waiter.jsx'
import Cook from '../pages/Cook.jsx'
import NotFound from '../pages/NotFound.jsx'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/client" element={<Client />} />
            <Route path="/waiter" element={<Waiter />} />
            <Route path="/cook" element={<Cook />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
