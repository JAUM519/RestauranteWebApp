import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Protege rutas que requieren autenticación.
 * Si no hay usuario autenticado, redirige al login.
 */
export default function ProtectedRoute() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
