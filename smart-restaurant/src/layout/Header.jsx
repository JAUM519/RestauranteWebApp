import styles from './Header.module.scss'
import { useSelector } from 'react-redux'
import { selectDisplayName, selectRole } from '../features/auth/authSlice.js'

export default function Header({ onMenu }) {
    const name = useSelector(selectDisplayName)
    const role = useSelector(selectRole)

    return (
        <header className={styles.header}>
            <button className={styles.menuBtn} onClick={onMenu} aria-label="Abrir menú">
                ☰
            </button>
            <div className={styles.brand}>
                <span className={styles.logo}>🍽</span>
                <span className={styles.title}>Smart Restaurant</span>
            </div>
        </header>
    )
}
