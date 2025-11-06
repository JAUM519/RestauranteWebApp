import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import { selectRole } from '../features/auth/authSlice.js'

export default function Sidebar({ open, onClose }) {
    const role = useSelector(selectRole)

    return (
        <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
            <nav className={styles.nav} onClick={onClose}>
                {role === 'client' && (
                    <>
                        <NavLink className={styles.link} to="/client">Inicio cliente</NavLink>
                        <NavLink className={styles.link} to="/client#menu">Menú</NavLink>
                        <NavLink className={styles.link} to="/client#cart">Carrito</NavLink>
                        <NavLink className={styles.link} to="/client#orders">Mis pedidos</NavLink>
                    </>
                )}
                {role === 'waiter' && (
                    <>
                        <NavLink className={styles.link} to="/waiter">Tablero mesas</NavLink>
                        <NavLink className={styles.link} to="/waiter#orders">Pedidos</NavLink>
                        <NavLink className={styles.link} to="/waiter#messages">Mensajes</NavLink>
                    </>
                )}
                {role === 'cook' && (
                    <>
                        <NavLink className={styles.link} to="/cook">Cola de cocina</NavLink>
                        <NavLink className={styles.link} to="/cook#prep">En preparación</NavLink>
                        <NavLink className={styles.link} to="/cook#ready">Listos</NavLink>
                    </>
                )}
                {!role && (
                    <NavLink className={styles.link} to="/login">Login</NavLink>
                )}
            </nav>
        </aside>
    )
}
