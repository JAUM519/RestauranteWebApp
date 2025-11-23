import React from "react";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDisplayName, selectRole } from '../features/auth/authSlice.js'
import { signOutUser } from '../features/auth/authThunks.js'
import grid from '../components/ResponsiveGrid.module.scss'
import Card from '../components/Card.jsx'
import iQueue from '../assets/Iconos_Cook/Cola_cocina.png'
import iReady from '../assets/Iconos_Cook/Listos.png'
import logoBlue from '../assets/Logos/logo_azul.png'
import logoYellow from '../assets/Logos/logo_amarillo.png'
import useOrdersIndex from '../hooks/useOrdersIndex.js'
import { ORDER_STATUS } from '../realtime/orderStatus.js'
import { safeTransition, sendMessage } from '../realtime/ordersApi.js'
import useOrderMessages from '../hooks/useOrderMessages.js'

export default function Cook() {
  const dispatch = useDispatch()
  const name = useSelector(selectDisplayName)
  const role = useSelector(selectRole)
  // Tema: fondo azul, logo amarillo (contraste)
  const bgBlue = true
  const logo = bgBlue ? logoYellow : logoBlue
  const orders = useOrdersIndex()

  const queue = orders.filter((o) => o.status === ORDER_STATUS.IN_KITCHEN || o.status === ORDER_STATUS.PREPARING)
  const ready = orders.filter((o) => o.status === ORDER_STATUS.READY)
  const [activeOrderId, setActiveOrderId] = useState(null)
  const messages = useOrderMessages(activeOrderId)
  const [msgBody, setMsgBody] = useState('')
  const [recipient, setRecipient] = useState('waiter') // 'waiter' | 'client'
  const onSend = async () => {
    const body = (msgBody || '').trim()
    if (!activeOrderId || !body) return
    try {
      await sendMessage(activeOrderId, { from: 'cook', to: recipient, body })
      setMsgBody('')
    } catch {
      // noop
    }
  }

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
        <h2 style={{ margin: 0, flex: 1 }}>Vista Cocinero</h2>
      </div>
      <p style={{ marginTop: 0 }}>Hola, {name ?? 'Usuario'} — rol: {role ?? 'N/A'}</p>

      <div className={grid.grid}>
        <div className={grid['span-8']}>
          <Card title={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <img src={iQueue} alt="" width="18" height="18" /> Cola de cocina (FIFO)
            </span>
          }>
            <div style={{ display: 'grid', gap: 8 }}>
              {queue.map((o) => (
                <div key={o.id} style={{
                  display: 'grid', gap: 6, padding: 12,
                  border: '1px solid rgba(255,255,255,.10)', borderRadius: 12,
                  background: 'linear-gradient(180deg, rgba(0,185,242,0.12), rgba(0,185,242,0.05))'
                }}>
                  <strong>Pedido #{o.id}</strong>
                  <small className="text-muted">Mesa {o.table ?? 'N/A'} — {o.items?.length ?? 0} ítem(s)</small>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {o.status === ORDER_STATUS.IN_KITCHEN && (
                      <button
                        style={{ background:'#FFC823', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}
                        onClick={async () => { try { await safeTransition({ orderId: o.id, from: o.status, to: ORDER_STATUS.PREPARING }) } catch {} }}
                      >En preparación</button>
                    )}
                    {o.status === ORDER_STATUS.PREPARING && (
                      <button
                        style={{ background:'#00B9F2', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}
                        onClick={async () => { try { await safeTransition({ orderId: o.id, from: o.status, to: ORDER_STATUS.READY }) } catch {} }}
                      >Listo</button>
                    )}
                  </div>
                </div>
              ))}
              {!queue.length && <div className="text-muted">Sin pedidos en cola</div>}
            </div>
          </Card>
        </div>
        <div className={grid['span-12']}>
          <Card title="Mensajes">
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ display: 'grid', gap: 6 }}>
                <label>Pedido</label>
                <select value={activeOrderId || ''} onChange={(e) => setActiveOrderId(e.target.value || null)} style={{ maxWidth: 360 }}>
                  <option value="">Selecciona un pedido</option>
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>#{o.id} · Mesa {o.table ?? 'N/A'}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label>Para</label>
                <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                  <option value="waiter">Mesero</option>
                  <option value="client">Cliente</option>
                </select>
              </div>
              <div style={{ maxHeight: 200, overflow: 'auto', border: '1px solid rgba(255,255,255,.10)', borderRadius: 8, padding: 8 }}>
                {!activeOrderId && <div className="text-muted">Selecciona un pedido</div>}
                {activeOrderId && (
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    {messages.map((m) => (
                      <li key={m.id}><small><code>{m.from}</code> → <code>{m.to}</code></small>: {m.body}</li>
                    ))}
                    {!messages.length && <li className="text-muted">Sin mensajes</li>}
                  </ul>
                )}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <input type="text" placeholder="Escribe un mensaje" value={msgBody} onChange={(e) => setMsgBody(e.target.value)} style={{ flex: 1 }} />
                <button onClick={onSend} disabled={!activeOrderId || !msgBody.trim()} style={{ background:'#00B9F2', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}>Enviar</button>
              </div>
            </div>
          </Card>
        </div>
        <div className={grid['span-4']}>
          <Card title={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <img src={iReady} alt="" width="18" height="18" /> Pedidos listos
            </span>
          }>
            <div style={{ display: 'grid', gap: 8 }}>
              {ready.map((o) => (
                <div key={o.id} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  border:'1px solid rgba(255,255,255,.10)', borderRadius:12, padding:'8px 10px',
                  background: 'linear-gradient(180deg, rgba(255,200,35,0.16), rgba(255,200,35,0.06))'
                }}>
                  <span>Pedido #{o.id} · Mesa {o.table ?? 'N/A'}</span>
                  <button
                    style={{ background:'#00B9F2', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}
                    onClick={async () => { try { await safeTransition({ orderId: o.id, from: o.status, to: ORDER_STATUS.DELIVERED }) } catch {} }}
                  >Despachar</button>
                </div>
              ))}
              {!ready.length && <div className="text-muted">Sin pedidos listos</div>}
            </div>
          </Card>
        </div>
        <div className={grid['span-12']}>
          <Card title="Historial de tickets">
            <div style={{ display:'grid', gap:6 }}>
              <div>10:21 — Ticket #1017 → listo</div>
              <div>10:05 — Ticket #1016 → en preparación</div>
              <div>09:58 — Ticket #1015 → listo</div>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          style={{
            background: '#B88400',
            color: '#0b0c10',
            border: 'none',
            padding: '10px 14px',
            borderRadius: 10,
            cursor: 'pointer',
          }}
          onClick={() => dispatch(signOutUser())}
        >
          Salir
        </button>
      </div>
    </section>
  )
}
