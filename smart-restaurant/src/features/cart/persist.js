const KEY = 'sr_cart_v1'

export function loadCart() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveCart(state) {
  try { localStorage.setItem(KEY, JSON.stringify({
    items: state.items,
    paymentMethod: state.paymentMethod,
    comment: state.comment,
  })) } catch {}
}

