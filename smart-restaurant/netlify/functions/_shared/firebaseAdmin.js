import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

function initAdmin() {
    if (getApps().length) return

    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    if (!raw) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON no está definido')
    }

    const creds = JSON.parse(raw)

    initializeApp({
        credential: cert(creds),
    })
}

export function getAdminAuth() {
    initAdmin()
    return getAuth()
}

export function getAdminDb() {
    initAdmin()
    return getFirestore()
}
