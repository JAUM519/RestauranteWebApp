import { createSlice, createSelector } from '@reduxjs/toolkit'

const initial = {
  items: [], // { id, name, price, qty, custom: { sinSalsa?: boolean, notas?: string } }
  paymentMethod: null, // 'cash' | 'card'
  comment: '',
  orderId: null,
}

const slice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    addItem: (s, { payload }) => {
      const { id, name, price } = payload
      const found = s.items.find((it) => it.id === id)
      if (found) found.qty += payload.qty || 1
      else s.items.push({ id, name, price, qty: payload.qty || 1, custom: payload.custom || {} })
    },
    removeItem: (s, { payload: id }) => {
      s.items = s.items.filter((it) => it.id !== id)
    },
    updateQty: (s, { payload }) => {
      const it = s.items.find((x) => x.id === payload.id)
      if (it) it.qty = Math.max(0, Number(payload.qty)) || 0
      s.items = s.items.filter((x) => x.qty > 0)
    },
    updateCustomization: (s, { payload }) => {
      const it = s.items.find((x) => x.id === payload.id)
      if (it) it.custom = { ...it.custom, ...payload.custom }
    },
    setPaymentMethod: (s, { payload }) => { s.paymentMethod = payload },
    setComment: (s, { payload }) => { s.comment = payload ?? '' },
    setOrderId: (s, { payload }) => { s.orderId = payload },
    clearCart: (s) => { s.items = []; s.paymentMethod = null; s.comment = ''; },
    hydrateCart: (s, { payload }) => Object.assign(s, payload || {}),
  },
})

export const {
  addItem, removeItem, updateQty, updateCustomization,
  setPaymentMethod, setComment, setOrderId, clearCart, hydrateCart,
} = slice.actions

export default slice.reducer

// Selectores
export const selectCart = (s) => s.cart
export const selectItems = (s) => s.cart.items
export const selectPayment = (s) => s.cart.paymentMethod
export const selectComment = (s) => s.cart.comment
export const selectOrderId = (s) => s.cart.orderId

export const selectTotal = createSelector([selectItems], (items) =>
  items.reduce((acc, it) => acc + (Number(it.price) * Number(it.qty)), 0))
export const selectCount = createSelector([selectItems], (items) =>
  items.reduce((acc, it) => acc + Number(it.qty), 0))

