import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import cartReducer from '../features/cart/cartSlice.js'
import { loadCart, saveCart } from '../features/cart/persist.js'

const preloaded = (() => {
    const c = loadCart()
    if (!c) return undefined
    return { cart: { ...c, orderId: null } }
})()

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefault) => getDefault(),
    devTools: true,
    preloadedState: preloaded,
})

store.subscribe(() => {
    const s = store.getState()
    try { saveCart(s.cart) } catch {}
})
