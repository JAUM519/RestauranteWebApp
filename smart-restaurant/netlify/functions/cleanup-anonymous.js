// netlify/functions/cleanup-anonymous.js
import { getAdminAuth, getAdminDb } from './_shared/firebaseAdmin.js'

export default async function handler(event, context) {
    try {
        const auth = getAdminAuth()
        const db = getAdminDb()

        const dryRun = event.queryStringParameters?.dry === "1"

        // Obtener todos los usuarios de Firebase Auth
        const list = await auth.listUsers(1000)

        const anonymous = list.users.filter(u => u.providerData.length === 0)

        console.log(`Encontrados ${anonymous.length} usuarios anónimos`)

        let deletedAuth = 0
        let deletedDocs = 0

        if (!dryRun) {
            for (const user of anonymous) {
                await auth.deleteUser(user.uid)
                deletedAuth++

                // Intentar borrar también en Firestore
                try {
                    await db.collection("users").doc(user.uid).delete()
                    deletedDocs++
                } catch {}
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                ok: true,
                anonymousFound: anonymous.length,
                deletedAuth,
                deletedDocs,
                dryRun
            })
        }
    } catch (error) {
        console.error("Error:", error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}

export const config = {
    schedule: "0 5 * * *"  // 12a.m en Colombia
}
