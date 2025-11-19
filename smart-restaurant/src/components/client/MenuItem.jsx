import React from "react";
import Button from '../Button.jsx'
import styles from './Menu.module.scss'
import { useDispatch } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice.js'
import { useState } from 'react'
import { useHistory } from '../../context/HistoryContext.jsx'

export default function MenuItem({ item }) {
  const dispatch = useDispatch()
  const { push } = useHistory()
  const [open, setOpen] = useState(false)
  const [sinSalsa, setSinSalsa] = useState(false)
  const [extraQueso, setExtraQueso] = useState(false)
  const [notas, setNotas] = useState('')
  const handleAdd = () => {
    const custom = { sinSalsa, extraQueso, notas: notas || undefined }
    dispatch(addItem({ id: item.id, name: item.name, price: item.price, qty: 1, custom }))
    push({ type: 'add-item', itemId: item.id, name: item.name })
  }
  return (
    <div className={styles.item} role="group" aria-label={`Plato ${item.name}`}>
      {item.img && (
        <img loading="lazy" src={item.img} alt={item.name} className={styles.thumb} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <div>
          <strong>{item.name}</strong>
          <div className="text-muted">${Number(item.price).toFixed(2)}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => setOpen((v) => !v)} aria-label={`Personalizar ${item.name}`}>Opciones</Button>
          <Button onClick={handleAdd} aria-label={`Agregar ${item.name}`}>Agregar</Button>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
          <label><input type="checkbox" checked={sinSalsa} onChange={(e) => setSinSalsa(e.target.checked)} /> Sin salsa</label>
          <label><input type="checkbox" checked={extraQueso} onChange={(e) => setExtraQueso(e.target.checked)} /> Extra queso</label>
          <textarea rows={2} placeholder="Notas (opcional)" value={notas} onChange={(e) => setNotas(e.target.value)} />
        </div>
      )}
    </div>
  )
}
