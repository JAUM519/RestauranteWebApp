import { useDispatch, useSelector } from 'react-redux'
import { selectDisplayName, selectRole } from '../features/auth/authSlice.js'
import { signOutUser } from '../features/auth/authThunks.js'
import grid from '../components/ResponsiveGrid.module.scss'
import Card from '../components/Card.jsx'

export default function Cook() {
    const dispatch = useDispatch()
    const name = useSelector(selectDisplayName)
    const role = useSelector(selectRole)

    return (
        <section className="container">
            <h2 style={{ marginTop: 0 }}>Vista Cocinero</h2>
            <p>Hola, {name ?? 'Usuario'} — rol: {role ?? 'N/A'}</p>

            <div className={grid.grid}>
                <div className={grid['span-8']}>
                    <Card title="Cola de cocina (FIFO)" />
                </div>
                <div className={grid['span-4']}>
                    <Card title="Pedidos listos" />
                </div>
                <div className={grid['span-12']}>
                    <Card title="Historial de tickets" />
                </div>
            </div>

            <div style={{ marginTop: 16 }}>
                <button onClick={() => dispatch(signOutUser())}>Salir</button>
            </div>
        </section>
    )
}
