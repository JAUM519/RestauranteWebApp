import React from 'react'
import ReactDOM from 'react-dom/client'

// Estado global
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

// Estilos globales (SASS)
import './index.scss'

function Bootstrap() {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(startAuthListener())
    }, [dispatch])

    return (
        <LiveProvider>
            <AppProvider>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
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
