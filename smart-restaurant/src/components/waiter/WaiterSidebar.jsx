import React from "react";
import styles from './WaiterSidebar.module.scss'
import ActiveNavLink from '../../components/ActiveNavLink.jsx'
import iBoard from '../../assets/Iconos_Waiter/Tablero_mesas.png'
import iOrders from '../../assets/Iconos_Waiter/Pedidos.png'
import iMsgs from '../../assets/Iconos_Waiter/Mensajes.png'
import iAccount from '../../assets/Iconos_Waiter/Mi_cuenta.png'

export default function WaiterSidebar({ open, onClose }) {
  return (
    <>
      <div className={`${styles.backdrop} ${open ? styles.openBackdrop : ''}`} onClick={onClose} />
      <aside className={`${styles.panel} ${open ? styles.openPanel : ''}`}>
        <div className={styles.header}>
          <strong className={styles.brand}>Mesero</strong>
        </div>
        <nav className={styles.nav} onClick={onClose} aria-label="Mesero">
          <ActiveNavLink className={styles.item} activeClass={styles.active} to="/waiter">
            <img src={iBoard} alt="" aria-hidden="true" className={styles.icon} />
            Tablero mesas
          </ActiveNavLink>
          <ActiveNavLink className={styles.item} activeClass={styles.active} to="/waiter#orders">
            <img src={iOrders} alt="" aria-hidden="true" className={styles.icon} />
            Pedidos
          </ActiveNavLink>
          <ActiveNavLink className={styles.item} activeClass={styles.active} to="/waiter#messages">
            <img src={iMsgs} alt="" aria-hidden="true" className={styles.icon} />
            Mensajes
          </ActiveNavLink>
          <ActiveNavLink className={styles.item} activeClass={styles.active} to="/account">
            <img src={iAccount} alt="" aria-hidden="true" className={styles.icon} />
            Mi cuenta
          </ActiveNavLink>
        </nav>
      </aside>
    </>
  )
}

