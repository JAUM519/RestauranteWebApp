import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import SignupGoogle from "../pages/SignupGoogle.jsx";
import Client from "../pages/Client.jsx";
import Waiter from "../pages/Waiter.jsx";
import Cook from "../pages/Cook.jsx";
import Account from "../pages/Account.jsx";
import NotFound from "../pages/NotFound.jsx";
import AppShell from "../layout/AppShell.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import RoleRedirector from "./RoleRedirector.jsx";
import HistorialPedidos from "../views/cliente/HistorialPedidos.jsx";

function Shell({ children }) {
  return <AppShell>{children}</AppShell>;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Redirección inicial según rol */}
      <Route path="/" element={<RoleRedirector />} />

      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/sg" element={<SignupGoogle />} />

      {/* Rutas protegidas (solo usuarios autenticados) */}
      <Route element={<ProtectedRoute />}>
        {/* Página de cuenta (accesible por todos los roles) */}
        <Route path="/account" element={<Shell><Account /></Shell>} />

        {/* Historial del cliente */}
        <Route path="/historial" element={<Shell><HistorialPedidos /></Shell>} />

        {/* Cliente */}
        <Route element={<RoleRoute allow="client" />}>
          <Route path="/client" element={<Client />} />
        </Route>

        {/* Mesero */}
        <Route element={<RoleRoute allow="waiter" />}>
          <Route path="/waiter" element={<Waiter />} />
        </Route>

        {/* Cocinero */}
        <Route element={<RoleRoute allow="cook" />}>
          <Route path="/cook" element={<Cook />} />
        </Route>
      </Route>

      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
