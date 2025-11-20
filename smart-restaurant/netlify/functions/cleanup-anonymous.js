import { getAdminAuth, getAdminDb } from './_shared/firebaseAdmin.js'

export default async function handler(event, context) {
    // Por ahora solo log y respuesta ok
    console.log('[cleanup-anonymous] Function triggered')
    return {
        statusCode: 200,
        body: JSON.stringify({ ok: true }),
    }
}

// Ejecutar todos los días a las 05:00 UTC (00:00 Colombia)
export const config = {
    schedule: '0 5 * * *',
}
