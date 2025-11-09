import { useDispatch, useSelector } from 'react-redux'
import { selectItems, selectTotal, selectPayment, setPaymentMethod, updateQty, removeItem, setComment, selectComment, setOrderId, clearCart, updateCustomization } from '../../features/cart/cartSlice.js'
import Button from '../Button.jsx'
import styles from './Menu.module.scss'
import { placeOrder } from '../../features/cart/checkout.js'
import { selectUid, selectTable } from '../../features/auth/authSlice.js'
import { useHistory } from '../../context/HistoryContext.jsx'
import QtyInput from '../QtyInput.jsx'

export default function MiniCart() {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const payment = useSelector(selectPayment)
  const comment = useSelector(selectComment)
  const uid = useSelector(selectUid)
  const table = useSelector(selectTable)

  const { push } = useHistory()
  const confirmAndSend = async () => {
    if (!items.length) return alert('El carrito está vacío')
    if (!payment) return alert('Selecciona un método de pago')
    if (!window.confirm('¿Confirmar pedido?')) return
    try {
      const orderId = await placeOrder({ uid, table, items, total, payment, comment })
      dispatch(setOrderId(orderId))
      dispatch(clearCart())
      alert('Pedido enviado')
      push({ type: 'place-order', orderId, total })
    } catch (e) {
      alert('No se pudo enviar el pedido')
      // opcional: loggear
      console.error(e)
    }
  }

  return (
    <aside className={styles.miniCart} aria-label="Pedido actual">
      <h3 style={{ marginTop: 0 }}>Carrito</h3>
      {!items.length && <p className="text-muted">Vacío</p>}
      {items.map((it) => (
        <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <button aria-label="Quitar" onClick={() => dispatch(removeItem(it.id))}>✕</button>
          <div style={{ flex: 1 }}>
            <div><strong>{it.name}</strong></div>
            <small className="text-muted">${Number(it.price).toFixed(2)}</small>
            {it.custom && (
              <div className="text-muted" style={{ fontSize: 12 }}>
                {it.custom.sinSalsa && <span>Sin salsa • </span>}
                {it.custom.extraQueso && <span>Extra queso • </span>}
                {it.custom.notas && <span>Notas: {it.custom.notas}</span>}
              </div>
            )}
          </div>
          <QtyInput value={it.qty} onChange={(v) => dispatch(updateQty({ id: it.id, qty: v }))} />
        </div>
      ))}

      {items.map((it) => (
        <div key={`${it.id}-custom`} style={{ margin: '6px 0 10px 22px', display: 'grid', gap: 6 }}>
          <label><input type="checkbox" checked={!!it.custom?.sinSalsa}
            onChange={(e) => dispatch(updateCustomization({ id: it.id, custom: { sinSalsa: e.target.checked } }))} /> Sin salsa</label>
          <label><input type="checkbox" checked={!!it.custom?.extraQueso}
            onChange={(e) => dispatch(updateCustomization({ id: it.id, custom: { extraQueso: e.target.checked } }))} /> Extra queso</label>
          <input type="text" placeholder="Notas" value={it.custom?.notas || ''}
            onChange={(e) => dispatch(updateCustomization({ id: it.id, custom: { notas: e.target.value } }))} />
        </div>
      ))}

      <div style={{ marginTop: 8 }}>
        <label>Método de pago</label>
        <select value={payment || ''} onChange={(e) => dispatch(setPaymentMethod(e.target.value || null))}
          aria-label="Método de pago" style={{ width: '100%' }}>
          <option value="">Selecciona una opción</option>
          <option value="cash">Efectivo</option>
          <option value="card">Tarjeta</option>
        </select>
      </div>

      <div style={{ marginTop: 8 }}>
        <label>Comentarios</label>
        <textarea value={comment} onChange={(e) => dispatch(setComment(e.target.value))} rows={3}
          placeholder="Sin salsa, poco azúcar, etc." style={{ width: '100%' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <strong>Total</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <Button onClick={confirmAndSend} style={{ width: '100%', marginTop: 8 }}>Realizar pedido</Button>
    </aside>
  )
}
