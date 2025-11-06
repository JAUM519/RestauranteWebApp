import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <section style={{ padding: 24 }}>
            <h2>Login</h2>
            <p>Autenticación pendiente de implementación.</p>
            <nav style={{ marginTop: 16, display: 'grid', gap: 8 }}>
                <Link to="/client">Ir a Cliente</Link>
                <Link to="/waiter">Ir a Mesero</Link>
                <Link to="/cook">Ir a Cocinero</Link>
            </nav>
        </section>
    )
}
