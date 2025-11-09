import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Redirige automáticamente al área del usuario según su rol.
 * - Cliente -> /client
 * - Mesero -> /waiter
 * - Cocinero -> /cook
 * Si no está autenticado, lo envía al login.
 */
export default function RoleRedirector() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "client":
      return <Navigate to="/client" replace />;
    case "waiter":
      return <Navigate to="/waiter" replace />;
    case "cook":
      return <Navigate to="/cook" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}
