import styles from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import { selectRole } from '../features/auth/authSlice.js'
import ActiveNavLink from '../components/ActiveNavLink.jsx'

export default function Sidebar({ open, onClose }) {
    const role = useSelector(selectRole)

    return (
        <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
            <nav className={styles.nav} onClick={onClose} aria-label="Navegación principal">
                {role === 'client' && (
                    <>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/client">Inicio cliente</ActiveNavLink>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/client#menu">Menú</ActiveNavLink>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/client#cart">Carrito</ActiveNavLink>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/client#orders">Mis pedidos</ActiveNavLink>
                    </>
                )}
                {role === 'waiter' && (
                    <>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/waiter">Tablero mesas</ActiveNavLink>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/waiter#orders">Pedidos</ActiveNavLink>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/waiter#messages">Mensajes</ActiveNavLink>
                    </>
                )}
                {role === 'cook' && (
                    <>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/cook">Cola de cocina</ActiveNavLink>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/cook#prep">En preparación</ActiveNavLink>
                        <ActiveNavLink className={styles.link} activeClass={styles.active} to="/cook#ready">Listos</ActiveNavLink>
                    </>
                )}
                {!role && (
                    <ActiveNavLink className={styles.link} activeClass={styles.active} to="/login">Login</ActiveNavLink>
                )}
            </nav>
        </aside>
    )
}
