import { Routes, Route } from "react-router-dom";

// Páginas públicas
import Login from "../pages/Login.jsx";
import SignupGoogle from "../pages/SignupGoogle.jsx";

// Páginas privadas
import Client from "../pages/Client.jsx";
import Waiter from "../pages/Waiter.jsx";
import Cook from "../pages/Cook.jsx";
import Account from "../pages/Account.jsx";
import NotFound from "../pages/NotFound.jsx";

// Rutas y layout
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import RoleRedirector from "./RoleRedirector.jsx";
import AppShell from "../layout/AppShell.jsx";

/**
 * Wrapper para vistas que deben renderizarse dentro del AppShell
 * (barra lateral, encabezado, etc.)
 */
function Shell({ children }) {
  return <AppShell>{children}</AppShell>;
}

/**
 * Enrutador principal de la aplicación
 * Maneja rutas públicas, privadas y redirecciones por rol
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirector />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sg" element={<SignupGoogle />} />

      <Route element={<ProtectedRoute />}>

        <Route
          path="/account"
          element={
            <Shell>
              <Account />
            </Shell>
          }
        />

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
  );
}