import React from "react";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSucceeded } from '../features/auth/authSlice.js'
import { signInWithGoogleIfExisting, signInAsAnonymous, isGoogleAccountRegistered } from '../features/auth/authThunks.js'
import Button from '../components/Button.jsx'
import { useAuthGuard } from '../hooks/useAuthGuard.js'
import styles from './Login.module.scss'
import logo from '../assets/Logos/logo_azul.png'

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
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <div className={styles.panel}>
          <div className={styles.brand}>
            {logo ? <img src={logo} alt="Logo del restaurante" style={{ height: 40 }} /> : null}
            <div>
              <p className={styles.subtitle}>Bienvenido</p>
              <h2 className={styles.title}>Iniciar Sesión</h2>
            </div>
          </div>

          <div className={styles.form}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="usuario@dominio.com"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {infoMsg && <small>{infoMsg}</small>}

            <div className={styles.actions}>
              <div className={styles.helperRow}>
                <label className={styles.remember}>
                  <input type="checkbox" />
                  Recordarme
                </label>
                {error && <span role="alert" className={styles.error}>{error}</span>}
              </div>

              <button
                type="button"
                className={styles.google}
                onClick={handleGoogle}
                aria-label="Entrar con Google (para meseros y cocineros)"
              >
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 6.8 29.7 4.7 24 4.7 12.5 4.7 3.3 13.9 3.3 25.4S12.5 46 24 46s20.7-9.2 20.7-20.7c0-1.7-.2-3.3-.6-4.8z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.9C14.8 16 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 6.8 29.7 4.7 24 4.7 16.1 4.7 9.2 9.1 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 46c5 0 9.6-1.9 13-5l-6-4.9c-2 1.4-4.6 2.2-7 2.2-5.2 0-9.6-3.4-11.2-8.1l-6.5 5C9.2 42.9 16.1 46 24 46z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.7-6.3 7.2l6 4.9c-3.6 3.3-8.1 5.2-13 5.2 7.9 0 15.3-4.6 18.7-11.8 1.5-3 2.3-6.4 2.3-10 0-1.7-.2-3.3-.6-4.8z"/>
                </svg>
                Entrar con Google (para meseros y cocineros)
              </button>
              <Button onClick={handleAnonymous} aria-label="Entrar como Cliente">Entrar como Cliente</Button>
            </div>
          </div>
        </div>
        <div className={styles.side} aria-hidden="true" />
      </div>
    </div>
  )
}
