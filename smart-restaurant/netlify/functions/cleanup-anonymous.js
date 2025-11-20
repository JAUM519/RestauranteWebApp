import { Timestamp } from 'firebase-admin/firestore'
import { getAdminAuth, getAdminDb } from './_shared/firebaseAdmin.js'

export default async function handler(event, context) {
    try {
        const db = getAdminDb()
        const auth = getAdminAuth()

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

        let deletedAuthUsers = 0

        if (uids.length > 0) {
            const CHUNK = 1000
            for (let i = 0; i < uids.length; i += CHUNK) {
                const chunk = uids.slice(i, i + CHUNK)
                const result = await auth.deleteUsers(chunk)
                deletedAuthUsers += result.successCount

                if (result.failureCount) {
                    console.warn(
                        `[cleanup-anonymous] Fallos al borrar usuarios de Auth:`,
                        result.errors
                    )
                }
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                candidates: uids.length,
                deletedAuthUsers,
            }),
        }
    } catch (err) {
        console.error('[cleanup-anonymous] Error en borrado de Auth:', err)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        }
    }
}

export const config = {
    schedule: '0 5 * * *',
}
