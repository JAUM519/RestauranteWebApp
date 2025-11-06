import { useDispatch, useSelector } from 'react-redux'
import { logout, selectDisplayName, selectRole } from '../features/auth/authSlice.js'

export default function Cook() {
    const dispatch = useDispatch()
    const name = useSelector(selectDisplayName)
    const role = useSelector(selectRole)

    return (
        <section style={{ padding: 24 }}>
            <h2>Vista Cocinero</h2>
            <p>Hola, {name ?? 'Usuario'} — rol: {role ?? 'N/A'}</p>
            <button onClick={() => dispatch(logout())}>Salir</button>
            <p style={{ marginTop: 16 }}>
                Cola de cocina y cambios de estado se implementarán después.
            </p>
        </section>
    )
}
