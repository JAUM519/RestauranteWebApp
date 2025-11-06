import styles from './Header.module.scss'
import { useSelector } from 'react-redux'
import { selectDisplayName, selectRole } from '../features/auth/authSlice.js'
import { useLocation } from 'react-router-dom'
import { useLive } from '../context/LiveContext.jsx'

function useBreadcrumb() {
    const { pathname } = useLocation()
    const map = {
        '/login': ['Login'],
        '/client': ['Cliente', 'Inicio'],
        '/waiter': ['Mesero', 'Tablero'],
        '/cook': ['Cocinero', 'Cola'],
        '/account': ['Cuenta'],
    }
    return map[pathname] || ['Inicio']
}

export default function Header({ onMenu }) {
    const name = useSelector(selectDisplayName)
    const role = useSelector(selectRole)
    const crumbs = useBreadcrumb()
    const { connected } = useLive()

    return (
        <header className={styles.header}>
            <button className={styles.menuBtn} onClick={onMenu} aria-label="Abrir menú">
                ☰
            </button>
            <div className={styles.brand}>
                <a className={styles.logo} href="/" aria-label="Inicio">🍽</a>
                <span className={styles.title}>Smart Restaurant</span>
                <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
                    {crumbs.map((c, i) => (
                        <span key={i} className={styles.crumb}>
              {c}{i < crumbs.length - 1 ? ' / ' : ''}
            </span>
                    ))}
                </nav>
            </div>
            <div className={styles.user}>
        <span
            className={connected ? styles.dotOn : styles.dotOff}
            title={connected ? 'Conectado a RTDB' : 'Sin conexión a RTDB'}
            aria-label={connected ? 'Conectado' : 'Desconectado'}
        />
            </div>
        </header>
    )
}
