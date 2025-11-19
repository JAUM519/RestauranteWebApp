import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { selectDisplayName, selectRole } from '../features/auth/authSlice.js'
import { signOutUser } from '../features/auth/authThunks.js'
import grid from '../components/ResponsiveGrid.module.scss'
import Card from '../components/Card.jsx'
import Menu from './client/Menu.jsx'
import MiniCart from '../components/client/MiniCart.jsx'
import useLiveOrder from '../hooks/useLiveOrder.js'
import { safeTransition } from '../realtime/ordersApi.js'
import { selectOrderId } from '../features/cart/cartSlice.js'
import { useHistory } from '../context/HistoryContext.jsx'
import logoBlue from '../assets/Logos/logo_azul.png'
import logoYellow from '../assets/Logos/logo_amarillo.png'
import useOrderMessages from '../hooks/useOrderMessages.js'
import { sendMessage } from '../realtime/ordersApi.js'

export default function Client() {
  const dispatch = useDispatch()
  const name = useSelector(selectDisplayName)
  const role = useSelector(selectRole)
  const bgBlue = true
  const logo = bgBlue ? logoYellow : logoBlue

  return (
    <section style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      padding: 24,
      background: 'linear-gradient(135deg, rgba(0,185,242,0.10) 0%, rgba(255,200,35,0.10) 100%)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <img src={logo} alt="Logo" style={{ height: 'clamp(48px, 6vw, 72px)', width: 'auto', objectFit: 'contain' }} />
        <h2 style={{ margin: 0, flex: 1 }}>Vista Cliente</h2>
      </div>
      <p style={{ marginTop: 0 }}>Hola, {name ?? 'Usuario'} — rol: {role ?? 'N/A'}</p>

      <div className={grid.grid}>
        <div className={grid['span-8']}>
          <Card title="Menú">
            <Menu />
          </Card>
        </div>
        <div className={grid['span-4']}>
          <Card title="Pedido actual">
            <MiniCart />
          </Card>
        </div>
        <div className={grid['span-12']}>
          <LiveOrderPanel />
        </div>
        <div className={grid['span-12']}>
          <ActionHistory />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={() => dispatch(signOutUser())} style={{ background:'#B88400', color:'#0b0c10', border:'none', padding:'10px 14px', borderRadius:10, cursor:'pointer' }}>Salir</button>
      </div>
    </section>
  )
}

function LiveOrderPanel() {
  const orderId = useSelector(selectOrderId)
  const order = useLiveOrder(orderId)
  const msgs = useOrderMessages(orderId)
  const [body, setBody] = React.useState('')
  if (!orderId) return (
    <Card title="Estado del pedido">
      <p className="text-muted">Aún no has enviado un pedido.</p>
    </Card>
  )
  const canCancel = order && ['enviado','encocina'].includes(order.status)
  const onCancel = async () => {
    if (!canCancel) return
    if (!window.confirm('¿Cancelar el pedido?')) return
    try { await safeTransition({ orderId, from: order.status, to: 'cancelado' }) }
    catch (e) { console.error(e); alert('No se pudo cancelar') }
  }
  return (
    <Card title={`Pedido #${orderId}`}>
      {!order ? (
        <p className="text-muted">Recuperando estado…</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span>Estado:</span>
            <strong>{order.status}</strong>
            {order.eta != null && <span>ETA: {order.eta}m</span>}
          </div>
          <div style={{ marginTop: 8, display: 'grid', gap: 6 }}>
            <strong>Mensajes con mesero</strong>
            <div style={{ maxHeight: 180, overflow: 'auto', border: '1px solid rgba(255,255,255,.10)', borderRadius: 8, padding: 8 }}>
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                {msgs.map((m) => (
                  <li key={m.id}><small><code>{m.from}</code> → <code>{m.to}</code></small>: {m.body}</li>
                ))}
                {!msgs.length && <li className="text-muted">Sin mensajes</li>}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input type="text" placeholder="Escribe al mesero" value={body} onChange={(e) => setBody(e.target.value)} style={{ flex: 1 }} />
              <button
                onClick={async () => { const b = (body || '').trim(); if (!b) return; try { await sendMessage(orderId, { from: 'client', to: 'waiter', body: b }); setBody('') } catch {} }}
                disabled={!body.trim()}
                style={{ background:'#00B9F2', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}
              >Enviar</button>
            </div>
          </div>
          {canCancel && (
            <div style={{ marginTop: 8 }}>
              <button onClick={onCancel}>Cancelar pedido</button>
            </div>
          )}
        </>
      )}
    </Card>
  )
}

function ActionHistory() {
  const { list } = useHistory()
  if (!list?.length) return null
  return (
    <Card title="Historial de acciones">
      <ol>
        {[...list].slice(-10).map((e, i) => (
          <li key={i}>
            <code>{e.type}</code> {e.itemId ? `(${e.itemId})` : ''} {e.orderId ? `#${e.orderId}` : ''}
            <span className="text-muted"> — {new Date(e.ts).toLocaleTimeString()}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}
