import { rtdb } from '../firebase/config'
import {
    ref,
    onValue,
    set,
    update,
    push,
    serverTimestamp as _serverTimestamp,
    off,
} from 'firebase/database'

export function r(path) {
    return ref(rtdb, path)
}

export function watchValue(path, cb) {
    const node = r(path)
    const unsub = onValue(node, (snap) => cb(snap.val()))
    return () => off(node, 'value', unsub)
}

export async function write(path, data) {
    await set(r(path), data)
}

export async function patch(path, data) {
    await update(r(path), data)
}

export async function append(path, data) {
    const node = r(path)
    const child = push(node)
    await set(child, { ...data, _ts: _serverTimestamp() })
    return child.key
}

// Exponer serverTimestamp para componer objetos con marca de tiempo
export const serverTimestamp = _serverTimestamp
