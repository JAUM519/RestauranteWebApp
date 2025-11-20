import { Timestamp } from 'firebase-admin/firestore'
import { getAdminAuth, getAdminDb } from './_shared/firebaseAdmin.js'

export default async function handler(event, context) {
    try {
        const db = getAdminDb()

        // Usuarios anónimos más antiguos de 24h
        const now = Date.now()
        const cutoffMillis = now - 24 * 60 * 60 * 1000
        const cutoffTs = Timestamp.fromMillis(cutoffMillis)

        const snap = await db
            .collection('users')
            .where('provider', '==', 'anonymous')
            .where('createdAt', '<=', cutoffTs)
            .get()

        const uids = snap.docs.map((d) => d.id)

        console.log(
            `[cleanup-anonymous] Encontrados ${uids.length} usuarios anónimos candidatos`
        )

        return {
            statusCode: 200,
            body: JSON.stringify({
                candidates: uids.length,
            }),
        }
    } catch (err) {
        console.error('[cleanup-anonymous] Error consultando Firestore:', err)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        }
    }
}

export const config = {
    schedule: '0 5 * * *',
}
