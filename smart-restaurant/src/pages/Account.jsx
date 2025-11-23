import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUid, selectDisplayName, selectRole } from '../features/auth/authSlice.js'
import { updateDisplayName } from '../features/auth/profileThunks'
import Button from '../components/Button.jsx'
import { signOutUser } from '../features/auth/authThunks'
import { selectTotal } from '../features/cart/cartSlice.js'

export default function Account() {
    const dispatch = useDispatch()
    const uid = useSelector(selectUid)
    const role = useSelector(selectRole)
    const currentName = useSelector(selectDisplayName)

    const [name, setName] = useState(currentName || '')
    const [busy, setBusy] = useState(false)
    const [msg, setMsg] = useState(null)
    const [err, setErr] = useState(null)

    const handleSave = async (e) => {
        e.preventDefault()
        setBusy(true); setMsg(null); setErr(null)
        try {
            await dispatch(updateDisplayName(name))
            setMsg('Nombre actualizado')
        } catch (error) {
            setErr(error?.message || 'Error actualizando el perfil')
        } finally {
            setBusy(false)
        }
    }

    return (
        <section className="container">
            <h2 style={{ marginTop: 0 }}>Mi cuenta</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 12
            }}>
                <div style={{ gridColumn: 'span 7' }}>
                    <form onSubmit={handleSave} style={{
                        border: '1px solid rgba(255,255,255,.08)',
                        borderRadius: 12,
                        padding: 16,
                        background: 'rgba(255,255,255,.03)',
                        display: 'grid',
                        gap: 12
                    }}>
                        <div>
                            <label>UID</label>
                            <input value={uid || ''} readOnly style={{ width: '100%', padding: 8, opacity: .7 }} />
                        </div>

                        <div>
                            <label>Rol</label>
                            <input value={role || 'N/A'} readOnly style={{ width: '100%', padding: 8, opacity: .7 }} />
                        </div>

                        <div>
                            <label>Nombre para mostrar</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Tu nombre"
                                required
                                style={{ width: '100%', padding: 8 }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button type="submit" disabled={busy}>Guardar</Button>
                            <Button type="button" onClick={() => dispatch(signOutUser())} disabled={busy}>Cerrar sesión</Button>
                        </div>

                        {msg && <small style={{ color: '#22c55e' }}>{msg}</small>}
                        {err && <small style={{ color: '#ef4444' }}>{err}</small>}
                    </form>
                </div>

                <div style={{ gridColumn: 'span 5' }}>
                    <div style={{
                        border: '1px solid rgba(255,255,255,.08)',
                        borderRadius: 12,
                        padding: 16,
                        background: 'rgba(255,255,255,.03)'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Ayuda</h3>
                        <ul>
                            <li>Solo puedes editar tu nombre mostrado.</li>
                            <li>El rol lo define un administrador o RR.HH.</li>
                            <li>Los cambios quedan guardados en la base de datos.</li>
                        </ul>
                        <hr />
                        <AccountTotal />
                    </div>
                </div>
            </div>
        </section>
    )
}

function AccountTotal() {
  const total = useSelector(selectTotal)
  return (
    <div>
      <h4 style={{ marginTop: 0 }}>Cuenta total</h4>
      <p>Tu total actual en carrito es: <strong>${total.toFixed(2)}</strong></p>
    </div>
  )
}
