import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { createOrderLive } from '../../realtime/ordersApi'

export async function placeOrder({ uid, table, items, total, payment, comment }) {
  const orders = collection(db, 'orders')
  const docRef = await addDoc(orders, {
    uid: uid || null,
    table: table || null,
    items,
    total,
    payment,
    comment: comment || null,
    createdAt: serverTimestamp(),
    status: 'enviado',
  })
  await createOrderLive(docRef.id, { table, total })
  return docRef.id
}

