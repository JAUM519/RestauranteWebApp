import React from "react";
import useMenuTree from '../../hooks/useMenuTree.js'
import MenuCategory from '../../components/client/MenuCategory.jsx'
import styles from '../../components/client/Menu.module.scss'

export default function Menu() {
  const { tree, loading } = useMenuTree()
  if (loading) return <p>Cargando menú…</p>
  const onJump = (id) => {
    const el = document.getElementById(`cat-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <div>
      <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }} aria-label="Categorías">
        {tree.map((root) => (
          <button key={root.id} onClick={() => onJump(root.id)} aria-label={`Ir a ${root.name}`}>{root.name}</button>
        ))}
      </nav>
      <div className={styles.menu}>
        {tree.map((root) => (
          <MenuCategory key={root.id} node={root} />
        ))}
      </div>
    </div>
  )
}
