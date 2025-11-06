import {
    signInWithPopup,
    signInAnonymously,
    fetchSignInMethodsForEmail,
    signOut,
    getAdditionalUserInfo,
} from 'firebase/auth'
import {
    doc, getDoc, setDoc, serverTimestamp,
} from 'firebase/firestore'
import { auth, db, googleProvider } from '../../firebase/config'
import { assignTableNumber } from './table'

// ---------- helpers ----------
function normalizeEmail(email) {
    return (email || '').trim().toLowerCase()
}

async function readUserDoc(uid) {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
}

async function upsertUserDoc(uid, payload) {
    const ref = doc(db, 'users', uid)
    await setDoc(ref, { uid, updatedAt: serverTimestamp(), ...payload }, { merge: true })
    const snap = await getDoc(ref)
    return snap.data()
}

export async function isGoogleAccountRegistered(email) {
    const e = normalizeEmail(email)
    if (!e) return false
    const methods = await fetchSignInMethodsForEmail(auth, e)
    return methods.includes('google.com')
}

/**
 * LOGIN GOOGLE DESDE /login
 * - Requiere email ingresado en UI.
 * - Permite popup, pero si la cuenta es NUEVA, se cierra sesión y se rechaza.
 * - Si el email del popup no coincide con el validado, se cierra sesión y se rechaza.
 * - Si no existe users/{uid}, se cierra sesión y se rechaza.
 */
export async function signInWithGoogleIfExisting(prevalidatedEmail) {
    const expected = normalizeEmail(prevalidatedEmail)
    if (!expected) return { ok: false, reason: 'email-required' }

    // Popup
    const cred = await signInWithPopup(auth, googleProvider)
    const { user } = cred
    const info = getAdditionalUserInfo(cred)

    // Si es una CUENTA NUEVA, no permitimos login aquí
    if (info?.isNewUser) {
        await signOut(auth)
        return { ok: false, reason: 'new-user-not-allowed' }
    }

    const actual = normalizeEmail(user?.email)
    if (!actual || actual !== expected) {
        await signOut(auth)
        return { ok: false, reason: 'email-mismatch' }
    }

    const userDoc = await readUserDoc(user.uid)
    if (!userDoc) {
        await signOut(auth)
        return { ok: false, reason: 'missing-userdoc' }
    }

    return {
        ok: true,
        authUser: {
            uid: user.uid,
            displayName: user.displayName || userDoc.displayName || 'Usuario',
            role: userDoc.role || null,
            table: userDoc.table || null,
            provider: 'google',
            email: user.email,
        },
    }
}

// ---------- login anónimo (sin cambios) ----------
export async function signInAsAnonymous() {
    const cred = await signInAnonymously(auth)
    const { user } = cred
    const existing = await readUserDoc(user.uid)
    const table = assignTableNumber(existing?.table)
    const saved = await upsertUserDoc(user.uid, {
        displayName: existing?.displayName || `Mesa ${table}`,
        role: 'client',
        table,
        provider: 'anonymous',
        createdAt: existing?.createdAt || serverTimestamp(),
    })
    return {
        ok: true,
        authUser: {
            uid: user.uid,
            displayName: saved.displayName,
            role: saved.role,
            table: saved.table,
            provider: 'anonymous',
            email: null,
        },
    }
}

// ---------- alta por Google (para /signup-google) sin cambios ----------
export async function signUpWithGoogleAndCreateUser({ role = 'client', table = null }) {
    const cred = await signInWithPopup(auth, googleProvider)
    const { user } = cred

    let finalTable = null
    if (role === 'client') {
        finalTable = table && Number.isInteger(Number(table))
            ? Number(table)
            : assignTableNumber(null)
    }

    const payload = {
        displayName: user.displayName || 'Usuario',
        email: user.email || null,
        role,
        table: role === 'client' ? finalTable : null,
        provider: 'google',
        createdAt: serverTimestamp(),
    }

    const saved = await upsertUserDoc(user.uid, payload)

    return {
        ok: true,
        authUser: {
            uid: user.uid,
            displayName: saved.displayName,
            role: saved.role,
            table: saved.table ?? null,
            provider: 'google',
            email: saved.email ?? null,
        },
    }
}
