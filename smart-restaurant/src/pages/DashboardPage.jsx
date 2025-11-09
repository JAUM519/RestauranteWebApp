import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authThunks";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <h1> Panel del Restaurante</h1>
      <p>Bienvenido, <strong>{user?.name || user?.email}</strong></p>
      <button onClick={() => dispatch(logout())}>Cerrar sesión</button>
    </div>
  );
}
