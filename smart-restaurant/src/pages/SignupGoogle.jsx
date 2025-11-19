import { useState } from 'react'
import React from "react";
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginSucceeded } from '../features/auth/authSlice.js'
import { signUpWithGoogleAndCreateUser } from '../features/auth/authThunks.js'

export default function SignupGoogle() {
    const [role, setRole] = useState('client')
    const [table, setTable] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async () => {
        setError(null)
        setBusy(true)
        try {
            const res = await signUpWithGoogleAndCreateUser({
                role,
                table: role === 'client' ? (table ? Number(table) : null) : null,
            })
            if (!res.ok) {
                if (res.reason === 'invalid-role') setError('Rol inválido.')
                else setError('No se pudo crear la cuenta.')
                return
            }
            dispatch(loginSucceeded(res.authUser))
            if (res.authUser.role === 'waiter') navigate('/waiter')
            else if (res.authUser.role === 'cook') navigate('/cook')
            else navigate('/client')
        } catch (e) {
            setError('Error durante el alta con Google.')
        } finally {
            setBusy(false)
        }
    }

    return (
        <section style={{ padding: 24, maxWidth: 520 }}>
            <h2>Crear cuenta con Google</h2>
            <p>Esta pantalla crea la cuenta en Firebase y registra el perfil en <code>users</code>.</p>

            <div style={{ marginTop: 16 }}>
                <label style={{ display: 'block', marginBottom: 6 }}>Rol:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="waiter">waiter</option>
                    <option value="cook">cook</option>
                </select>
            </div>

            <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
                <button onClick={onSubmit} disabled={busy}>
                    {busy ? 'Procesando...' : 'Crear cuenta con Google'}
                </button>
                <Link to="/login">Volver a Login</Link>
            </div>

            {error && <p style={{ marginTop: 12, color: '#f87171' }}>{error}</p>}
        </section>
    )
}
