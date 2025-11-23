import React from "react";
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectRole } from '../features/auth/authSlice.js'

export default function RoleRoute({ allow }) {
    const role = useSelector(selectRole)
    const allowed = Array.isArray(allow) ? allow.includes(role) : role === allow
    if (!allowed) return <Navigate to="/login" replace />
    return <Outlet />
}
