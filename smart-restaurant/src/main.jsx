import React from 'react'
import ReactDOM from 'react-dom/client'

// Estado global (Redux)
import { Provider, useDispatch } from 'react-redux'
import { store } from './store/store.js'

// Auth: hidratar sesión al arrancar
import { startAuthListener } from './features/auth/authThunks.js'

// Router
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter.jsx'

// Contextos de la app
import { AppProvider } from './context/AppContext.jsx'
import { LiveProvider } from './context/LiveContext.jsx'
import { HistoryProvider } from './context/HistoryContext.jsx'
import { PedidoProvider } from './context/PedidoContext.jsx'

// Estilos globales (SASS)
import './index.scss'

// Registrar helper de seeding en desarrollo (sin top-level await)
if (import.meta.env?.DEV) {
  import('./data/seedFirestoreMenu.js')
    .then((mod) => mod.attachSeedHelper?.())
    .catch(() => {})
}

function Bootstrap() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(startAuthListener())
  }, [dispatch])

  return (
    <LiveProvider>
      <AppProvider>
        <HistoryProvider>
          <PedidoProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </PedidoProvider>
        </HistoryProvider>
      </AppProvider>
    </LiveProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Bootstrap />
    </Provider>
  </React.StrictMode>
)
