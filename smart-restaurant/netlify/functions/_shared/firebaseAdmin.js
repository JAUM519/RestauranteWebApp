import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

function initAdmin() {
    if (getApps().length > 0) return

    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    const creds = JSON.parse(raw)

    initializeApp({
        credential: cert(creds),
    })
}

export const getAdminAuth = () => {
    initAdmin()
    return getAuth()
}

export const getAdminDb = () => {
    initAdmin()
    return getFirestore()
}
