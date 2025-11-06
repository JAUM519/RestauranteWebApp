import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSucceeded } from '../features/auth/authSlice.js'
import { useState } from 'react'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [role, setRole] = useState('client')

    const handleFakeLogin = () => {
        dispatch(loginSucceeded({
            uid: 'demo-uid',
            displayName: role === 'client' ? 'Cliente Demo' : role === 'waiter' ? 'Mesero Demo' : 'Cocinero Demo',
            role,
        }))
        navigate(`/${role}`)
    }

    return (
        <section style={{ padding: 24 }}>
            <h2>Login</h2>
            <p>Autenticación real pendiente. Usa el selector para simular.</p>

            <label style={{ display: 'block', margin: '12px 0' }}>
                Rol:
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ marginLeft: 8 }}>
                    <option value="client">client</option>
                    <option value="waiter">waiter</option>
                    <option value="cook">cook</option>
                </select>
            </label>

            <div style={{ display: 'flex', gap: 12, margin: '12px 0' }}>
                <button onClick={handleFakeLogin}>Entrar</button>
                <Link to="/client">Ir a Cliente</Link>
                <Link to="/waiter">Ir a Mesero</Link>
                <Link to="/cook">Ir a Cocinero</Link>
            </div>
        </section>
    )
}
