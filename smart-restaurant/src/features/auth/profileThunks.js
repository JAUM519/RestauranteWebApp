import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { loginSucceeded } from './authSlice'

export const updateDisplayName = (newName) => async (dispatch, getState) => {
    const state = getState()
    const auth = state.auth
    if (!auth?.uid) throw new Error('No hay usuario autenticado')

    const ref = doc(db, 'users', auth.uid)

    // merge sin perder campos existentes
    await setDoc(ref, {
        uid: auth.uid,
        displayName: newName,
        updatedAt: serverTimestamp(),
    }, { merge: true })

    // leer snapshot para fuente de verdad
    const snap = await getDoc(ref)
    const data = snap.exists() ? snap.data() : {}

    // refrescar Redux con lo guardado
    dispatch(loginSucceeded({
        uid: auth.uid,
        displayName: data.displayName || newName || auth.displayName || 'Usuario',
        role: data.role || auth.role || null,
        table: data.table ?? auth.table ?? null,
        provider: auth.provider ?? null,
        email: data.email ?? auth.email ?? null,
    }))
}
