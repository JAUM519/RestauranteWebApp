import { useAppContext } from '../context/AppContext.jsx'

export default function Client() {
    const { user, setUser, theme, setTheme } = useAppContext()

    const fakeLogin = () => {
        setUser({ uid: 'demo-uid', displayName: 'Cliente Demo', role: 'client' })
    }

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

    return (
        <section style={{ padding: 24 }}>
            <h2>Vista Cliente</h2>
            <p>Tema actual: <strong>{theme}</strong></p>
            <p>Usuario: <strong>{user ? `${user.displayName} (${user.role})` : 'no autenticado'}</strong></p>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button onClick={fakeLogin}>Simular login cliente</button>
                <button onClick={toggleTheme}>Cambiar tema</button>
            </div>

            <p style={{ marginTop: 16 }}>
                Menú, carrito, personalización y estado en vivo se implementarán en commits posteriores.
            </p>
        </section>
    )
}
