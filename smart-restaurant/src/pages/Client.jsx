import { useDispatch, useSelector } from 'react-redux'
import { logout, selectDisplayName, selectRole } from '../features/auth/authSlice.js'

export default function Client() {
    const dispatch = useDispatch()
    const name = useSelector(selectDisplayName)
    const role = useSelector(selectRole)

    return (
        <section style={{ padding: 24 }}>
            <h2>Vista Cliente</h2>
            <p>Hola, {name ?? 'Usuario'} — rol: {role ?? 'N/A'}</p>
            <button onClick={() => dispatch(logout())}>Salir</button>
            <p style={{ marginTop: 16 }}>
                Menú, carrito, personalización y estado en vivo se implementarán después.
            </p>
        </section>
    )
}
