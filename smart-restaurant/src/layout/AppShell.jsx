import { useState } from 'react'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import styles from './AppShell.module.scss'

export default function AppShell({ children }) {
    const [open, setOpen] = useState(false)

    const handleToggle = () => setOpen(v => !v)
    const handleClose = () => setOpen(false)

    return (
        <div className={styles.shell}>
            <Header onMenu={handleToggle} />
            <div className={styles.body}>
                <Sidebar open={open} onClose={handleClose} />
                <main className={styles.main} onClick={open ? handleClose : undefined}>
                    {children}
                </main>
            </div>
        </div>
    )
}
