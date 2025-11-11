import styles from './Menu.module.scss'
import MenuItem from './MenuItem.jsx'

export default function MenuCategory({ node }) {
  const items = node.children.filter((c) => (c.data?.kind === 'item'))
  const subcats = node.children.filter((c) => (c.data?.kind !== 'item'))
  return (
    <section id={`cat-${node.id}`} className={styles.category}>
      <h3 style={{ marginBottom: 8 }}>{node.name}</h3>
      {items.length > 0 && (
        <div className={styles.items}>
          {items.map((it) => <MenuItem key={it.id} item={it.data} />)}
        </div>
      )}
      {subcats.map((sc) => (
        <MenuCategory key={sc.id} node={sc} />
      ))}
    </section>
  )
}

