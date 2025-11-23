import { describe, it, expect } from 'vitest'
import reducer, { addItem, updateQty, removeItem } from './cartSlice.js'

describe('cart reducer', () => {
  it('adds and updates quantity', () => {
    let s = reducer(undefined, { type: '@@init' })
    s = reducer(s, addItem({ id: 'p1', name: 'Prod', price: 10 }))
    s = reducer(s, addItem({ id: 'p1', name: 'Prod', price: 10 }))
    expect(s.items.find(i => i.id === 'p1').qty).toBe(2)
    s = reducer(s, updateQty({ id: 'p1', qty: 5 }))
    expect(s.items.find(i => i.id === 'p1').qty).toBe(5)
  })
  it('removes items', () => {
    let s = reducer(undefined, addItem({ id: 'x', name: 'X', price: 1 }))
    s = reducer(s, removeItem('x'))
    expect(s.items.length).toBe(0)
  })
})

