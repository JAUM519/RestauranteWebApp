import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDisplayName, selectRole } from '../features/auth/authSlice.js'
import { signOutUser } from '../features/auth/authThunks.js'
import grid from '../components/ResponsiveGrid.module.scss'
import Card from '../components/Card.jsx'
import logoBlue from '../assets/Logos/logo_azul.png'
import logoYellow from '../assets/Logos/logo_amarillo.png'
import WaiterSidebar from '../components/waiter/WaiterSidebar.jsx'
import useOrdersIndex from '../hooks/useOrdersIndex.js'
import useOrderMessages from '../hooks/useOrderMessages.js'
import { ALLOWED_NEXT, ORDER_STATUS } from '../realtime/orderStatus.js'
import { safeTransition, sendMessage } from '../realtime/ordersApi.js'

export default function Waiter() {
  const dispatch = useDispatch()
  const name = useSelector(selectDisplayName)
  const role = useSelector(selectRole)
  // Fondo azul -> logo amarillo para contraste
  const bgBlue = true
  const logo = bgBlue ? logoYellow : logoBlue
  const [open, setOpen] = useState(false)
  const orders = useOrdersIndex()
  const groupedByTable = useMemo(() => {
    const map = new Map()
    for (const o of orders) {
      const key = o?.table ?? 'N/A'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(o)
    }
    return map
  }, [orders])

  const [activeOrderId, setActiveOrderId] = useState(null)
  const messages = useOrderMessages(activeOrderId)
  const [msg, setMsg] = useState('')
  const onSend = async () => {
    const body = (msg || '').trim()
    if (!activeOrderId || !body) return
    try {
      await sendMessage(activeOrderId, { from: 'waiter', to: 'client', body })
      setMsg('')
    } catch (e) {
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
        <h2 style={{ margin: 0, flex: 1 }}>Vista Mesero</h2>
        <button onClick={() => setOpen(true)} style={{ background:'#00B9F2', color:'#0b0c10', border:'none', padding:'8px 12px', borderRadius:10, cursor:'pointer' }}>Mesero</button>
      </div>
      <p style={{ marginTop: 0 }}>Hola, {name ?? 'Usuario'} — rol: {role ?? 'N/A'}</p>

      <div className={grid.grid}>
        <div className={grid['span-8']}>
          <Card title="Pedidos por mesa">
            <div style={{ display: 'grid', gap: 8 }}>
              {Array.from(groupedByTable.entries()).map(([mesa, list]) => (
                <div key={mesa} style={{
                  display: 'grid', gap: 8, padding: 12,
                  border: '1px solid rgba(255,255,255,.10)', borderRadius: 12,
                  background: 'linear-gradient(180deg, rgba(0,185,242,0.12), rgba(0,185,242,0.05))'
                }}>
                  <strong>Mesa {mesa}</strong>
                  <small className="text-muted">{list.length} pedido(s)</small>
                  <div style={{ display: 'grid', gap: 6 }}>
                    {list.map((o) => (
                      <div key={o.id} style={{ display: 'grid', gap: 6, border: '1px solid rgba(255,255,255,.10)', borderRadius: 8, padding: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div><strong>Pedido #{o.id}</strong></div>
                            <small className="text-muted">Estado: {o.status} · Total: ${Number(o.total || 0).toFixed(2)}</small>
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {(ALLOWED_NEXT[o.status] || []).map((next) => (
                              <button key={next}
                                style={{ background:'#00B9F2', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}
                                onClick={async () => { try { await safeTransition({ orderId: o.id, from: o.status, to: next }) } catch {} }}
                              >{next}</button>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            style={{ background:'#FFC823', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}
                            onClick={() => setActiveOrderId(o.id)}
                          >Mensajes</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {!orders?.length && (
                <div className="text-muted">No hay pedidos activos</div>
              )}
            </div>
          </Card>
        </div>
        <div className={grid['span-4']}>
          <Card title="Mensajes con cliente">
            <div style={{ display: 'grid', gap: 8 }}>
              <div>
                <label>Pedido</label>
                <select value={activeOrderId || ''} onChange={(e) => setActiveOrderId(e.target.value || null)} style={{ width: '100%' }}>
                  <option value="">Selecciona un pedido</option>
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>#{o.id} · Mesa {o.table ?? 'N/A'}</option>
                  ))}
                </select>
              </div>
              <div style={{ maxHeight: 220, overflow: 'auto', border: '1px solid rgba(255,255,255,.10)', borderRadius: 8, padding: 8 }}>
                {!activeOrderId && <div className="text-muted">Selecciona un pedido</div>}
                {activeOrderId && (
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    {messages.map((m) => (
                      <li key={m.id}>
                        <small><code>{m.from}</code> → <code>{m.to}</code></small>: {m.body}
                      </li>
                    ))}
                    {!messages.length && <li className="text-muted">Sin mensajes</li>}
                  </ul>
                )}
              </div>
              <div>
                <input type="text" placeholder="Escribe un mensaje" value={msg} onChange={(e) => setMsg(e.target.value)} style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                  <button onClick={onSend} disabled={!activeOrderId || !msg.trim()} style={{ background:'#00B9F2', color:'#0b0c10', border:'none', padding:'6px 10px', borderRadius:8 }}>Enviar</button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className={grid['span-12']}>
          <Card title="Historial y estados">
            <div style={{ display:'grid', gap:6 }}>
              <div>10:40 — Mesa 2 → pedido en preparación</div>
              <div>10:25 — Mesa 4 → pedido listo</div>
              <div>10:10 — Mesa 7 → pedido enviado a cocina</div>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          style={{ background:'#B88400', color:'#0b0c10', border:'none', padding:'10px 14px', borderRadius:10, cursor:'pointer' }}
          onClick={() => dispatch(signOutUser())}
        >Salir</button>
      </div>
      <WaiterSidebar open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
