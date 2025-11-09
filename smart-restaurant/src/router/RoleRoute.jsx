import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Restringe el acceso a rutas según el rol del usuario.
 * Ejemplo: <RoleRoute allow="waiter" /> -> solo meseros.
 */
export default function RoleRoute({ allow }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== allow) {
    // Redirige al área principal de su rol real
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
}
