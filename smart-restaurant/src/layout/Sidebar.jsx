import { useState } from 'react'
import styles from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import { selectRole } from '../features/auth/authSlice.js'
import ActiveNavLink from '../components/ActiveNavLink.jsx'
import iQueue from '../assets/Iconos_Cook/Cola_cocina.png'
import iPrep from '../assets/Iconos_Cook/En_preparacion.png'
import iReady from '../assets/Iconos_Cook/Listos.png'
import iAccount from '../assets/Iconos_Cook/Mi_cuenta.png'

export default function Sidebar({ open, onClose }) {
  const role = useSelector(selectRole)
  const [cookOpen, setCookOpen] = useState(true)

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
            <button type="button" className={styles.group} onClick={() => setCookOpen(v => !v)}>
              <span className={styles.groupTitle}>Cocina</span>
              <span className={`${styles.caret} ${cookOpen ? styles.caretOpen : ''}`}>▾</span>
            </button>
            <div className={`${styles.submenu} ${cookOpen ? styles.open : ''}`}>
              <ActiveNavLink className={`${styles.link} ${styles.item}`} activeClass={styles.active} to="/cook">
                <img src={iQueue} alt="" aria-hidden="true" className={styles.icon} />
                Cola de cocina
              </ActiveNavLink>
              <ActiveNavLink className={`${styles.link} ${styles.item}`} activeClass={styles.active} to="/cook#prep">
                <img src={iPrep} alt="" aria-hidden="true" className={styles.icon} />
                En preparación
              </ActiveNavLink>
              <ActiveNavLink className={`${styles.link} ${styles.item}`} activeClass={styles.active} to="/cook#ready">
                <img src={iReady} alt="" aria-hidden="true" className={styles.icon} />
                Listos
              </ActiveNavLink>
              <ActiveNavLink className={`${styles.link} ${styles.item}`} activeClass={styles.active} to="/account">
                <img src={iAccount} alt="" aria-hidden="true" className={styles.icon} />
                Mi cuenta
              </ActiveNavLink>
            </div>
          </>
        )}

        {!role && (
          <ActiveNavLink className={styles.link} activeClass={styles.active} to="/login">Login</ActiveNavLink>
        )}

        {role !== 'cook' && (
          <ActiveNavLink className={styles.link} activeClass={styles.active} to="/account">Mi cuenta</ActiveNavLink>
        )}
      </nav>
    </aside>
  )
}

