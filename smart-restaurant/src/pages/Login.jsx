import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginSucceeded } from '../features/auth/authSlice.js'
import { signInWithGoogleIfExisting, signInAsAnonymous, isGoogleAccountRegistered } from '../features/auth/authThunks.js'
import Button from '../components/Button.jsx'
import { useAuthGuard } from '../hooks/useAuthGuard.js'

function normalizeEmail(e) {
    return (e || '').trim().toLowerCase()
}

export default function Login() {
    // Si ya estás autenticado, salir de /login al home del rol
    useAuthGuard({ redirectIfAuth: true })

    const [email, setEmail] = useState('')
    const [checking, setChecking] = useState(false)
    const [infoMsg, setInfoMsg] = useState(null)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateEmailForGoogle = async () => {
        setError(null)
        setInfoMsg(null)
        const e = normalizeEmail(email)
        if (!e) return setError('Ingresa un email para validar.')
        setChecking(true)
        try {
            const ok = await isGoogleAccountRegistered(e)
            setInfoMsg(ok ? 'Esta cuenta tiene método Google registrado.' : 'Esta cuenta NO está registrada con Google.')
        } catch {
            setError('Error validando el email.')
        } finally {
            setChecking(false)
        }
    }

    const handleGoogle = async () => {
        setError(null)
        setInfoMsg(null)
        const e = normalizeEmail(email)
        if (!e) return setError('Ingresa un email antes de continuar.')
        try {
            const res = await signInWithGoogleIfExisting(e)
            if (!res.ok) {
                if (res.reason === 'email-required') setError('Ingresa un email antes de continuar.')
                else if (res.reason === 'new-user-not-allowed') setError('Solo se aceptan cuentas de trabajadores')
                else if (res.reason === 'email-mismatch') setError('El email del popup no coincide con el ingresado.')
                else if (res.reason === 'missing-userdoc') setError('Solo se aceptan cuentas de trabajadores')
                else setError('No se pudo iniciar sesión con Google.')
                return
            }
            dispatch(loginSucceeded(res.authUser))
            redirectByRole(res.authUser.role)
        } catch {
            setError('Error durante el inicio con Google.')
        }
    }

    const handleAnonymous = async () => {
        setError(null)
        setInfoMsg(null)
        try {
            const res = await signInAsAnonymous()
            if (!res.ok) return setError('No se pudo iniciar sesión anónima.')
            dispatch(loginSucceeded(res.authUser))
            redirectByRole(res.authUser.role)
        } catch {
            setError('Error durante el inicio anónimo.')
        }
    }

    const redirectByRole = (role) => {
        if (role === 'waiter') navigate('/waiter')
        else if (role === 'cook') navigate('/cook')
        else navigate('/client')
    }

    return (
        <section style={{ padding: 24, maxWidth: 480 }}>
            <h2>Login</h2>

            <div style={{ marginTop: 16 }}>
                <label style={{ display: 'block', marginBottom: 6 }}>Email para Google:</label>
                <div style={{ display: 'flex', gap: 8 }}>
                    <input
                        type="email"
                        placeholder="usuario@dominio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ flex: 1, padding: 8 }}
                    />
                </div>
                {infoMsg && <small style={{ display: 'block', marginTop: 6 }}>{infoMsg}</small>}
            </div>

            <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
                <Button onClick={handleGoogle}>Entrar con Google (para meseros y cocineros)</Button>
                <Button onClick={handleAnonymous}>Entrar como Cliente</Button>
            </div>

            {error && <p style={{ marginTop: 12, color: '#f87171' }}>{error}</p>}

        </section>
    )
}
