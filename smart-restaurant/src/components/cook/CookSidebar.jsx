import styles from './CookSidebar.module.scss'
import ActiveNavLink from '../../components/ActiveNavLink.jsx'
import iQueue from '../../assets/Iconos_Cook/Cola_cocina.png'
import iPrep from '../../assets/Iconos_Cook/En_preparacion.png'
import iReady from '../../assets/Iconos_Cook/Listos.png'
import iAccount from '../../assets/Iconos_Cook/Mi_cuenta.png'

export default function CookSidebar({ open, onClose }) {
  return (
    <>
      <div className={`${styles.backdrop} ${open ? styles.openBackdrop : ''}`} onClick={onClose} />
      <aside className={`${styles.panel} ${open ? styles.openPanel : ''}`}>
        <div className={styles.header}>
          <strong className={styles.brand}>Cocina</strong>
        </div>
        <nav className={styles.nav} onClick={onClose} aria-label="Cocina">
          <ActiveNavLink className={styles.item} activeClass={styles.active} to="/cook">
            <img src={iQueue} alt="" aria-hidden="true" className={styles.icon} />
            Cola de cocina
          </ActiveNavLink>
          <ActiveNavLink className={styles.item} activeClass={styles.active} to="/cook#prep">
            <img src={iPrep} alt="" aria-hidden="true" className={styles.icon} />
            En preparación
          </ActiveNavLink>
          <ActiveNavLink className={styles.item} activeClass={styles.active} to="/cook#ready">
            <img src={iReady} alt="" aria-hidden="true" className={styles.icon} />
            Listos
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

