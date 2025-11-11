import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section style={{ padding: 24 }}>
            <h2>404</h2>
            <p>Ruta no encontrada.</p>
            <Link to="/login">Volver</Link>
        </section>
    )
}
